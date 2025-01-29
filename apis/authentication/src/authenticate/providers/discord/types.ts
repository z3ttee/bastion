export interface DiscordCredentials {
  /** Discord grant code received from authorization code flow */
  readonly code: string;
}

export interface DiscordConfig {
  readonly enabled: boolean;
  /** Base url to the discord api endpoint */
  readonly endpoint: string;
  /** URL that is used as redirect uri when authenticating with discord */
  readonly redirect_url: string;
  readonly client_id: string;
  readonly client_secret: string;
}
