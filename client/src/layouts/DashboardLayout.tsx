import InstructorNavbar from "@/components/Instructors/InstructorNavbar";
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
          <InstructorNavbar />
          <main className="bg-[#f7f8fb] min-h-screen">{children}</main>
        </>
      )}
    </>
  );
};

export default DashboardLayout;
