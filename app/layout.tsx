import type { Metadata } from "next";
import { DM_Sans, Poppins } from "next/font/google";
import "./globals.css";
import Favicon from "@/public/favicon/favicon.ico";
import Providers from "@/providers/provider";
import { Toaster } from "sonner";
import AuthProviders from "./provider";
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shift Remit",
  icons: [{ rel: "icon", url: Favicon.src }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${poppins.variable} antialiased bg-background text-foreground`}
      >
        <AuthProviders>
          {" "}
          <Providers>{children}</Providers>
        </AuthProviders>
        <Toaster />
      </body>
    </html>
  );
}
