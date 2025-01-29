import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ApplicationConfig, loadConfig } from "./config";
import { APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { AccountModule } from "./account/account.module";
import { AvatarModule } from "./avatar/avatar.module";
import { AuthenticateModule } from "./authenticate/authenticate.module";
import { S3Module } from "@repo/s3";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.dev", ".env"],
      load: [loadConfig],
    }),
    S3Module.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        enabled: config.get("storage.s3.enabled", false),
        client: {
          region: config.get("storage.s3.region", undefined),
          endpoint: config.get("storage.s3.endpoint", undefined),
          credentials: {
            accessKeyId: config.get("storage.s3.accessKey"),
            secretAccessKey: config.get("storage.s3.secretKey"),
          },
        },
      }),
    }),
    // MinIOModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => ({
    //     host: config.getOrThrow("storage.host"),
    //     port: config.getOrThrow("storage.port"),
    //     useSSL: Boolean(config.getOrThrow("storage.ssl")),
    //     accessKey: config.getOrThrow("storage.accessKey"),
    //     secretKey: config.getOrThrow("storage.secretKey")
    //   })
    // }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isProduction = config.get("environment.env") === "production";

        return {
          ...config.getOrThrow<TypeOrmModuleOptions>("database"),
          autoLoadEntities: true,
          synchronize: !isProduction,
        };
      },
    }),
    AvatarModule,
    AccountModule,
    AuthenticateModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({ transform: true, whitelist: true }),
    },
  ],
})
export class AppModule {}
