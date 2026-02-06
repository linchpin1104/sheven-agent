import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "쉬벤처스 창업가 DNA 진단",
  description: "당신의 창업가 유형을 발견하세요. 3가지 뿌리와 3가지 엔진의 조합으로 27가지 마이크로 유형을 분석합니다.",
  openGraph: {
    title: "쉬벤처스 창업가 DNA 진단",
    description: "당신의 창업가 유형을 발견하세요",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "쉬벤처스 창업가 DNA 진단",
    description: "당신의 창업가 유형을 발견하세요",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
