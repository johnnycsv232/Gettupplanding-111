import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "GETTUPP ENT | Elite Nightlife & Luxury Design",
  description: "Liquid Glass Premium Nightlife Luxury. Own The Night.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-deep-void-black text-off-white selection:bg-neon-magenta selection:text-white">
        {children}
      </body>
    </html>
  );
}
