import type { Metadata, Viewport } from "next";
import { Outfit, Press_Start_2P, Russo_One } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const russo = Russo_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-russo",
});

const pixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press",
});

export const metadata: Metadata = {
  title: "Recrutamento Guilda NotFars",
  description:
    "Ficha da guilda NotFars no Free Fire. Nome ou ID, patente, nível e a função que você joga melhor.",
  icons: { icon: "/brasao-notfars.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} ${russo.variable} ${pixel.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col overflow-x-hidden bg-[#07060c] font-sans text-[#f6ecd4]">
        {children}
      </body>
    </html>
  );
}
