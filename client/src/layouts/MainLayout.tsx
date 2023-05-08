import React, { FC, ReactNode, useContext, useEffect } from "react";
import { Roboto } from "next/font/google";

import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import { useRouter } from "next/router";
import { LoadingContext } from "@/contexts/LoadingContext";

interface LayoutProps {
  children: ReactNode;
}

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin", "cyrillic"],
});

const Layout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const { setShowLoading } = useContext(LoadingContext);

  useEffect(() => {
    router.events.on("routeChangeStart", (url, { shallow }) => {
      setShowLoading(true);
    });
    router.events.on("routeChangeComplete", (url, { shallow }) => {
      setShowLoading(false);
    });

    return () => {
      router.events.off("routeChangeStart", () => {
        setShowLoading(false);
      });
    };
  }, [router.query]);

  return (
    <div className={roboto.className}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
