import { Injectable, Logger } from "@nestjs/common";
import { AccountService } from "../../account/services/account.service";
import { SignUpBody } from "../dtos/signup.dto";
import { AccountCredentialType, AccountPasswordCredentials } from "../../account/entities/credentials.entity";

@Injectable()
export class SignUpService {
  private readonly _logger = new Logger(SignUpService.name);

  constructor(private readonly _accountService: AccountService) {}

  /** Signup a new account using email and password */
  public async signUpWithPassword(body: SignUpBody) {
    return await this._accountService.createUsingPassword({
      email: body.email,
      credentials: {
        type: AccountCredentialType.EMAIL_PASSWORD,
        password: body.password
      } as AccountPasswordCredentials,
      displayName: body.displayName,
      referredById: body.referredById
    });
  }
}
