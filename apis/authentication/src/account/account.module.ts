import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "./entities/account.entity";
import { AccountService } from "./services/account.service";
import { MulterModule } from "@nestjs/platform-express";
import {
  AccountCredentials,
  AccountDiscordCredentials,
  AccountPasswordCredentials
} from "./entities/credentials.entity";

@Module({
  providers: [AccountService],
  imports: [
    TypeOrmModule.forFeature([Account, AccountCredentials, AccountPasswordCredentials, AccountDiscordCredentials])
  ],
  exports: [AccountService]
})
export class AccountModule {}
