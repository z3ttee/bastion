import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {
  DiscordAccessTokenResponse,
  DiscordAuthorizationInfo,
  DiscordErrorCode,
  DiscordResponse,
  DiscordUser
} from "../dtos/discord-responses";
import { ApiErrorCode } from "../../errorCodes";

@Injectable()
export class DiscordSocialService {
  private readonly _logger = new Logger(DiscordSocialService.name);

  constructor(private readonly _config: ConfigService) {}

  /** Authorize a grant code and load the profile of the discord user */
  public async authorize(grantCode: string) {
    const accessToken = await this.exchangeAccessToken(grantCode);
    const discordUser = await this.loadProfile(accessToken);
    return discordUser;
  }

  /** Exchange grant code to get an access token */
  public async exchangeAccessToken(grantCode: string): Promise<string> {
    return this._httpPost<DiscordAccessTokenResponse>(`${this._config.getOrThrow("DISCORD_ENDPOINT")}/oauth2/token`, {
      grant_type: "authorization_code",
      code: grantCode,
      redirect_uri: process.env.DISCORD_CALLBACK_URL
    }).then((res) => {
      return res.access_token;
    });
  }

  /** Load profile associated with access token */
  public async loadProfile(access_token: string): Promise<DiscordUser> {
    return fetch(`${this._config.getOrThrow("DISCORD_ENDPOINT")}/oauth2/@me`, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
      .then<DiscordResponse<DiscordAuthorizationInfo>>((res) => res.json() as any)
      .then((res) => {
        this._handleAndThrowError(res);
        return res.user;
      });
  }

  /** Handle discord responses. If there is an error object present, throw the error */
  private _handleAndThrowError(response: DiscordResponse<unknown>) {
    if (response.error === DiscordErrorCode.INVALID_GRANT) {
      throw new BadRequestException(ApiErrorCode.INVALID_GRANT_CODE);
    } else if (response.error) {
      this._logger.error(`Discord API error: ${response.error_description}`);
      throw new InternalServerErrorException(ApiErrorCode.DISCORD_UNEXPECTED_ERROR);
    }
  }

  /** Send http post request to discord api endpoint */
  private async _httpPost<T>(endpoint: string, data: any): Promise<T> {
    return fetch(endpoint, {
      method: "POST",
      body: new URLSearchParams(data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(process.env.DISCORD_CLIENT_ID + ":" + process.env.DISCORD_CLIENT_SECRET)
      }
    })
      .then<DiscordResponse<T>>((res) => res.json() as any)
      .then((res) => {
        this._handleAndThrowError(res);
        return res;
      });
  }
}
