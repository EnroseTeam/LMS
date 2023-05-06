import UserCourseCard from "@/components/User/UserCourseCard";
import Breadcrumbs from "@/components/global/Breadcrumbs";
import { useAuthenticate } from "@/hooks/useAuthenticate";
import LoadingScreen from "@/utils/LoadingScreen";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

const UserCoursesPage: FC = () => {
  const { user, isLoading } = useAuthenticate();

  const [isReady, setIsReady] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
    }
    if (!isLoading && user) {
      setIsReady(true);
    }
  }, [user, isLoading, router]);

  if (!isReady) return <LoadingScreen />;

  return (
    <>
      <Breadcrumbs
        breadcrumbItems={[{ title: "Миний сургалтууд", link: "/user/courses" }]}
      />
      <div className="container mb-[120px]">
        <h1 className="text-head text-3xl-bold mb-[100px]">Миний сургалтууд</h1>
        {user && user.boughtCourses.length > 0 && (
          <div className="grid grid-cols-2 gap-[30px]">
            {user.boughtCourses.map((course) => (
              <UserCourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
        {user && user.boughtCourses.length === 0 && (
          <p className="text-center text-text text-md-medium">
            Танд одоогоор худалдаж авсан сургалт байхгүй байна.
          </p>
        )}
      </div>
    </>
  );
};

export default UserCoursesPage;
