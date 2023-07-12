import { Metadata } from "next";
import "@/styles/globals.css";
import { poppins, pretendard } from "@/styles/font";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Next.js",
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
            <Link href="/">Blog</Link>
          </h1>
        </header>
        <div></div>
        {children}
      </body>
    </html>
  );
}
