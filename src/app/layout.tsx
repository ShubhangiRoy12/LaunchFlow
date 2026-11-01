import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LaunchFlow AI - AI Creative Director for Product Launches",
  description: "Turn websites, products and ideas into stunning launch videos in minutes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
