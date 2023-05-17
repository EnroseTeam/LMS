import InstructorNavbar from "@/components/Instructors/Dashboard/Navbar";
import InstructorSidebar from "@/components/Instructors/Dashboard/Sidebar";
import { AuthContext } from "@/contexts/AuthContext";
import { DashboardSidebarProvider } from "@/contexts/DashboardSidebarContext";
import { ModalProvider } from "@/contexts/ModalContext";
import { Roboto } from "next/font/google";
import { useRouter } from "next/router";
import { FC, useState, useEffect, ReactNode, useContext } from "react";

import { FaRegCompass } from "react-icons/fa";
import { AiOutlinePlayCircle, AiOutlineVideoCameraAdd, AiOutlineComment } from "react-icons/ai";
import { HiOutlineCog8Tooth } from "react-icons/hi2";
import { RiShutDownLine } from "react-icons/ri";
import InstructorFooter from "@/components/Instructors/Dashboard/Footer";

interface DashboardLayoutProps {
  children: ReactNode;
}

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin", "cyrillic"],
});

const MenuItems = [
  { title: "Хянах самбар", link: "/instructors/dashboard", Icon: FaRegCompass },
  {
    title: "Миний сургалтууд",
    link: "/instructors/dashboard/my-courses",
    Icon: AiOutlinePlayCircle,
  },
  {
    title: "Сургалт нэмэх",
    link: "/instructors/dashboard/my-courses/create-course",
    Icon: AiOutlineVideoCameraAdd,
  },
  {
    title: "Сэтгэгдлүүд",
    link: "/instructors/dashboard/reviews",
    Icon: AiOutlineComment,
  },
  {
    title: "Тохиргоо",
    link: "/instructors/dashboard/settings",
    Icon: HiOutlineCog8Tooth,
  },
  {
    title: "Гарах",
    link: "/auth/logout",
    Icon: RiShutDownLine,
  },
];

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
          <InstructorNavbar MenuItems={MenuItems} />
          <div className="flex">
            <InstructorSidebar MenuItems={MenuItems} />
            <div className="flex-1">
              <main className="bg-[#f7f8fb] p-[60px] rounded-2xl mr-[30px]">{children}</main>
              <InstructorFooter />
            </div>
          </div>
        </div>
      </ModalProvider>
    </DashboardSidebarProvider>
  );
};

export default DashboardLayout;
