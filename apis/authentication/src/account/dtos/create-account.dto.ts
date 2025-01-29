export class CreateAccountBody {
  public readonly email: string;
  public readonly displayName: string;
  public readonly referredById?: string;
}

export class CreateDiscordAccountBody extends CreateAccountBody {
  public readonly discordId: string;
  public readonly discordAvatarHash?: string;
}

export class CreatePasswordAccountBody extends CreateAccountBody {
  public readonly password: string;
}
