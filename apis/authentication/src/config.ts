import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AuthenticationProviderModuleConfig } from "./authenticate/providers/types";

export type ApplicationConfig = Awaited<ReturnType<typeof loadConfig>>;

export async function loadConfig() {
  return {
    environment: {
      env: process.env.ENV ?? "development",
      port: parseInt(`${process.env.PORT ?? 3001}`),
    },
    database: {
      host: process.env.DB_HOST ?? "localhost",
      port: parseInt(`${process.env.DB_PORT ?? 3306}`),
      entityPrefix: process.env.DB_PREFIX ?? "fp_",
      username: process.env.DB_USER ?? "root",
      password: process.env.DB_PASS ?? "root",
      database: process.env.DB_NAME ?? "furport",
      type: (process.env.DB_TYPE ?? "mariadb") as any,
    } satisfies TypeOrmModuleOptions,
    storage: {
      s3: {
        enabled: process.env.S3_ENABLED ?? false,
        endpoint: process.env.S3_ENDPOINT ?? "",
        accessKey: process.env.S3_ACCESS_KEY ?? "",
        secretKey: process.env.S3_SECRET_KEY ?? "",
      },
    },
    authProviders: {
      discord: {
        enabled: process.env.DISCORD_ENABLED === "true",
        client_id: process.env.DISCORD_CLIENT_ID ?? "",
        client_secret: process.env.DISCORD_CLIENT_SECRET ?? "",
        redirect_url: process.env.DISCORD_REDIRECT_URL ?? "",
        endpoint: process.env.DISCORD_ENDPOINT ?? "",
      },
    } satisfies AuthenticationProviderModuleConfig,
  };
}
