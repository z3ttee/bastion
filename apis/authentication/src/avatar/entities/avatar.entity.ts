import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "../../account/entities/account.entity";
import { Exclude } from "class-transformer";

export enum AvatarSourceType {
  DISCORD = "discord",
  S3 = "s3"
}

@Entity()
export class Avatar {
  @PrimaryGeneratedColumn("uuid")
  public readonly id: string;

  /**
   * Where the avatar originates from.
   * For example when user used discord when signin up,
   * the source would be "discord"
   */
  @Column({ nullable: false })
  public source: AvatarSourceType;

  /**
   * Identifier of the avatar at the
   * specified source.
   * In case of discord this would be for example the
   * hash value of the profile picture
   */
  @Column({ nullable: false })
  public identifier: string;

  @OneToOne(() => Account, (account) => account.avatar, { nullable: false, onDelete: "CASCADE" })
  @Exclude()
  public account: Account;
}
