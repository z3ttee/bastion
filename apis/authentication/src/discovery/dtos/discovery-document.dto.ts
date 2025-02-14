export interface DiscoveryDocument {
  readonly issuer: string;
  readonly authorization_endpoint: string;
  readonly token_endpoint: string;
  readonly userinfo_endpoint: string;
  readonly jwks_uri: string;
  readonly supported_scopes: string[];
  readonly response_types_supported: string[];
  readonly claims_supported: string[];
}
