export enum ApiErrorCode {
  NOT_FOUND = "Not Found",
  ACCOUNT_NOT_FOUND = "AccountNotFound",
  ACCOUNT_EMAIL_EXISTS = "AccountEmailExists",
  ACCOUNT_CREDENTIAL_MISMATCH = "AccountCredentialMismatch",
  ACCOUNT_DISCORD_EXISTS = "AccountWithDiscordExists",
  UNKNOWN_SIGNUP_METHOD = "UnknownSignupMethod",
  INVALID_GRANT_CODE = "InvalidGrantCode",
  DISCORD_UNEXPECTED_ERROR = "DiscordUnexpectedError",
  DISCORD_INVALID_GRANT = "DiscordInvalidGrant",
}
