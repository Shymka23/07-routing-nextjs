import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NoteHub - Personal Note Management App",
  description:
    "A modern and efficient application for managing personal notes with search functionality and organized structure.",
  keywords: ["notes", "productivity", "organization", "personal", "management"],
  authors: [{ name: "Yevhen Shymka" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TanStackProvider>
          <Header />

          <main>{children}</main>

          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
