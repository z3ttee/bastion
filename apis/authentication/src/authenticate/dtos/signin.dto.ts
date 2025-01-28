import { IsEmail, IsOptional, IsString, IsUUID, Length } from "class-validator";

export class SignInBody {
  @IsString()
  public readonly email: string;

  @IsString()
  public readonly password: string;
}

export class SignInWithDiscord {
  @IsString()
  public readonly discordGrantCode: string;

  @IsUUID()
  @IsOptional()
  public readonly referredById?: string;
}
