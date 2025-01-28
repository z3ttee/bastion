import { ModuleMetadata, Type } from "@nestjs/common";
import { DiscordConfig } from "./discord/types";

export class AuthenticationProviderModuleConfig {
  public discord?: DiscordConfig;
}

export interface AuthenticationProviderModuleConfigFactory {
  createConfig(
    connectionName?: string
  ):
    | Promise<AuthenticationProviderModuleConfig>
    | AuthenticationProviderModuleConfig;
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
