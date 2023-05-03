import InstructorNavbar from "@/components/Instructors/InstructorNavbar";
import InstructorSidebar from "@/components/Instructors/InstructorSidebar";
import { useAuthenticate } from "@/hooks/useAuthenticate";
import LoadingScreen from "@/utils/LoadingScreen";
import { useRouter } from "next/router";
import { FC, useState, useEffect } from "react";

interface DashboardLayoutProps {
  children: JSX.Element | JSX.Element[];
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarShow, setSidebarShow] = useState<boolean>(true);
  const { user, isLoading } = useAuthenticate();
  const router = useRouter();
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/");
    }
    if (user && !isLoading && user.role.slug === "student") {
      router.push("/");
    }

    if (user && !isLoading && user.role.slug !== "student") {
      setIsReady(true);
    }
  }, [router, isLoading, user]);

  if (!isReady) return <LoadingScreen />;

  return (
    <>
      <InstructorNavbar
        setSidebarShow={setSidebarShow}
        sidebarShow={sidebarShow}
      />
      <div className="flex">
        <InstructorSidebar sidebarShow={sidebarShow} />
        <main className="bg-[#f7f8fb] p-[60px] flex-1 rounded-2xl">
          {children}
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
