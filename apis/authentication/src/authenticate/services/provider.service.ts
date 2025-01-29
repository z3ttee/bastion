import { Injectable, Optional } from "@nestjs/common";
import { Account } from "../../account/entities/account.entity";
import { DiscordProvider } from "../providers/discord/discordProvider";
import { AuthenticationProvider } from "../providers/provider";
import { PasswordProvider } from "../providers/password/passwordProvider";

type AuthProviderReturn<
  T extends AuthenticationProvider = AuthenticationProvider,
> = T extends "discord"
  ? DiscordProvider
  : T extends "password"
    ? PasswordProvider
    : never;

@Injectable()
export class AuthenticationProviderService {
  constructor(
    private readonly _discord: DiscordProvider,
    private readonly _password: PasswordProvider
  ) {}

  /** Get registered provider */
  public get<T extends AuthenticationProvider = AuthenticationProvider>(
    provider: T
  ): AuthProviderReturn<T> {
    if (provider === "discord") {
      return this._discord as any;
    } else if (provider === "password") {
      return this._password as any;
    }

    throw new Error(`Provider ${provider} not found`);
  }
}
