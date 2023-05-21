import MainLayout from "@/layouts/MainLayout";
import "@/styles/globals.css";
import { NextPage } from "next";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { ReactNode } from "react";

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
      <ThemeProvider attribute="class">{getLayout(<Component {...pageProps} />)}</ThemeProvider>
    </>
  );
}
