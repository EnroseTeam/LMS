import InstructorNavbar from "@/components/Instructors/InstructorNavbar";
import InstructorSidebar from "@/components/Instructors/InstructorSidebar";
import { UserContext } from "@/contexts/UserContext";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";

interface DashboardLayoutProps {
  children: JSX.Element | JSX.Element[];
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useContext(UserContext);
  const router = useRouter();

  const [sidebarShow, setSidebarShow] = useState<boolean>(true);

  useEffect(() => {
    if (!user || user.role.slug === "student") {
      router.back();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  return (
    <>
      {!isLoading && (
        <>
          <InstructorNavbar
            setSidebarShow={setSidebarShow}
            sidebarShow={sidebarShow}
          />
          <div className="flex">
            <InstructorSidebar sidebarShow={sidebarShow} />
            <main className="bg-[#f7f8fb] min-h-screen flex-1 rounded-2xl">
              {children}
            </main>
          </div>
        </>
      )}
    </>
  );
};

export default DashboardLayout;
