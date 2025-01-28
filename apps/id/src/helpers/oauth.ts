export function getDiscordAuthorizeUrl() {
  const discordAuthorizeUrl = new URL(process.env.DISCORD_AUTHORIZE_ENDPOINT);
  discordAuthorizeUrl.searchParams.set("client_id", process.env.DISCORD_CLIENT_ID);
  discordAuthorizeUrl.searchParams.set("response_type", "code");
  discordAuthorizeUrl.searchParams.set("redirect_uri", process.env.DISCORD_CALLBACK_URL);
  discordAuthorizeUrl.searchParams.set("scope", ["identify", "openid", "email"].join(" "));

  return discordAuthorizeUrl.toString();
}
