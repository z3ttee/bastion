import { Injectable, Logger } from "@nestjs/common";
import { SignInWithDiscord } from "../dtos/signin.dto";
import { AuthenticatePrompt, GrantCodeResponse } from "../dtos/signup.dto";
import { Account } from "../../account/entities/account.entity";
import jwt from "jsonwebtoken";
import { AuthenticationProviderService } from "./provider.service";

@Injectable()
export class SignInService {
  private readonly _logger = new Logger(SignInService.name);

  constructor(private readonly _authProvider: AuthenticationProviderService) {}

  /** Signup a new account using discord account */
  public async signInWithDiscord(
    body: SignInWithDiscord
  ): Promise<GrantCodeResponse> {
    return this._authProvider
      .get("discord")
      .authenticate({
        code: body.discordGrantCode,
      })
      .then((account) => {
        return this.issueGrantCode(account).then((code) => {
          return {
            prompt: AuthenticatePrompt.NONE,
            code,
          };
        });
      });
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
