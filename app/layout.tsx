import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import React from "react";

// const inter = Inter({ subsets: ["latin"] });
const ibmPlexSans = IBM_Plex_Sans({weight: '400', subsets: ["cyrillic"]});

export const metadata: Metadata = {
  title: "Cloud ChatApp",
  description: "Created by Piyush Kalyan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={ibmPlexSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
