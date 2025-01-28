export abstract class CommonAuthenticationProvider<
  TCredentials = unknown,
  TUserData = unknown,
> {
  constructor(public readonly identifier: string) {}

  /** Verify given credentials and load user data if valid */
  abstract authenticateWithCredentials(
    credentials: TCredentials
  ): Promise<TUserData>;
}

export abstract class CommonOAuth2Provider<
  TCredentials = unknown,
  TUserData = unknown,
> extends CommonAuthenticationProvider<TCredentials, TUserData> {}
