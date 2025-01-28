import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Avatar } from "./entities/avatar.entity";
import { AvatarService } from "./services/avatar.service";
import { MulterModule } from "@nestjs/platform-express";
import { MinIOService, multerMinIOStorage } from "@repo/minio";
import { S3_BUCKET_AVATAR_KEY } from "../constants";

@Module({
  providers: [AvatarService],
  imports: [
    TypeOrmModule.forFeature([Avatar]),
    MulterModule.registerAsync({
      inject: [MinIOService],
      useFactory: (minioClient: MinIOService) => ({
        storage: multerMinIOStorage({
          client: minioClient,
          bucket: S3_BUCKET_AVATAR_KEY
        })
      })
    })
  ],
  exports: [AvatarService]
})
export class AvatarModule {}
