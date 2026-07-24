import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RadioPlayerProvider } from "@/lib/hooks/useRadioPlayer";
import ClientLayout from "./ClientLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VPM International — Voice of the Potter's Messengers",
    template: "%s | VPM International",
  },
  description:
    "VPM International is a ministry rooted in prayer, the prophetic word, and the transforming power of the Gospel. Watch sermons, listen to radio, request prayer, and connect with branches across Kenya.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_CHURCH_WEBSITE || "https://vpminternational.org"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "VPM International",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <RadioPlayerProvider>
          <ClientLayout>{children}</ClientLayout>
        </RadioPlayerProvider>
      </body>
    </html>
  );
}
