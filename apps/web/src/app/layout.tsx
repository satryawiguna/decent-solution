import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "WorkspacePro – Design Your Workspace",
  description:
    "Interactive workspace design tool for monis.rent – plan and rent your ideal office setup.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-brand-950 text-white antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
