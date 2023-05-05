import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import NextProgress from "next-progress";

import Layout from "@/layouts/Layout";
import { ToastContainer } from "react-toastify";

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
      </Head>
      <NextProgress />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Layout props={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
