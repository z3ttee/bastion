import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { DiscoveryDocument } from "../dtos/discovery-document.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DiscoveryService {
  constructor(private readonly _config: ConfigService) {}

  public async findDiscoveryDocument(
    request: Request
  ): Promise<DiscoveryDocument> {
    const isProduction =
      this._config.get("environment.env", "production") === "production";

    const protocol = isProduction ? "https" : request.protocol;
    const baseUrl = new URL(`${protocol}://${request.host}`);

    return {
      issuer: `${baseUrl.toString()}`,
      authorization_endpoint: `${baseUrl.toString()}oauth2/authorize`,
      token_endpoint: `${baseUrl.toString()}oauth2/token`,
      userinfo_endpoint: `${baseUrl.toString()}v1/userinfo`,
      jwks_uri: `${baseUrl.toString()}jwks`,
      supported_scopes: ["openid", "email", "profile"],
      response_types_supported: ["code"],
      claims_supported: [
        "iss",
        "sub",
        "exp",
        "nbf",
        "iat",
        "jti",
        "scope",
        "preferred_username",
        "picture",
        "email",
        "email_verified",
      ],
    };
  }
}
