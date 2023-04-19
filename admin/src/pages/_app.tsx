import Navbar from "@/components/global/Navbar";
import Sidebar from "@/components/global/Sidebar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <Component {...pageProps} />
      </div>
    </>
  );
}
