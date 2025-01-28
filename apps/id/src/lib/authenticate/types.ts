export type AuthenticatePrompt = "none";

export interface SignInWithDiscordResponse {
  readonly prompt?: AuthenticatePrompt;
  readonly code?: string;
}
