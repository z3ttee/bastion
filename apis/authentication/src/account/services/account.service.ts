import { BadRequestException, Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Account } from "../entities/account.entity";
import {
  CreateAccountBody,
  CreateDiscordAccountBody,
  CreateDiscordCredentialsBody,
  CreatePasswordCredentialsBody
} from "../dtos/create-account.dto";
import { hashPassword } from "../../utils/passwordUtils";
import { ApiErrorCode } from "../../errorCodes";
import {
  AccountCredentialType,
  AccountDiscordCredentials,
  AccountPasswordCredentials
} from "../entities/credentials.entity";
import { AvatarSourceType } from "../../avatar/entities/avatar.entity";

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
        credentials: true
      }
    });
  }

  /** Find account by an email */
  public async findByEmail(email: string): Promise<Account | null> {
    return this._repository.findOne({
      where: {
        credentials: {
          type: AccountCredentialType.EMAIL_PASSWORD,
          email: email
        } as Partial<AccountPasswordCredentials>
      },
      relations: {
        referredBy: true,
        credentials: true
      }
    });
  }

  /** Find account by a discord id */
  public async findByDiscord(discordId: string): Promise<Account | null> {
    return this._repository.findOne({
      where: {
        credentials: <Partial<AccountDiscordCredentials>>{
          type: AccountCredentialType.DISCORD,
          discordId: discordId
        }
      },
      relations: {
        referredBy: true,
        credentials: true
      }
    });
  }

  /** Create new account using email and password */
  public async createUsingPassword(data: CreateAccountBody, referredBy?: Account): Promise<Account> {
    const credentials = data.credentials as CreatePasswordCredentialsBody;

    if (data.credentials.type !== AccountCredentialType.EMAIL_PASSWORD) {
      throw new InternalServerErrorException();
    }

    // Create account
    return this._repository.save(
      this._repository.create({
        displayName: data.displayName,
        referredBy: referredBy ? { id: referredBy?.id } : undefined,
        email: data.email,
        credentials: {
          type: AccountCredentialType.EMAIL_PASSWORD,
          password: (await hashPassword(credentials.password)).hash
        } as AccountPasswordCredentials
      })
    );
  }

  /** Create new account using discord account */
  public async createOrFindUsingDiscord(data: CreateDiscordAccountBody, referredBy?: Account): Promise<Account> {
    const credentials = data.credentials as CreateDiscordCredentialsBody;

    if (data.credentials.type !== AccountCredentialType.DISCORD) {
      throw new InternalServerErrorException();
    }

    // Check if discord id exists
    const existsByDiscordId = await this.findByDiscord(credentials.discordId).catch((err: Error) => {
      this._logger.error(`Failed to check if discord id exists: ${err.message}`, err.stack);
      throw new InternalServerErrorException();
    });
    if (existsByDiscordId) return existsByDiscordId;

    // Check if email exists
    const existsByEmail = await this.existsByEmail(credentials.discordId).catch((err: Error) => {
      this._logger.error(`Failed to check if email exists: ${err.message}`, err.stack);
      throw new InternalServerErrorException();
    });
    if (existsByEmail) throw new BadRequestException(ApiErrorCode.ACCOUNT_EMAIL_EXISTS);

    // Create account
    return this._repository.save(
      this._repository.create({
        displayName: data.displayName,
        referredBy: referredBy ? { id: referredBy?.id } : undefined,
        avatar: data.discordAvatarHash
          ? {
              source: AvatarSourceType.DISCORD,
              identifier: data.discordAvatarHash
            }
          : undefined,
        credentials: {
          type: AccountCredentialType.DISCORD,
          discordId: credentials.discordId
        } as AccountDiscordCredentials
      })
    );
  }

  /** Check if an account exists by an email */
  public async existsByEmail(email: string): Promise<boolean> {
    return this._repository.exists({
      where: {
        email: email
      }
    });
  }

  /** Check if an account exists by an email */
  public async existsByDiscordId(discordId: string): Promise<boolean> {
    return this._repository.exists({
      where: {
        credentials: {
          type: AccountCredentialType.DISCORD,
          discordId: discordId
        } as Partial<AccountDiscordCredentials>
      }
    });
  }
}
