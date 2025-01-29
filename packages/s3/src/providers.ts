import { S3Client } from "@aws-sdk/client-s3";
import { ModuleMetadata } from "@nestjs/common";

export class S3ModuleConfig {
  readonly enabled: boolean;
  readonly client: ConstructorParameters<typeof S3Client>[0];
}

export interface S3ModuleAsyncConfig extends Pick<ModuleMetadata, "imports"> {
  useFactory?: (...args: any[]) => Promise<S3ModuleConfig> | S3ModuleConfig;
  inject?: any[];
}
