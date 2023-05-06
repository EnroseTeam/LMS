import { useAuthenticate } from "@/hooks/useAuthenticate";
import { FC, useEffect, useState } from "react";

import { HiMagnifyingGlass } from "react-icons/hi2";
import CourseCard from "@/components/Instructors/Dashboard/Courses/CourseCard";
import { ICourse } from "@/interfaces/courses";
import { IUser } from "@/interfaces/user";
import { useRouter } from "next/router";
import Tab, { TabHeaderItem } from "@/components/global/Tab";

const InstructorCoursesPage: FC = () => {
  const router = useRouter();
  const { user } = useAuthenticate();

  const [courses, setCourses] = useState<ICourse[]>((user as IUser).ownCourses);
  const [publishedCourses, setPublishedCourses] = useState<ICourse[]>(
    (user as IUser).ownCourses.filter((course) => course.isPublished)
  );
  const [unPublishedCourses, setUnPublishedCourses] = useState<ICourse[]>(
    (user as IUser).ownCourses.filter((course) => !course.isPublished)
  );

  const [search, setSearch] = useState<string>(router.query.q as string);

  useEffect(() => {
    if (router.query.q) {
      setCourses(
        (user as IUser).ownCourses.filter((course) =>
          course.name.toLowerCase().includes((router.query.q as string).toLowerCase())
        )
      );
      setPublishedCourses(
        (user as IUser).ownCourses.filter(
          (course) =>
            course.isPublished &&
            course.name.toLowerCase().includes((router.query.q as string).toLowerCase())
        )
      );
      setUnPublishedCourses(
        (user as IUser).ownCourses.filter(
          (course) =>
            !course.isPublished &&
            course.name.toLowerCase().includes((router.query.q as string).toLowerCase())
        )
      );
    } else {
      setCourses((user as IUser).ownCourses);
      setPublishedCourses((user as IUser).ownCourses.filter((course) => course.isPublished));
      setUnPublishedCourses((user as IUser).ownCourses.filter((course) => !course.isPublished));
    }
  }, [router.query.q, user]);

  const searchHandler = (): void => {
    if (search) {
      router.push({
        query: { ...router.query, q: search },
      });
      setCourses(
        (user as IUser).ownCourses.filter((course) =>
          course.name.toLowerCase().includes(search.toLowerCase())
        )
      );
      setPublishedCourses(
        (user as IUser).ownCourses.filter(
          (course) => course.isPublished && course.name.toLowerCase().includes(search.toLowerCase())
        )
      );
      setUnPublishedCourses(
        (user as IUser).ownCourses.filter(
          (course) =>
            !course.isPublished && course.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      delete router.query.q;
      router.push({
        query: router.query,
      });
      setCourses((user as IUser).ownCourses);
      setPublishedCourses((user as IUser).ownCourses.filter((course) => course.isPublished));
      setUnPublishedCourses((user as IUser).ownCourses.filter((course) => !course.isPublished));
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

  if (!user) return <></>;

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

        <Tab tabHeaders={tabHeaders} tabContents={tabContents} />
      </div>
    </>
  );
};

export default InstructorCoursesPage;
