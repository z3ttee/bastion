import { Body, Controller, Post } from "@nestjs/common";
import { SignUpService } from "../services/signup.service";
import { SignUpBody } from "../dtos/signup.dto";

@Controller({
  path: "signup",
  version: "1"
})
export class SignUpController {
  constructor(private readonly _service: SignUpService) {}

  @Post()
  public async signUpWithPassword(@Body() body: SignUpBody) {
    return this._service.signUpWithPassword(body);
  }
}
