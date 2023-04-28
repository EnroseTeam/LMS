import InstructorNavbar from "@/components/Instructors/InstructorNavbar";
import InstructorSidebar from "@/components/Instructors/InstructorSidebar";
import { FC, useState } from "react";

interface DashboardLayoutProps {
  children: JSX.Element | JSX.Element[];
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarShow, setSidebarShow] = useState<boolean>(true);

  return (
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
  );
};

export default DashboardLayout;
