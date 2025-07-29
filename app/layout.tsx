import type { Metadata } from "next";
import { Inter, Urbanist } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
});

export const metadata: Metadata = {
  title: "Soccer Coach",
  description: "Soccer Coach",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${urbanist.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
