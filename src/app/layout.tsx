import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import Navbar from "./components/Navbar";
import LogoSvg from "./assets/logo.svg";
import Navbar from "./components/Navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const neueHaas = localFont({
  src: "./fonts/neue-haas-grotesk-display-pro-cufonfonts/NeueHaasDisplayRoman.ttf", // Ensure this path is correct
  variable: "--font-neue-haas",
  weight: "normal",
});

export const metadata: Metadata = {
  title: "Education Assistant LLM",
  description: "Developed by Fahad Abdul Qayyum",
};

// RootLayout component serves as the main layout for the application
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${neueHaas.variable} antialiased`}
      >
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar/>  
      </div> 
        {children}
      </body>
    </html>
  );
}
