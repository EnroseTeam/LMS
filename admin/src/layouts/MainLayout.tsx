import { FC, ReactNode, useState } from "react";
import { Roboto } from "next/font/google";
import Header from "@/components/global/Header";

interface MainLayoutProps {
  children: ReactNode;
}

const roboto = Roboto({
  subsets: ["cyrillic", "latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [sidebarShow, setSidebarShow] = useState<boolean>(false);

  return (
    <div className={roboto.className}>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
