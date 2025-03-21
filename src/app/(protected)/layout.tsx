"use client";
import "@/app/globals.css";
import { NavBar } from "@/components/Header/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen w-screen px-12`}>
        <SessionProvider>
          <QueryClientProvider client={queryClient}>
            <NavBar />

            {children}
          </QueryClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
