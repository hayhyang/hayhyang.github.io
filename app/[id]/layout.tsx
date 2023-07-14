import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Welcome to Next.js",
};

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
