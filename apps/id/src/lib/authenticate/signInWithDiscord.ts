import { ApiResponse } from "../types";
import { SignInWithDiscordResponse } from "./types";

/** Sign in using discord grant code */
export async function apiSignInWithDiscord(grantCode: string): Promise<ApiResponse<SignInWithDiscordResponse>> {
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/v1/signin/discord`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      discordGrantCode: grantCode
    })
  }).then((res) => res.json());
}
