import { FC, ReactNode, useContext, useEffect, useState } from "react";
import Header from "@/components/global/Header";
import Sidebar from "@/components/global/Sidebar";
import { ModalProvider } from "@/contexts/ModalContext";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [sidebarShow, setSidebarShow] = useState<boolean>(false);
  const { user, isUserLoading, setIsLoggedIn, setUser } = useContext(AuthContext);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/auth/login");
    }

    if (!isUserLoading && user && (user.role === "Student" || user.role === "Instructor")) {
      toast.error("Танд нэвтрэх эрх байхгүй байна.");
      setIsLoggedIn(false);
      setUser(undefined);
      router.push("/auth/login");
    }

    if (!isUserLoading && user && (user.role === "Admin" || user.role === "Moderator")) {
      setIsAuthenticated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isUserLoading]);

  if (!isAuthenticated) return <></>;

  return (
    <ModalProvider>
      <div className="flex h-screen overflow-hidden">
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
