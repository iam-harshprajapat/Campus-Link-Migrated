import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from 'next/font/google'
import { AuthProvider } from "@/context/authContext";
import NotificationProvider from "@/components/shared/notification/notificationProvider";
import BottomNav from "@/components/layout/bottom-nav";
import { LoaderProvider } from "@/context/loaderProvider";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' })

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
      <body className={`${geist.variable} ${geistMono.variable} font-sans`}>
        <NotificationProvider>
          <LoaderProvider>
            <AuthProvider>{children}</AuthProvider>
          </LoaderProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}
