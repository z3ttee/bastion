import { IsEmail, IsOptional, IsString, IsStrongPassword, IsUUID, Length } from "class-validator";

export class SignUpBody {
  @IsEmail()
  public readonly email: string;

  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minUppercase: 1,
    minLowercase: 1,
    minSymbols: 1
  })
  public readonly password: string;

  @IsString()
  @Length(3, 64)
  public readonly displayName: string;

  @IsUUID()
  @IsOptional()
  public readonly referredById?: string;
}

export enum AuthenticatePrompt {
  NONE = "none"
}

export interface GrantCodeResponse {
  readonly code?: string;
  readonly prompt: AuthenticatePrompt;
}
