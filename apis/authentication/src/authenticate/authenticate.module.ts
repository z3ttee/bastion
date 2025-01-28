import { Module } from "@nestjs/common";
import { SignUpService } from "./services/signup.service";
import { SignUpController } from "./controllers/signup.controller";
import { AccountModule } from "../account/account.module";
import { SignInService } from "./services/signin.service";
import { SignInController } from "./controllers/signin.controller";
import { SocialsModule } from "../socials/socials.module";

@Module({
  imports: [AccountModule, SocialsModule],
  providers: [SignUpService, SignInService],
  controllers: [SignUpController, SignInController]
})
export class AuthenticateModule {}
