import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "İzci - Sosyal Medya Analiz Platformu",
  description: "Instagram, TikTok, WhatsApp ve daha fazlası için güçlü sosyal medya analiz aracı",
  keywords: ["sosyal medya", "analiz", "instagram", "tiktok", "takipçi", "stalker"],
  authors: [{ name: "İzci Team" }],
  openGraph: {
    title: "İzci - Sosyal Medya Analiz Platformu",
    description: "Instagram, TikTok, WhatsApp ve daha fazlası için güçlü sosyal medya analiz aracı",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body className={`${inter.className} bg-gray-950 text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
