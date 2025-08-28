import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "01. SSR 학습 - Next.js",
  description: "Server-Side Rendering 학습 페이지",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-gray-100 min-h-screen">{children}</body>
    </html>
  );
}
