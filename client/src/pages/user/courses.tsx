import UserCourseCard from "@/components/User/UserCourseCard";
import Breadcrumbs from "@/components/global/Breadcrumbs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NextPageWithLayout } from "../_app";
import useSwr from "swr";
import { fetcher } from "@/utils/fetcher";
import { ICourse } from "@/interfaces/courses";
import UserCourseSkeleton from "@/components/Skeletons/UserCourseSkeleton";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

const UserCoursesPage: NextPageWithLayout = () => {
  const {
    data: userCourses,
    isLoading: isCoursesLoading,
    error: userCourseError,
  } = useSwr("/api/courses/user", fetcher<{ body: ICourse[] }>);
  const router = useRouter();

  const [courses, setCourses] = useState<ICourse[]>([]);

  useEffect(() => {
    if (!isCoursesLoading && userCourseError) {
      if (isAxiosError(userCourseError)) {
        if (userCourseError.response?.status === 401) {
          toast.warning("Та эхлээд нэвтэрнэ үү!");
          router.replace("/auth/login");
        }
      } else router.replace("/");
    }

    if (!isCoursesLoading && userCourses) {
      setCourses(userCourses.body);
    }
  }, [router, userCourses, isCoursesLoading, userCourseError]);

  return (
    <>
      <Breadcrumbs breadcrumbItems={[{ title: "Миний сургалтууд", link: "/user/courses" }]} />
      <div className="container mb-[120px]">
        <h1 className="text-head text-3xl-bold mb-[100px]">Миний сургалтууд</h1>
        {isCoursesLoading && (
          <div className="grid grid-cols-2 gap-[30px]">
            {Array.from(Array(6)).map((val, index) => (
              <UserCourseSkeleton key={index} />
            ))}
          </div>
        )}
        {!isCoursesLoading && courses.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
            {courses.map((course) => (
              <UserCourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
        {!isCoursesLoading && courses.length === 0 && (
          <p className="text-center text-text text-md-medium">
            Танд одоогоор худалдаж авсан сургалт байхгүй байна.
          </p>
        )}
      </div>
    </>
  );
};

export default UserCoursesPage;
