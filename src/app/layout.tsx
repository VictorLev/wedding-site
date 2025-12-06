import type { Metadata } from "next";
import { Fraunces, Imperial_Script } from 'next/font/google';
import "./globals.css";
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const imperialScript = Imperial_Script({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-imperial-script',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Mariage de Marie-Lie & Victor",
  description: "Voici le site de notre mariage pour vous donner toutes les informations nécessaires pour le jour J.",
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${fraunces.variable} ${imperialScript.variable}`}>
      <body className={fraunces.className}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
