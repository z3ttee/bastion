import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { CommonAuthenticationProvider } from "../provider";
import {
  DiscordAccessTokenResponse,
  DiscordAuthorizationInfo,
  DiscordErrorCode,
  DiscordResponse,
  DiscordUser,
} from "./responses";
import { DiscordCredentials } from "./types";
import { Repository } from "typeorm";
import { Account } from "../../../account/entities/account.entity";
import { ApiErrorCode } from "../../../errorCodes";
import { AuthenticationProviderModuleConfig } from "../types";
import { InjectRepository } from "@nestjs/typeorm";
import {
  LinkedAccountType,
  LinkedDiscordAccount,
} from "../../../account/entities/linked-account.entity";
import { AvatarSourceType } from "../../../avatar/entities/avatar.entity";

@Injectable()
export class DiscordProvider extends CommonAuthenticationProvider<DiscordCredentials> {
  private readonly _logger = new Logger(DiscordProvider.name);

  constructor(
    private readonly _config: AuthenticationProviderModuleConfig,
    @InjectRepository(Account)
    private readonly _accountRepo: Repository<Account>
  ) {
    super();
  }

  public async authenticate(credentials: DiscordCredentials): Promise<Account> {
    if (!this._config.discord?.enabled)
      throw new Error("Discord authentication is not enabled");

    const accessToken = await this._exchangeAccessToken(credentials.code);
    const discordUser = await this._loadProfile(accessToken);
    return this._findOrCreateAccount(discordUser);
  }

  private async _findOrCreateAccount(
    discordUser: DiscordUser
  ): Promise<Account> {
    return this._accountRepo
      .findOne({
        where: {
          linkedAccounts: {
            provider: LinkedAccountType.DISCORD,
            discordId: discordUser.id,
          } as LinkedDiscordAccount,
        },
        relations: {
          avatar: true,
          referredBy: true,
          linkedAccounts: true,
        },
      })
      .then((account) => {
        if (account) return account;
        return this._createAccount(discordUser);
      });
  }

  /** Create account by provided discord user data */
  private async _createAccount(discordUser: DiscordUser): Promise<Account> {
    return this._accountRepo.save(
      this._accountRepo.create({
        email: discordUser.email,
        isEmailVerified: false,
        displayName: discordUser.username,
        linkedAccounts: [
          {
            provider: LinkedAccountType.DISCORD,
            discordId: discordUser.id,
          } as LinkedDiscordAccount,
        ],
        avatar: {
          source: AvatarSourceType.DISCORD,
          identifier: discordUser.avatar,
        },
      })
    );
  }

  /** Exchange grant code to get an access token */
  private async _exchangeAccessToken(grantCode: string): Promise<string> {
    return this._httpPost<DiscordAccessTokenResponse>(
      `${this._config.discord?.endpoint}/oauth2/token`,
      {
        grant_type: "authorization_code",
        code: grantCode,
        redirect_uri: this._config.discord?.redirect_url,
      }
    ).then((res) => {
      return res.access_token;
    });
  }

  /** Load profile associated with access token */
  private async _loadProfile(access_token: string): Promise<DiscordUser> {
    return fetch(`${this._config.discord?.endpoint}/oauth2/@me`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then<DiscordResponse<DiscordAuthorizationInfo>>(
        (res) => res.json() as any
      )
      .then((res) => {
        this._handleAndThrowError(res);
        return res.user;
      });
  }

  /** Handle discord responses. If there is an error object present, throw the error */
  private _handleAndThrowError(response: DiscordResponse<unknown>) {
    if (response.error === DiscordErrorCode.INVALID_GRANT) {
      throw new BadRequestException(ApiErrorCode.DISCORD_INVALID_GRANT);
    } else if (response.error) {
      this._logger.error(`Discord API error: ${response.error_description}`);
      throw new InternalServerErrorException(
        ApiErrorCode.DISCORD_UNEXPECTED_ERROR
      );
    }
  }

  /** Send http post request to discord api endpoint */
  private async _httpPost<T>(endpoint: string, data: any): Promise<T> {
    return fetch(endpoint, {
      method: "POST",
      body: new URLSearchParams(data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          btoa(
            this._config.discord?.client_id +
              ":" +
              this._config.discord?.client_secret
          ),
      },
    })
      .then<DiscordResponse<T>>((res) => res.json() as any)
      .then((res) => {
        this._handleAndThrowError(res);
        return res;
      });
  }
}
