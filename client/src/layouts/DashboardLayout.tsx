import InstructorNavbar from "@/components/Instructors/Dashboard/Navbar";
import InstructorSidebar from "@/components/Instructors/Dashboard/Sidebar";
import { ModalProvider } from "@/contexts/ModalContext";
import { useAuthenticate } from "@/hooks/useAuthenticate";
import { Roboto } from "next/font/google";
import { useRouter } from "next/router";
import { FC, useState, useEffect, ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin", "cyrillic"],
});

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarShow, setSidebarShow] = useState<boolean>(true);
  const { user, isLoading } = useAuthenticate();
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/");
    }
    if (user && !isLoading && user.role.slug === "student") {
      router.push("/");
    }

    if (!isLoading && user && user.role.slug !== "student") {
      setIsAuthenticated(true);
    }
  }, [router, isLoading, user]);

  if (!isAuthenticated) {
    return <></>;
  }

  return (
    <ModalProvider>
      <div className={roboto.className}>
        <InstructorNavbar setSidebarShow={setSidebarShow} sidebarShow={sidebarShow} />
        <div className="flex">
          <InstructorSidebar sidebarShow={sidebarShow} />
          <main className="bg-[#f7f8fb] p-[60px] flex-1 rounded-2xl mr-[30px]">{children}</main>
        </div>
      </div>
    </ModalProvider>
  );
};

export default DashboardLayout;
