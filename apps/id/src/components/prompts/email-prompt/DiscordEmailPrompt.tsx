"use client";

import TextField from "@/components/forms/textfield/TextField";
import ServiceConnection from "@/components/service-connection/ServiceConnection";
import Image from "next/image";
import { useForm } from "react-hook-form";

export interface DiscordEmailPromptProps {
  readonly username: string;
}

export default function DiscordEmailPrompt(props: DiscordEmailPromptProps) {
  const { username } = props;
  const { control } = useForm();

  return (
    <>
      <ServiceConnection
        leftComponent={
          <div className="inline-flex items-center justify-center relative w-14 h-14 rounded bg-brand-discord-blauolett">
            <Image src="/images/logo/discord-mark-white.svg" alt="Discord Logo" width={30} height={30} />
          </div>
        }
      />

      <div className="mt-6xl text-center">
        <h5>Mit Discord anmelden</h5>

        <p className="text-surface-on-variant text-body-sm text-center">
          Willkommen, <em>{username}</em>! Leider konnten wir deine E-Mail Adresse nicht ermitteln. Bitte gib diese
          unten an.
        </p>
      </div>

      <div className="mt-4xl">
        <TextField control={control} label="E-Mail Adresse festlegen" name="email" className="w-full" />
      </div>
    </>
  );
}
