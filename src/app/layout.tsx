import type { Metadata } from "next";
import "./globals.css";
import Footer from '@/src/components/Footer'
import Navbar from '@/src/components/Navbar'
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
import Banner from "../components/Banner";


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
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Banner />
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
