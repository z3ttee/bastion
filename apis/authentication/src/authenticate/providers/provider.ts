import { Account } from "../../account/entities/account.entity";

export type AuthenticationProvider = "discord" | "password";

export abstract class CommonAuthenticationProvider<TCredentials = unknown> {
  /** Verify given credentials and load user data if valid */
  abstract authenticate(credentials: TCredentials): Promise<Account>;
}
