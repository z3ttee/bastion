export interface PasswordCredentials {
  /** The login name can be an email or username for example */
  readonly loginname: string;
  readonly password: string;
}

export interface PasswordProviderConfig {
  readonly enabled: boolean;
}
