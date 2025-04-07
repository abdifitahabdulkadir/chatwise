import Provider from "@/components/shared/Provider";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { interFont } from "../lib/fonts";
import "./globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body className={` ${interFont.className} antialiased`}>
          <Provider>{children}</Provider>
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  );
}
