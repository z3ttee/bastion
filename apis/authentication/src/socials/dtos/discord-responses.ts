export enum DiscordErrorCode {
  INVALID_GRANT = "invalid_grant"
}

export type DiscordResponse<T> = T & {
  readonly error?: DiscordErrorCode;
  readonly error_description?: string;
};

export type DiscordAccessTokenResponse = DiscordResponse<{
  readonly access_token: string;
}>;

export type DiscordUser = {
  readonly id: string;
  readonly username: string;
  readonly discriminator: string;
  /** The user's avatar hash */
  readonly avatar: string;
  readonly email: string;
  /** Display on discord */
  readonly global_name: string;
};

export type DiscordAuthorizationInfo = {
  readonly scopes: string[];
  readonly expires: string;
  readonly user: DiscordUser;
};
