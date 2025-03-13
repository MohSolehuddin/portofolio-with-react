import { ThemeProvider } from "@/components/provider/ThemeProvider";
import { ModeToggle } from "@/components/toggle/ModeToggle";
import type { Metadata } from "next";
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
  title: "Moh Solehuddin - Fullstack Developer",
  icons: [
    { rel: "shortcut icon", url: "/solehuddin.webp", type: "image/x-icon" },
    { rel: "icon", url: "/solehuddin.webp", type: "image/x-icon" },
  ],
  description:
    "I'm Moh Solehuddin, a fullstack developer with a passion for building scalable and maintainable web applications. I'm proficient in a range of programming languages, including JavaScript, TypeScript, and Python. I'm also experienced in using various frameworks and libraries, such as React, Next.js, and Django.",
  keywords: [
    "Moh Solehuddin",
    "Msytc",
    "Fullstack Developer",
    "Frontend Developer",
    "Backend Developer",
  ],
  authors: {
    name: "Moh Solehuddin",
  },
  creator: "Moh Solehuddin",
  publisher: "Moh Solehuddin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <section className="absolute top-6 right-6 z-50">
            <ModeToggle />
          </section>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
