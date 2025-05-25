import type { Metadata } from "next";
import "../styles/globals.css";

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
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
