import "@repo/ui/main.css";
import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
