import "@/styles/globals.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import NextProgress from "next-progress";

import Layout from "@/layouts/Layout";
import logo from "../assets/logo-main.svg";

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
        <link rel={logo} href={logo} />
      </Head>
      <NextProgress />
      <Layout props={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
