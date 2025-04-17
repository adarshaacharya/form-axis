import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClerkProvider } from "./provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Form Axis | AI-Powered Form Builder",
  description:
    "Create forms by simply writing prompts. Share a link and let users answer naturally through a chat interface.",
  keywords: "AI, forms, chat interface, user experience",
  authors: [{ name: "Adarsha Acharya", url: "https://adarsha.dev" }],
  creator: "Adarsha Acharya",
  openGraph: {
    title: "Form Axis | AI-Powered Form Builder",
    description:
      "Create forms by simply writing prompts. Share a link and let users answer naturally through a chat interface.",
    url: "https://formaxis.dev",
    siteName: "Form Axis",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ConvexClerkProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Analytics />
              <Toaster position="top-right" />
            </ThemeProvider>
          </ConvexClerkProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
