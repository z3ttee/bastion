import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Avatar } from "./entities/avatar.entity";
import { AvatarService } from "./services/avatar.service";
import { MulterModule } from "@nestjs/platform-express";
import { S3_BUCKET_AVATAR_KEY } from "../constants";
import { multerS3Storage } from "@repo/s3";
import { S3Client } from "@aws-sdk/client-s3";

@Module({
  providers: [AvatarService],
  imports: [
    TypeOrmModule.forFeature([Avatar]),
    MulterModule.registerAsync({
      inject: [S3Client],
      useFactory: (s3Client: S3Client) => ({
        storage: multerS3Storage({
          client: s3Client,
          bucket: S3_BUCKET_AVATAR_KEY,
        }),
      }),
    }),
  ],
  exports: [AvatarService],
})
export class AvatarModule {}
