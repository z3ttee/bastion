import { ClassSerializerInterceptor, Module, ValidationPipe } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { loadConfig } from "./config";
import { MinIOModule } from "@repo/minio";
import { APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { AccountModule } from "./account/account.module";
import { AvatarModule } from "./avatar/avatar.module";
import { AuthenticateModule } from "./authenticate/authenticate.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.dev", ".env"],
      load: [loadConfig]
    }),
    MinIOModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        host: config.getOrThrow("storage.host"),
        port: config.getOrThrow("storage.port"),
        useSSL: Boolean(config.getOrThrow("storage.ssl")),
        accessKey: config.getOrThrow("storage.accessKey"),
        secretKey: config.getOrThrow("storage.secretKey")
      })
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isProduction = config.get("environment.env") === "production";

        return {
          type: "mariadb",
          host: config.getOrThrow("database.host"),
          port: config.getOrThrow("database.port"),
          username: config.getOrThrow("database.username"),
          password: config.getOrThrow("database.password"),
          database: config.getOrThrow("database.name"),
          entityPrefix: config.getOrThrow("database.prefix"),
          autoLoadEntities: true,
          synchronize: !isProduction
        };
      }
    }),
    AvatarModule,
    AccountModule,
    AuthenticateModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    },
    {
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe({ transform: true, whitelist: true })
    }
  ]
})
export class AppModule {}
