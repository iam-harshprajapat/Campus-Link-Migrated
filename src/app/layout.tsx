import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Campus Link",
  description: "Migrating Campus Link from React.js to Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white font-sans">{children}</body>
    </html>
  );
}
