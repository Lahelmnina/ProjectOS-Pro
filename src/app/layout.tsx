import type { Metadata } from "next";
import "./globals.css";
import { OSStateProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "ProjectOS Pro — Personal Operating System",
  description: "Advanced Personal Operating System for Human Productivity",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased grid-bg text-gray-100 min-h-screen">
        <OSStateProvider>
          {children}
        </OSStateProvider>
      </body>
    </html>
  );
}
