import type { Metadata } from "next";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "QueueTube",
  description: "Manage your video queues",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background-dark text-typography-900">
        <GluestackUIProvider mode="dark">{children}</GluestackUIProvider>
      </body>
    </html>
  );
}
