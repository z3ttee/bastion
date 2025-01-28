import { Body, Controller, Post } from "@nestjs/common";
import { SignInService } from "../services/signin.service";
import { SignInWithDiscord } from "../dtos/signin.dto";

@Controller({
  path: "signin",
  version: "1"
})
export class SignInController {
  constructor(private readonly _service: SignInService) {}

  @Post("discord")
  public async signUpWithDiscord(@Body() body: SignInWithDiscord) {
    return this._service.signInWithDiscord(body);
  }
}
