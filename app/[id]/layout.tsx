import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Welcome to Next.js",
};

export default function PostLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
