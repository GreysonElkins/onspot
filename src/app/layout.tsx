import type { Metadata } from "next"
import { ClerkProvider } from '@clerk/nextjs'

import Navigation from "@/components/Navigation";
import Sidebar from "@/components/Sidebar"
import { SpotifyUser } from "@/context";

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
        <SpotifyUser>
          <body className={inter.className}>
            <Navigation />
            <div className="Main">
              <Sidebar />
              <main>
                {children}
              </main>
            </div>
          </body>
        </SpotifyUser>
      </ClerkProvider>
    </html>
  );
}
