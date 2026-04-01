import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QueueTube",
  description: "YouTube queue management for power users",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>{children}</body>
    </html>
  );
}
