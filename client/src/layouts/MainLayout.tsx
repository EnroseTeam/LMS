import React, { FC, ReactNode } from "react";
import { Roboto } from "next/font/google";

import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";

interface LayoutProps {
  children: ReactNode;
}

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin", "cyrillic"],
});

const Layout: FC<LayoutProps> = ({ children }) => (
  <div className={roboto.className}>
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);

export default Layout;
