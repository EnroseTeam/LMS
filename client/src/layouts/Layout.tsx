import React, { FC } from "react";
import { Roboto } from "next/font/google";

import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import { ICourseCategory } from "@/interfaces/courses";
import { useRouter } from "next/router";
import UserProvider from "@/contexts/UserContext";
import DashboardLayout from "./DashboardLayout";

interface LayoutProps {
  children: JSX.Element;
  props: {
    categories: ICourseCategory[];
  };
}

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

const Layout: FC<LayoutProps> = ({ children, props }) => {
  const router = useRouter();

  if (router.pathname.includes("lessons") || router.pathname.includes("auth")) {
    return (
      <UserProvider>
        <div className={roboto.className}>{children}</div>
      </UserProvider>
    );
  }

  if (router.pathname.includes("instructors/dashboard")) {
    return (
      <UserProvider>
        <div className={roboto.className}>
          <DashboardLayout>{children}</DashboardLayout>
        </div>
      </UserProvider>
    );
  }

  return (
    <UserProvider>
      <div className={roboto.className}>
        <Header />
        <main>{children}</main>
        <Footer categories={props.categories} />
      </div>
    </UserProvider>
  );
};

export default Layout;