import {
  Contains,
  IsAlphanumeric,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
  MaxLength,
  MinLength
} from "class-validator";
import { AccountCredentialType } from "../entities/credentials.entity";

export class CreateCredentialsBody {
  public readonly type: AccountCredentialType;
}

export class CreatePasswordCredentialsBody extends CreateCredentialsBody {
  public readonly password: string;
}

export class CreateDiscordCredentialsBody extends CreateCredentialsBody {
  public readonly discordId: string;
}

export class CreateAccountBody {
  public readonly email: string;
  public readonly displayName: string;
  public readonly referredById?: string;

  public readonly credentials: CreatePasswordCredentialsBody | CreateDiscordCredentialsBody;
}

export class CreateDiscordAccountBody extends CreateAccountBody {
  public readonly discordAvatarHash?: string;
}
