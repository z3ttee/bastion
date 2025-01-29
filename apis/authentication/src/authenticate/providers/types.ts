import { ModuleMetadata } from "@nestjs/common";
import { DiscordConfig } from "./discord/types";

export class AuthenticationProviderModuleConfig {
  public discord?: DiscordConfig;
}

export interface AuthenticationProviderModuleAsyncConfig
  extends Pick<ModuleMetadata, "imports"> {
  useFactory?: (
    ...args: any[]
  ) =>
    | Promise<AuthenticationProviderModuleConfig>
    | AuthenticationProviderModuleConfig;
  inject?: any[];
}
