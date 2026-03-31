import type { Metadata } from "next";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "QueueTube",
  description: "Your personal video queue manager",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GluestackUIProvider mode="dark">{children}</GluestackUIProvider>
      </body>
    </html>
  );
}
