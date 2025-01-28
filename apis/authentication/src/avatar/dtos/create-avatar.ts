import { IsEnum, IsString } from "class-validator";
import { AvatarSourceType } from "../entities/avatar.entity";

export class CreateAvatarBody {
  @IsEnum(AvatarSourceType)
  public readonly source: AvatarSourceType;
  @IsString()
  public readonly identifier: string;
}
