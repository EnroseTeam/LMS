import { FC, ReactNode, useState } from "react";
import Header from "@/components/global/Header";
import Sidebar from "@/components/global/Sidebar";
import { ModalProvider } from "@/contexts/ModalContext";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [sidebarShow, setSidebarShow] = useState<boolean>(false);

  return (
    <ModalProvider>
      <div className="flex min-h-screen">
        <Sidebar sidebarShow={sidebarShow} setSidebarShow={setSidebarShow} />
        <div className="relative flex-1 overflow-y-auto overflow-x-hidden">
          <Header setSidebarShow={setSidebarShow} />
          <main>{children}</main>
        </div>
      </div>
    </ModalProvider>
  );
};

export default MainLayout;
