import "@repo/ui/main.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import Providers from "./providers";
export const metadata: Metadata = {
  title: "Stellar Shop | Seller Panel",
  description: "A Full Stack Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
