import {
  DynamicModule,
  Module,
  OnModuleDestroy,
  Provider,
} from "@nestjs/common";
import { S3ModuleAsyncConfig, S3ModuleConfig } from "./providers";
import { S3Client } from "@aws-sdk/client-s3";

@Module({})
export class S3Module {
  /**
   * Register new S3 client.
   * You can later inject `S3Client` from `@aws-sdk/client-s3`
   */
  public static forRoot(config: S3ModuleConfig): DynamicModule {
    const configProvider = this._createConfigProvider(config);
    const clientProvider = this._createS3ClientProvider(config);

    return {
      module: S3Module,
      global: true,
      providers: [configProvider, clientProvider],
      exports: [clientProvider],
    };
  }

  /**
   * Register new S3 client asynchrously.
   * You can later inject `S3Client` from `@aws-sdk/client-s3`
   */
  public static forRootAsync(config: S3ModuleAsyncConfig): DynamicModule {
    const configProvider = this._createAsyncConfigProvider(config);
    const clientProvider = this._createAsyncS3ClientProvider(config);

    return {
      module: S3Module,
      global: true,
      imports: config.imports,
      providers: [configProvider, clientProvider],
      exports: [clientProvider],
    };
  }

  private static _createConfigProvider(config: S3ModuleConfig): Provider {
    return {
      provide: S3ModuleConfig,
      useValue: config,
    };
  }

  private static _createAsyncConfigProvider(
    config: S3ModuleAsyncConfig
  ): Provider {
    return {
      provide: S3ModuleConfig,
      useFactory: config.useFactory,
      inject: config.inject || [],
    };
  }

  private static _createS3ClientProvider(config: S3ModuleConfig): Provider {
    return {
      provide: S3Client,
      useFactory: () => new S3Client(config.client),
    };
  }

  private static _createAsyncS3ClientProvider(
    config: S3ModuleAsyncConfig
  ): Provider {
    return {
      provide: S3Client,
      useFactory: (cfg: S3ModuleConfig) => {
        if (!cfg.enabled) return null;
        return new S3Client(cfg.client);
      },
      inject: [S3ModuleConfig, ...(config.inject || [])],
    };
  }
}
