import { Module, Provider } from "@nestjs/common";
import { SignUpService } from "./services/signup.service";
import { SignUpController } from "./controllers/signup.controller";
import { AccountModule } from "../account/account.module";
import { SignInService } from "./services/signin.service";
import { SignInController } from "./controllers/signin.controller";
import { DiscordProvider } from "./providers/discord/discordProvider";
import { AuthenticationProviderModuleConfig } from "./providers/types";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "../account/entities/account.entity";
import { PasswordProvider } from "./providers/password/passwordProvider";
import { AuthenticationProviderService } from "./services/provider.service";

@Module({
  imports: [AccountModule, TypeOrmModule.forFeature([Account])],
  providers: [
    AuthenticationProviderService,
    DiscordProvider,
    PasswordProvider,
    SignUpService,
    SignInService,
    {
      provide: AuthenticationProviderModuleConfig,
      useFactory: (config: ConfigService) => config.getOrThrow("authProviders"),
      inject: [ConfigService],
    },
  ],
  controllers: [SignUpController, SignInController],
})
export class AuthenticateModule {}
