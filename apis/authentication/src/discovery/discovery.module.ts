import { Module } from "@nestjs/common";
import { DiscoveryController } from "./controllers/discovery.controller";
import { DiscoveryService } from "./services/discovery.service";

@Module({
  controllers: [DiscoveryController],
  providers: [DiscoveryService],
})
export class DiscoveryModule {}
