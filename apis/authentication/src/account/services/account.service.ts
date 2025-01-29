import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Account } from "../entities/account.entity";
import {
  CreateAccountBody,
  CreateDiscordAccountBody,
  CreatePasswordAccountBody,
} from "../dtos/create-account.dto";

@Injectable()
export class AccountService {
  private readonly _logger = new Logger(AccountService.name);

  constructor(
    @InjectRepository(Account)
    private readonly _repository: Repository<Account>
  ) {}

  /** Find an account by its id */
  public async findById(id: string): Promise<Account | null> {
    return this._repository.findOne({
      where: { id },
      relations: {
        referredBy: true,
        linkedAccounts: true,
      },
    });
  }

  /** Find account by an email */
  public async findByEmail(email: string): Promise<Account | null> {
    return this._repository.findOne({
      where: {
        email: email,
      },
      relations: {
        referredBy: true,
        linkedAccounts: true,
        avatar: true,
      },
    });
  }

  /** Create new account using email and password */
  public async createUsingPassword(
    data: CreatePasswordAccountBody
  ): Promise<Account> {
    // const credentials = data.credentials as CreatePasswordCredentialsBody;

    // if (data.credentials.type !== AccountCredentialType.EMAIL_PASSWORD) {
    //   throw new InternalServerErrorException();
    // }

    // // Create account
    // return this._repository.save(
    //   this._repository.create({
    //     displayName: data.displayName,
    //     referredBy: referredBy ? { id: referredBy?.id } : undefined,
    //     email: data.email,
    //     credentials: {
    //       type: AccountCredentialType.EMAIL_PASSWORD,
    //       password: (await hashPassword(credentials.password)).hash
    //     } as AccountPasswordCredentials
    //   })
    // );
    throw new Error("Method not implemented.");
  }

  /** Create new account using discord account */
  public async createOrFindUsingDiscord(
    data: CreateDiscordAccountBody,
    referredBy?: Account
  ): Promise<Account> {
    // const credentials = data.credentials as CreateDiscordCredentialsBody;

    // if (data.credentials.type !== AccountCredentialType.DISCORD) {
    //   throw new InternalServerErrorException();
    // }

    // // Check if discord id exists
    // const existsByDiscordId = await this.findByDiscord(credentials.discordId).catch((err: Error) => {
    //   this._logger.error(`Failed to check if discord id exists: ${err.message}`, err.stack);
    //   throw new InternalServerErrorException();
    // });
    // if (existsByDiscordId) return existsByDiscordId;

    // // Check if email exists
    // const existsByEmail = await this.existsByEmail(credentials.discordId).catch((err: Error) => {
    //   this._logger.error(`Failed to check if email exists: ${err.message}`, err.stack);
    //   throw new InternalServerErrorException();
    // });
    // if (existsByEmail) throw new BadRequestException(ApiErrorCode.ACCOUNT_EMAIL_EXISTS);

    // // Create account
    // return this._repository.save(
    //   this._repository.create({
    //     displayName: data.displayName,
    //     referredBy: referredBy ? { id: referredBy?.id } : undefined,
    //     avatar: data.discordAvatarHash
    //       ? {
    //           source: AvatarSourceType.DISCORD,
    //           identifier: data.discordAvatarHash
    //         }
    //       : undefined,
    //     credentials: {
    //       type: AccountCredentialType.DISCORD,
    //       discordId: credentials.discordId
    //     } as AccountDiscordCredentials
    //   })
    // );
    throw new Error("Method not implemented.");
  }

  /** Check if an account exists by an email */
  public async existsByEmail(email: string): Promise<boolean> {
    return this._repository.exists({
      where: {
        email: email,
      },
    });
  }

  /** Check if an account exists by an email */
  public async existsByDiscordId(discordId: string): Promise<boolean> {
    // return this._repository.exists({
    //   where: {
    //     credentials: {
    //       type: AccountCredentialType.DISCORD,
    //       discordId: discordId
    //     } as Partial<AccountDiscordCredentials>
    //   }
    // });
    throw new Error("Method not implemented.");
  }
}
