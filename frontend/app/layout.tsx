import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBarWrapper from "@/components/NavBarWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{
          background: "#ececec",
          color: "#222",
          minHeight: "100vh",
          margin: 0,
          fontFamily: "var(--font-geist-sans), sans-serif",
        }}
      >
        <NavBarWrapper />
        {children}
      </body>
    </html>
  );
}
