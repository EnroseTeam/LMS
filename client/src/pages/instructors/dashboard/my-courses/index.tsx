import { ReactNode, useEffect, useState } from "react";
import useSwr from "swr";

import { HiMagnifyingGlass } from "react-icons/hi2";
import CourseCard from "@/components/Instructors/Dashboard/Courses/CourseCard";
import { ICourse } from "@/interfaces/courses";
import { useRouter } from "next/router";
import Tab, { TabHeaderItem } from "@/components/global/Tab";
import { NextPageWithLayout } from "@/pages/_app";
import DashboardLayout from "@/layouts/DashboardLayout";
import { fetcher } from "@/utils/fetcher";
import TabSkeleton from "@/components/Skeletons/TabSkeleton";

const InstructorCoursesPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: instructorCourses, isLoading: isCourseLoading } = useSwr(
    "/api/courses/instructor",
    fetcher<{ body: ICourse[] }>
  );

  const [courses, setCourses] = useState<ICourse[]>([]);
  const [publishedCourses, setPublishedCourses] = useState<ICourse[]>([]);
  const [unPublishedCourses, setUnPublishedCourses] = useState<ICourse[]>([]);

  const [search, setSearch] = useState<string>(router.query.q as string);

  useEffect(() => {
    if (!isCourseLoading && instructorCourses) {
      setCourses(instructorCourses.body);
      setPublishedCourses(instructorCourses.body.filter((course) => course.isPublished));
      setUnPublishedCourses(instructorCourses.body.filter((course) => !course.isPublished));
    }
  }, [instructorCourses, isCourseLoading]);

  useEffect(() => {
    if (instructorCourses) {
      if (router.query.q) {
        setCourses(
          instructorCourses.body.filter((course) =>
            course.name.toLowerCase().includes((router.query.q as string).toLowerCase())
          )
        );
        setPublishedCourses(
          instructorCourses.body.filter(
            (course) =>
              course.isPublished &&
              course.name.toLowerCase().includes((router.query.q as string).toLowerCase())
          )
        );
        setUnPublishedCourses(
          instructorCourses.body.filter(
            (course) =>
              !course.isPublished &&
              course.name.toLowerCase().includes((router.query.q as string).toLowerCase())
          )
        );
      } else {
        setCourses(instructorCourses.body);
        setPublishedCourses(instructorCourses.body.filter((course) => course.isPublished));
        setUnPublishedCourses(instructorCourses.body.filter((course) => !course.isPublished));
      }
    }
  }, [router, instructorCourses]);

  const searchHandler = (): void => {
    if (instructorCourses) {
      if (search) {
        router.push({
          query: { ...router.query, q: search },
        });
        setCourses(
          instructorCourses.body.filter((course) =>
            course.name.toLowerCase().includes(search.toLowerCase())
          )
        );
        setPublishedCourses(
          instructorCourses.body.filter(
            (course) =>
              course.isPublished && course.name.toLowerCase().includes(search.toLowerCase())
          )
        );
        setUnPublishedCourses(
          instructorCourses.body.filter(
            (course) =>
              !course.isPublished && course.name.toLowerCase().includes(search.toLowerCase())
          )
        );
      } else {
        delete router.query.q;
        router.push({
          query: router.query,
        });
        setCourses(instructorCourses.body);
        setPublishedCourses(instructorCourses.body.filter((course) => course.isPublished));
        setUnPublishedCourses(instructorCourses.body.filter((course) => !course.isPublished));
      }
    }
  };

  const allCourses = (
    <>
      {courses.length === 0 && (
        <p className="text-center text-text text-md-medium mb-[30px]">Илэрц олдсонгүй.</p>
      )}
      {courses.length > 0 && (
        <div className="grid grid-cols-3 gap-[30px] mb-[30px] -mt-[30px]">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </>
  );

  const publishedCoursesContent = (
    <>
      {publishedCourses.length === 0 && (
        <p className="text-center text-text text-md-medium mb-[30px]">Илэрц олдсонгүй.</p>
      )}
      {publishedCourses.length > 0 && (
        <div className="grid grid-cols-3 gap-[30px] mb-[30px] -mt-[30px]">
          {publishedCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </>
  );

  const unPublishedCoursesContent = (
    <>
      {unPublishedCourses.length === 0 && (
        <p className="text-center text-text text-md-medium mb-[30px]">Илэрц олдсонгүй.</p>
      )}
      {unPublishedCourses.length > 0 && (
        <div className="grid grid-cols-3 gap-[30px] mb-[30px] -mt-[30px]">
          {unPublishedCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </>
  );

  const tabHeaders: TabHeaderItem[] = [
    { name: "Бүгд", slug: "all" },
    { name: "Нийтлэгдсэн", slug: "published" },
    { name: "Нийтлэгдээгүй", slug: "unpublished" },
  ];

  const tabContents: JSX.Element[] = [
    allCourses,
    publishedCoursesContent,
    unPublishedCoursesContent,
  ];

  return (
    <>
      <h1 className="text-head text-3xl-bold mb-[9px]">Миний сургалтууд</h1>
      <p className="text-text text-md-regular mb-[60px]">Миний үүсгэсэн сургалтууд</p>
      <div className="w-full rounded-2xl bg-white shadow-shadow dashboard p-[30px]">
        <div className="grid grid-cols-2 mb-[30px]">
          <div className="w-1/2 border border-border-2 rounded-lg pl-[18px] flex items-center gap-5 text-text overflow-hidden focus-within:ring-2 focus-within:ring-color-1 duration-150">
            <label className="text-xl" htmlFor="search">
              <HiMagnifyingGlass />
            </label>
            <input
              value={search}
              onChange={(e): void => {
                setSearch(e.target.value);
              }}
              onKeyDown={(e): void => {
                if (e.key === "Enter") searchHandler();
              }}
              type="text"
              className="flex-1 py-[15px] h-full focus:outline-none placeholder:text-text text-sm-regular"
              placeholder="Хайх"
            />
          </div>
        </div>

        {isCourseLoading && <TabSkeleton />}
        {instructorCourses && <Tab tabHeaders={tabHeaders} tabContents={tabContents} />}
      </div>
    </>
  );
};

export default InstructorCoursesPage;

InstructorCoursesPage.getLayout = function getLayout(page): ReactNode {
  return <DashboardLayout>{page}</DashboardLayout>;
};
