import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "./entities/account.entity";
import { AccountService } from "./services/account.service";
import {
  LinkedAccount,
  LinkedDiscordAccount,
  LinkedPasswordAccount,
} from "./entities/linked-account.entity";

@Module({
  providers: [AccountService],
  imports: [
    TypeOrmModule.forFeature([
      Account,
      LinkedAccount,
      LinkedDiscordAccount,
      LinkedPasswordAccount,
    ]),
  ],
  exports: [AccountService],
})
export class AccountModule {}
