import InstructorNavbar from "@/components/Instructors/Dashboard/Navbar";
import InstructorSidebar from "@/components/Instructors/Dashboard/Sidebar";
import { AuthContext } from "@/contexts/AuthContext";
import { DashboardSidebarProvider } from "@/contexts/DashboardSidebarContext";
import { ModalProvider } from "@/contexts/ModalContext";
import { Roboto } from "next/font/google";
import { useRouter } from "next/router";
import { FC, useState, useEffect, ReactNode, useContext } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin", "cyrillic"],
});

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const { user, isUserLoading } = useContext(AuthContext);
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (!user && !isUserLoading) {
      router.push("/");
    }
    if (user && !isUserLoading && user.role.slug === "student") {
      router.push("/");
    }

    if (!isUserLoading && user && user.role.slug !== "student") {
      setIsAuthenticated(true);
    }
  }, [router, isUserLoading, user]);

  if (!isAuthenticated) {
    return <></>;
  }

  return (
    <DashboardSidebarProvider>
      <ModalProvider>
        <div className={roboto.className}>
          <InstructorNavbar />
          <div className="flex">
            <InstructorSidebar />
            <main className="bg-[#f7f8fb] p-[60px] flex-1 rounded-2xl mr-[30px]">{children}</main>
          </div>
        </div>
      </ModalProvider>
    </DashboardSidebarProvider>
  );
};

export default DashboardLayout;
