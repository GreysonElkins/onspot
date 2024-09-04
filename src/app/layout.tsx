import type { Metadata } from "next"
import { UserProvider } from '@auth0/nextjs-auth0/client'
import Navigation from "@/components/Navigation";

import { Inter } from "next/font/google";
import '@/style/global.scss'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "onSpot",
  description: "Advanced Tools for Spotify Playlists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          <Navigation />
          <main>
            {children}
          </main>
        </body>
      </UserProvider>
    </html>
  );
}
