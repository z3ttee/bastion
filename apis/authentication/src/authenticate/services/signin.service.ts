import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { AccountService } from "../../account/services/account.service";
import { ApiErrorCode } from "../../errorCodes";
import { SignInWithDiscord } from "../dtos/signin.dto";
import { AuthenticatePrompt, GrantCodeResponse } from "../dtos/signup.dto";
import {
  AccountCredentialType,
  AccountDiscordCredentials,
} from "../../account/entities/credentials.entity";
import { Account } from "../../account/entities/account.entity";
import jwt from "jsonwebtoken";

@Injectable()
export class SignInService {
  private readonly _logger = new Logger(SignInService.name);

  constructor(private readonly _accountService: AccountService) {}

  /** Signup a new account using discord account */
  public async signInWithDiscord(
    body: SignInWithDiscord
  ): Promise<GrantCodeResponse> {
    // const discordUser = await this._discord.authorize(body.discordGrantCode);
    // if (!discordUser) {
    //   this._logger.warn("Discord user not found");
    //   throw new BadRequestException(ApiErrorCode.DISCORD_UNEXPECTED_ERROR);
    // }

    // return await this._accountService
    //   .createOrFindUsingDiscord({
    //     email: discordUser.email,
    //     credentials: {
    //       type: AccountCredentialType.DISCORD,
    //       discordId: discordUser.id
    //     } as AccountDiscordCredentials,
    //     discordAvatarHash: discordUser.avatar,
    //     displayName: discordUser.username,
    //     referredById: body.referredById
    //   })
    //   .then((account) => {
    //     return this.issueGrantCode(account).then((code) => {
    //       console.log(code);
    //       return {
    //         prompt: AuthenticatePrompt.NONE,
    //         code
    //       };
    //     });
    //   });
    throw new Error("Not implemented");
  }

  /** Issues a grant code that automatically expires after 5 minutes */
  public async issueGrantCode(account: Account): Promise<string> {
    const key = Buffer.from(process.env.JWT_PRIVATE_KEY_BASE64, "base64");
    return jwt.sign({ accountId: account.id }, key, {
      algorithm: "RS256",
      expiresIn: 1000 * 60 * 5,
    });
  }
}
