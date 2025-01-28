import {
  ConfigurableModuleBuilder,
  DynamicModule,
  Module,
  Provider,
} from "@nestjs/common";
import {
  AuthenticationProviderModuleAsyncConfig,
  AuthenticationProviderModuleConfig,
} from "./types";
import { DiscordProvider } from "./discord/discordProvider";

@Module({})
export class AuthenticationProviderModule {
  static forRoot(options: AuthenticationProviderModuleConfig): DynamicModule {
    return {
      module: AuthenticationProviderModule,
      global: true,
      providers: [
        {
          provide: AuthenticationProviderModuleConfig,
          useValue: options,
        },
        ...this._createAuthenticationProviders(),
      ],
    };
  }

  static forRootAsync(
    options: AuthenticationProviderModuleAsyncConfig
  ): DynamicModule {
    return {
      module: AuthenticationProviderModule,
      global: true,
      imports: options.imports,
      providers: [
        ...this._createAsyncProviders(options),
        ...this._createAuthenticationProviders(),
      ],
    };
  }

  private static _createAsyncProviders(
    options: AuthenticationProviderModuleAsyncConfig
  ): Provider[] {
    return [
      // Async config provider
      {
        provide: AuthenticationProviderModuleConfig,
        useFactory: options.useFactory,
        inject: options.inject || [],
      },
    ];
  }

  private static _createAuthenticationProviders(): Provider[] {
    return [
      {
        provide: DiscordProvider,
        useFactory: (config: AuthenticationProviderModuleConfig) => {
          if (!config.discord?.enabled) return undefined;
          return new DiscordProvider(config.discord);
        },
      },
    ];
  }
}
