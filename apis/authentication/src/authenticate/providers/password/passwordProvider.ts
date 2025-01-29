import { Injectable } from "@nestjs/common";
import { Account } from "../../../account/entities/account.entity";
import { CommonAuthenticationProvider } from "../provider";
import { PasswordCredentials } from "./types";
import { AuthenticationProviderModuleConfig } from "../types";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class PasswordProvider extends CommonAuthenticationProvider<PasswordCredentials> {
  constructor(
    private readonly _config: AuthenticationProviderModuleConfig,
    @InjectRepository(Account)
    private readonly _accountRepo: Repository<Account>
  ) {
    super();
  }

  public authenticate(credentials: PasswordCredentials): Promise<Account> {
    if (!this._config.discord?.enabled)
      throw new Error("Discord authentication is not enabled");
    return null;
  }
}
