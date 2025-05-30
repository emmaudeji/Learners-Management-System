import type { Metadata } from "next";
import {  Montserrat } from "next/font/google";
import "./globals.css";
import { AlertModal } from "@/components/common/AlertModal";
import { Suspense } from "react";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
 
import { poppins } from "../fonts/font";
import { Karla } from "next/font/google";
import "./globals.css";
import { GlobalContextProvider } from "@/context/RootContext";

const geistKarla = Karla({
  variable: "--font-geist-karla",
  subsets: ["latin"],
});


const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});
 
export const metadata: Metadata = {
  title: "HubX - Start Learing Like A Pro",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistKarla.variable} ${poppins.variable} ${montserrat.variable} font-poppins  antialiased`}
      >
        <GlobalContextProvider>
          <ToastContainer/>
          <Suspense>
            <AlertModal/>
          </Suspense>
          <main className="min-h-[60vh]">{children}</main>
        </GlobalContextProvider>
      </body>
    </html>
  );
}
