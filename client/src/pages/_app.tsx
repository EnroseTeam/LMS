import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import NextProgress from "next-progress";

import MainLayout from "@/layouts/MainLayout";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "@/contexts/CartContext";
import { NextPage } from "next";
import { ReactNode } from "react";
import { LoadingProvider } from "@/contexts/LoadingContext";

// eslint-disable-next-line @typescript-eslint/ban-types
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactNode) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
  const getLayout = Component.getLayout ?? ((page): ReactNode => <MainLayout>{page}</MainLayout>);

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
      <LoadingProvider>
        <CartProvider>{getLayout(<Component {...pageProps} />)}</CartProvider>
      </LoadingProvider>
    </>
  );
}
