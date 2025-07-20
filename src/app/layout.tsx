import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | Developer & Designer",
  description: "Professional portfolio showcasing web development, design, and creative projects",
  keywords: ["portfolio", "developer", "designer", "web development", "react", "next.js"],
  authors: [{ name: "Your Name" }],
  icons: {
    icon: [
      { url: '/Main_logo(1).png', type: 'image' },
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
    apple: '/favicon.svg',
  },
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
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/Main_logo(1).png" type="image" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
