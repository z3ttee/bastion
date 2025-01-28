import { Exclude } from "class-transformer";
import { ChildEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import { Account } from "./account.entity";

export enum AccountCredentialType {
  EMAIL_PASSWORD = "email_password",
  DISCORD = "discord"
}

@Entity()
@TableInheritance({ column: "type" })
export class AccountCredentials {
  @PrimaryGeneratedColumn("uuid")
  public readonly id: string;

  @Column({ nullable: false, enum: AccountCredentialType, type: "enum" })
  public readonly type!: AccountCredentialType;

  /** Get credentials for account */
  @OneToOne(() => Account, (account) => account.credentials, {
    nullable: false,
    onDelete: "CASCADE"
  })
  @Exclude()
  public account?: Account;
}

@ChildEntity(AccountCredentialType.EMAIL_PASSWORD)
export class AccountPasswordCredentials extends AccountCredentials {
  /** Password used to signin to the account */
  @Column({ nullable: false })
  @Exclude()
  public password: string;
}

@ChildEntity(AccountCredentialType.DISCORD)
export class AccountDiscordCredentials extends AccountCredentials {
  @Column({ unique: true, nullable: false })
  public readonly discordId: string;
}
