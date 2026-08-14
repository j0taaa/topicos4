import type { Metadata } from "next";
import { Geist, Geist_Mono, Libre_Franklin, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });
const libre = Libre_Franklin({ variable: "--font-libre", subsets: ["latin"] });
const sourceSerif = Source_Serif_4({ variable: "--font-serif", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cloud por baixo das abstrações",
  description:
    "Apresentação avançada sobre virtualização, containers, Kubernetes, redes, alta disponibilidade e sistemas distribuídos.",
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${geist.variable} ${geistMono.variable} ${libre.variable} ${sourceSerif.variable}`}>{children}</body>
    </html>
  );
}
