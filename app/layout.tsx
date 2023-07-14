import { Metadata } from "next";
import "@/styles/globals.css";
import { poppins, pretendard } from "@/styles/font";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Build with Next.js v13",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={`${poppins.className} ${pretendard.className}`}>
      <body>
        <header>
          <h1>
            <Link href="/">오늘도 개미는 🐜 뚠뚠</Link>
          </h1>
          <span>서개미</span>
        </header>
        <div></div>
        {children}
      </body>
    </html>
  );
}
