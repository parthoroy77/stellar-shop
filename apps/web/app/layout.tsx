import "@repo/ui/main.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Stellar Shop | Ecommerce",
  description: "A Full Stack Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
