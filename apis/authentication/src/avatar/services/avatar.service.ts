import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Avatar, AvatarSourceType } from "../entities/avatar.entity";
import { EntityManager, Repository } from "typeorm";
import { S3_BUCKET_AVATAR_KEY } from "../../constants";
import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

@Injectable()
export class AvatarService {
  private readonly _logger = new Logger(AvatarService.name);

  constructor(
    @InjectRepository(Avatar)
    private readonly _repository: Repository<Avatar>,
    private readonly _s3Client: S3Client
  ) {}

  /** Find an avatar associated by an account */
  public async findByAccountId(accountId: string): Promise<Avatar | null> {
    return this._repository.findOne({
      where: {
        account: {
          id: accountId,
        },
      },
    });
  }

  /** Create avatar that is stored in S3 */
  public async createUsingS3(
    accountId: string,
    bucket: string,
    filename: string
  ): Promise<Avatar> {
    return this._repository.save(
      this._repository.create({
        source: AvatarSourceType.S3,
        identifier: `${bucket}/${filename}`,
        account: { id: accountId },
      })
    );
  }

  /** Create an avatar using discord as source */
  public async createUsingDiscord(
    accountId: string,
    hashedValue: string
  ): Promise<Avatar> {
    return this._repository.save(
      this._repository.create({
        source: AvatarSourceType.DISCORD,
        identifier: hashedValue,
        account: { id: accountId },
      })
    );
  }

  /** Delete the avatar associated with an account */
  public async deleteByAccountId(accountId: string): Promise<boolean> {
    const avatar = await this.findByAccountId(accountId).catch((err: Error) => {
      this._logger.error(
        `Failed to find avatar by account id: ${err.message}`,
        err.stack
      );
      throw new InternalServerErrorException();
    });
    if (!avatar) return true;

    // Open new transaction
    return this._repository.manager.transaction(async (manager) => {
      const transactionRepo = manager.getRepository(Avatar);

      // Check if source is S3, if true, delete from bucket
      if (avatar.source === AvatarSourceType.S3) {
        await this.deleteFromS3(avatar.identifier, manager).catch(
          (err: Error) => {
            this._logger.error(
              `Failed to delete avatar file from S3: ${err.message}`,
              err.stack
            );
            throw new InternalServerErrorException();
          }
        );
      }

      return transactionRepo
        .delete({
          account: {
            id: accountId,
          },
        })
        .then((result) => result.affected === 1);
    });
  }

  /** Delete avatar from S3. Pass a manager to run this inside transaction */
  private async deleteFromS3(
    identifier: string,
    manager: EntityManager
  ): Promise<boolean> {
    return this._s3Client
      .send(
        new DeleteObjectCommand({
          Bucket: S3_BUCKET_AVATAR_KEY,
          Key: identifier,
        })
      )
      .then(() => true);
  }
}
