import Layout from '@/components/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <title key="title">IntelliSense - Learning Management System</title>
        <meta
          key="description"
          name="description"
          content="Learning Management System created by IntelliSense"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout props={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
