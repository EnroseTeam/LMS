import { FC, ReactNode, useState } from "react";
import Header from "@/components/global/Header";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [sidebarShow, setSidebarShow] = useState<boolean>(false);

  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
