import { Exclude } from "class-transformer";
import {
  ChildEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from "typeorm";
import { Account } from "./account.entity";

export enum LinkedAccountType {
  EMAIL_PASSWORD = "email_password",
  DISCORD = "discord",
}

@Entity()
@TableInheritance({ column: "provider" })
export class LinkedAccount {
  @PrimaryGeneratedColumn("uuid")
  public readonly id: string;

  @Column({ nullable: false, enum: LinkedAccountType, type: "enum" })
  public readonly provider!: LinkedAccountType;

  /** Get credentials for account */
  @ManyToOne(() => Account, (account) => account.linkedAccounts, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  @Exclude()
  public account?: Account;

  @CreateDateColumn({ nullable: false })
  public readonly linkedAt: Date;

  @UpdateDateColumn()
  public readonly updatedAt?: Date;
}

@ChildEntity(LinkedAccountType.EMAIL_PASSWORD)
export class LinkedPasswordAccount extends LinkedAccount {
  /** Password used to signin to the account */
  @Column({ nullable: false })
  @Exclude()
  public password: string;
}

@ChildEntity(LinkedAccountType.DISCORD)
export class LinkedDiscordAccount extends LinkedAccount {
  @Column({ unique: true, nullable: false })
  public readonly discordId: string;
}
