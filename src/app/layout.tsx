import type { Metadata } from "next"
import { ClerkProvider } from '@clerk/nextjs'
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
      <ClerkProvider>
        <body className={inter.className}>
          <Navigation />
          <main>
            {children}
          </main>
        </body>
      </ClerkProvider>
    </html>
  );
}
