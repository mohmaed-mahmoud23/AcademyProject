import type { Metadata } from "next";
import { Geist, Geist_Mono, Cairo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import ProvidersComponetns from "./providers/Provider";
import { Toaster } from "sonner";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://habib-academy.tech"),

  title: "Habib Academy",
  description: "Learn Programming the Right Way — أكاديمية حبيب",

  openGraph: {
    title: "Habib Academy",
    description: "Learn Programming the Right Way — أكاديمية حبيب",
    url: "https://habib-academy.tech",
    siteName: "Habib Academy",
    locale: "ar_EG",
    type: "website",
    images: [
      {
        url: "/images/logo.svg",
        width: 1200,
        height: 630,
        alt: "Habib Academy Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Habib Academy",
    description: "Learn Programming the Right Way — أكاديمية حبيب",
    images: ["/images/logo.svg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const isRTL = locale === "ar";

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cairo.variable} antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ProvidersComponetns>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster position={isRTL ? "top-left" : "top-right"} />
            </ThemeProvider>
          </ProvidersComponetns>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
