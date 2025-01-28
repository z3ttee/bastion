import { Controller, Delete, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { AvatarService } from "../services/avatar.service";
import { S3_BUCKET_AVATAR_KEY } from "../../constants";

@Controller("avatars")
export class AvatarController {
  constructor(private readonly _service: AvatarService) {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  public async uploadAvatarForCurrentUser(@UploadedFile() file: Express.Multer.File) {
    return this._service.createUsingS3(null, S3_BUCKET_AVATAR_KEY, file.filename);
  }

  @Delete()
  public async deleteAvatarOfCurrentUser() {
    // TODO: Delete
    return this._service.deleteByAccountId("123");
  }
}
