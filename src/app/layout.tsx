import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GluestackUIProvider } from "./gluestack-ui-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QueueTube",
  description: "Manage and play your YouTube queues",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <GluestackUIProvider mode="dark">{children}</GluestackUIProvider>
      </body>
    </html>
  );
}
