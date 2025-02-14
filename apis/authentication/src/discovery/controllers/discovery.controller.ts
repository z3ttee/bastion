import { Controller, Get, Req } from "@nestjs/common";
import { Request } from "express";
import { DiscoveryService } from "../services/discovery.service";

@Controller(".well-known")
export class DiscoveryController {
  constructor(private readonly _service: DiscoveryService) {}

  @Get("openid-configuration")
  public async getOpenIdConfiguration(@Req() req: Request) {
    return this._service.findDiscoveryDocument(req);
  }
}
