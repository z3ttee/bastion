import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Avatar } from "../../avatar/entities/avatar.entity";
import { LinkedAccount } from "./linked-account.entity";

export enum AccountState {
  ACTIVE = "active",
  DISABLED = "disabled",
}

@Entity()
export class Account {
  /** Unique identifier of account */
  @PrimaryGeneratedColumn("uuid")
  public readonly id: string;

  /** Name of the account that others can see */
  @Column({ nullable: false })
  public displayName: string;

  /** Id of the avatar file */
  @Column({
    nullable: false,
    type: "enum",
    enum: AccountState,
    default: AccountState.ACTIVE,
  })
  public state?: AccountState;

  /** E-Mail used to login */
  @Column({ unique: true, nullable: true })
  public email?: string;

  /** Check if the email was verified */
  @Column({ nullable: false, default: false })
  @Exclude()
  public isEmailVerified: boolean;

  /** Date when the account was created */
  @CreateDateColumn({ nullable: false })
  public readonly createdAt: Date;

  /** Get credentials for account */
  @OneToOne(() => Avatar, {
    nullable: true,
    cascade: ["insert", "update"],
    onDelete: "SET NULL",
  })
  @JoinColumn()
  public avatar?: Avatar;

  /** Get credentials for account */
  @OneToMany(() => LinkedAccount, (linked) => linked.account, {
    nullable: false,
    cascade: ["insert", "update"],
    onDelete: "SET NULL",
  })
  @Exclude()
  public linkedAccounts?: LinkedAccount[];

  /** Get account that this account was referred by */
  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn()
  @Exclude()
  public referredBy?: Account;
}
