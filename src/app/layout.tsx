import type { Metadata } from "next";
import { Outfit, Fira_Code } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Swapnil | Portfolio OS - DevOps & SRE Engineer",
  description: "Explore the interactive Linux desktop and terminal portfolio of Swapnil, a DevOps, Multi-Cloud, SRE, and Network Engineer. Boot into a custom GNOME-style desktop running directly in your browser.",
  keywords: ["DevOps Portfolio", "SRE Portfolio", "Cloud Engineer Portfolio", "Linux OS Portfolio", "Kubernetes Portfolio", "Terraform Portfolio", "Web Terminal Portfolio", "Swapnil DevOps"],
  authors: [{ name: "Swapnil" }],
  openGraph: {
    title: "Swapnil | Portfolio OS - DevOps & SRE Engineer",
    description: "An interactive, bootable Linux desktop and terminal portfolio highlighting cloud architecture, kubernetes management, and automated infra.",
    type: "website",
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
      className={`${outfit.variable} ${firaCode.variable} h-full select-none overflow-hidden`}
    >
      <body className="h-full w-full bg-black text-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
