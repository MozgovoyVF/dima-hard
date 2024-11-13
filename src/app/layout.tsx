import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import { Header } from "@/components/Header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Better Every Day",
  description: "A professional approach to your training",
  themeColor: "#000000",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/logo-192.png",
    apple: "/icons/logo-192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <div id="modal"></div>
          <div id="lead"></div>
          <Toaster theme="dark" position="bottom-right" duration={1500} />
        </Providers>
      </body>
    </html>
  );
}
