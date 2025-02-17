import "@/lib/fontawesome";
import { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="preload" href="/images/beach.jpg" as="image" />
        <link rel="preload" href="/images/lake.jpg" as="image" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;