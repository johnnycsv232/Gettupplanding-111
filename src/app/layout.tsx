import type { Metadata } from "next";
import { Outfit, Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: ["400"],
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
    <html lang="en" className={`${outfit.variable} ${inter.variable} ${bebasNeue.variable}`}>
      <body className="font-sans antialiased bg-deep-void-black text-off-white selection:bg-neon-magenta selection:text-white">
        {children}
      </body>
    </html>
  );
}
