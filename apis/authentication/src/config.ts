export async function loadConfig() {
  return {
    environment: {
      env: process.env.ENV ?? "development"
    },
    database: {
      host: process.env.DB_HOST ?? "localhost",
      port: process.env.DB_PORT ?? 3306,
      prefix: process.env.DB_PREFIX ?? "fp_",
      username: process.env.DB_USER ?? "root",
      password: process.env.DB_PASS ?? "root",
      name: process.env.DB_NAME ?? "furport"
    },
    storage: {
      host: process.env.S3_HOST ?? "localhost",
      port: parseInt(`${process.env.S3_PORT ?? 9000}`),
      ssl: process.env.S3_SSL === "true",
      accessKey: process.env.S3_ACCESS_KEY ?? "",
      secretKey: process.env.S3_SECRET_KEY ?? ""
    }
  };
}
