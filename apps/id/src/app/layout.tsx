import "./globals.scss";
import type { Metadata } from "next";
import { Reddit_Sans, Inter } from "next/font/google";
import Image from "next/image";
import { JSX } from "react";

const redditSans = Reddit_Sans({
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bastion ID :: Login using your Bastion account",
  description: "Secure login to your Bastion account",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body
        className={`${redditSans.className} ${inter.className} relative bg-surface-bright`}
      >
        <main className="mx-auto flex flex-col container h-full relative p-6xl gap-xl">
          <div className="flex items-center justify-start gap-sm">
            <Image src="/logo.svg" alt="Bastion Logo" width={32} height={32} />
            <p className="font-bold text-body-lg">Bastion</p>
          </div>

          <section className="flex items-center justify-center flex-grow overflow-hidden">
            <div className="max-h-full w-[400px]">{children}</div>
          </section>
        </main>
      </body>
    </html>
  );
}
