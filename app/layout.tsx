import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeScript } from "@/components/ThemeScript";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Pulse",
  description: "Personal news & blog aggregator",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Pulse",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FAF7F2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen antialiased`}>
        <ThemeScript />
        {children}
      </body>
    </html>
  );
}
