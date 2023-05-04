import { useAuthenticate } from "@/hooks/useAuthenticate";
import { FC, useEffect, useState } from "react";

import { HiMagnifyingGlass } from "react-icons/hi2";
import { HiChevronDown } from "react-icons/hi";
import CourseCard from "@/components/Instructors/Dashboard/Courses/CourseCard";
import { ICourse } from "@/interfaces/courses";
import { IUser } from "@/interfaces/user";
import { useRouter } from "next/router";

const InstructorCoursesPage: FC = () => {
  const router = useRouter();
  const { user } = useAuthenticate();

  const [courses, setCourses] = useState<ICourse[]>((user as IUser).ownCourses);
  const [search, setSearch] = useState<string>(router.query.q as string);

  useEffect(() => {
    if (router.query.q) {
      setCourses(
        (user as IUser).ownCourses.filter((course) =>
          course.name
            .toLowerCase()
            .includes((router.query.q as string).toLowerCase())
        )
      );
    } else {
      setCourses((user as IUser).ownCourses);
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
    } else {
      delete router.query.q;
      router.push({
        query: router.query,
      });
      setCourses((user as IUser).ownCourses);
    }
  };

  if (!user) return <></>;

  return (
    <>
      <h1 className="text-head text-3xl-bold mb-[9px]">Миний сургалтууд</h1>
      <p className="text-text text-md-regular mb-[60px]">
        Миний үүсгэсэн сургалтууд
      </p>
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

          <div className="flex items-center justify-end text-text text-sm-regular gap-5">
            <div className="relative">
              <button className="flex items-center gap-5 py-4 px-[18px] border border-border-1 rounded-lg overflow-hidden">
                Ангилал
                <HiChevronDown size={18} />
              </button>
            </div>
            <div className="relative">
              <button className="flex items-center gap-5 py-4 px-[18px] border border-border-1 rounded-lg overflow-hidden">
                Үнэлгээ
                <HiChevronDown size={18} />
              </button>
            </div>
          </div>
        </div>

        {courses.length === 0 && (
          <p className="text-center text-text text-md-medium">
            Илэрц олдсонгүй.
          </p>
        )}
        {courses.length > 0 && (
          <div className="grid grid-cols-3 gap-[30px] mb-[30px]">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default InstructorCoursesPage;
