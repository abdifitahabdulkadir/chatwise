import { SessionProvider } from "next-auth/react";
import { interFont } from "../lib/fonts";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={` ${interFont.className} antialiased`}>
          {children}
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
