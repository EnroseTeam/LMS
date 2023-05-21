import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import MainLayout from "@/layouts/MainLayout";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <ThemeProvider attribute="class">
        <MainLayout>
          <Component {...pageProps} />
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
        </MainLayout>
      </ThemeProvider>
    </>
  );
}
