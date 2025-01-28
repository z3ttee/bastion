import { Module } from "@nestjs/common";
import { DiscordSocialService } from "./services/discord.service";

@Module({
  providers: [DiscordSocialService],
  exports: [DiscordSocialService]
})
export class SocialsModule {}
