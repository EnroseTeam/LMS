import { ICourseCategory, ICourseLevel } from "@/interfaces/courses";
import axios from "axios";

import { GetServerSideProps } from "next";
import { FC, useContext, useEffect, useState } from "react";
import Breadcrumbs from "@/components/global/Breadcrumbs";

import CourseCard from "@/components/Courses/CourseCard";
import { ICourse } from "@/interfaces/courses";
import CheckBoxFilter from "@/components/global/CheckBoxFilter";
import RadioButtonFilter from "@/components/global/RadioButtonFilter";
import { ICheckBoxFilterItem, IRadioButtonFilterItem } from "@/interfaces/components";
import RatingStar from "@/components/global/RatingStar";
import SortDropDown from "@/components/global/SortDropDown";
import { IInstructor } from "@/interfaces/user";
import Pagination from "@/components/global/Pagination";
import { axiosInstance } from "@/utils/axiosInstance";

import { BiFilterAlt } from "react-icons/bi";
import { HiChevronRight } from "react-icons/hi";
import { fetcher } from "@/utils/fetcher";
import useSwr from "swr";
import { AuthContext } from "@/contexts/AuthContext";

interface CoursesPageProps {
  categories: ICourseCategory[];
  courses: ICourse[];
  instructors: IInstructor[];
  levels: ICourseLevel[];
  courseCount: {
    ratingCount: {
      rating: number;
      count: number;
    }[];
    priceCount: {
      label: string;
      minPrice: number;
      maxPrice: number;
      count: number;
    }[];
    lengthCount: {
      label: string;
      minLength: number;
      maxLength: number;
      count: number;
    }[];
  };
  totalPages: number;
  totalCourses: number;
}

export const getServerSideProps: GetServerSideProps<CoursesPageProps> = async ({ query }) => {
  const {
    category = "",
    rating = "0",
    sort = "popular",
    instructor = "",
    price = "0-10000000",
    level = "",
    length = "0-10000",
    page = "1",
    pageSize = "12",
  } = query;
  const [resCategory, resCourses, instructorRes, levelRes, courseCountRes] = await axios.all([
    axiosInstance.get("/api/courses/categories"),
    axiosInstance.get(
      `/api/courses?category=${category}&rating=${rating}&sort=${sort}&instructor=${instructor}&price=${price}&level=${level}&length=${length}&page=${page}&pageSize=${pageSize}`
    ),
    axiosInstance.get(`/api/instructors`),
    axiosInstance.get(`/api/courses/levels`),
    axiosInstance.get(`/api/courses/counts`),
  ]);
  return {
    props: {
      categories: resCategory.data.body,
      courses: resCourses.data.body,
      instructors: instructorRes.data.body,
      levels: levelRes.data.body,
      courseCount: courseCountRes.data,
      totalPages: resCourses.data.totalPages,
      totalCourses: resCourses.data.totalCourses,
    },
  };
};

const CoursesPage: FC<CoursesPageProps> = ({
  courses,
  categories,
  instructors,
  levels,
  courseCount,
  totalPages,
  totalCourses,
}) => {
  const { user } = useContext(AuthContext);

  const { data: boughtCourses, isLoading: boughtCoursesLoading } = useSwr(
    user && "/api/courses/user",
    fetcher<{ body: ICourse[] }>
  );

  const [boughtCoursesIds, setBoughtCoursesIds] = useState<string[]>([]);

  useEffect(() => {
    if (!boughtCoursesLoading && boughtCourses) {
      setBoughtCoursesIds(boughtCourses.body.map((course) => course._id));
    }
  }, [boughtCourses, boughtCoursesLoading]);

  const categoryItems: ICheckBoxFilterItem[] = categories.map((category) => ({
    title: category.name,
    slug: category.slug,
    count: category.courseCount,
  }));

  const ratingItems: IRadioButtonFilterItem[] = courseCount.ratingCount.map((rCount) => ({
    content: (
      <span className="flex items-center gap-[10px]">
        <RatingStar count={5} rating={rCount.rating} gap={4} />
        <h5 className="text-head text-sm-regular">{rCount.rating} ба дээш</h5>
      </span>
    ),
    slug: rCount.rating.toString(),
    count: rCount.count,
  }));

  const instructorItems: ICheckBoxFilterItem[] = instructors.map((instructor) => ({
    title: instructor.fullName,
    slug: instructor._id,
    count: instructor.ownCourses.length,
  }));

  const priceItems: IRadioButtonFilterItem[] = courseCount.priceCount.map((pCount) => ({
    content: pCount.label,
    slug: `${pCount.minPrice}-${pCount.maxPrice}`,
    count: pCount.count,
  }));

  const levelItems: ICheckBoxFilterItem[] = levels.map((level) => ({
    title: level.name,
    slug: level.slug,
    count: level.courseCount,
  }));

  const lengthItems: ICheckBoxFilterItem[] = courseCount.lengthCount.map((lCount) => ({
    title: lCount.label,
    slug: `${lCount.minLength}-${lCount.maxLength}`,
    count: lCount.count,
  }));

  const filterContent = (
    <>
      <CheckBoxFilter items={categoryItems} title={{ name: "Ангилал", slug: "category" }} />
      <RadioButtonFilter items={ratingItems} title={{ name: "Үнэлгээ", slug: "rating" }} />
      <CheckBoxFilter items={instructorItems} title={{ name: "Багш", slug: "instructor" }} />
      <RadioButtonFilter items={priceItems} title={{ name: "Үнэ", slug: "price" }} />
      <CheckBoxFilter items={levelItems} title={{ name: "Түвшин", slug: "level" }} />
      <CheckBoxFilter items={lengthItems} title={{ name: "Хугацаа", slug: "length" }} />
    </>
  );

  const [filterShow, setFilterShow] = useState<boolean>(false);

  const showFilter = (): void => {
    setFilterShow(true);
  };

  const closeFilter = (): void => {
    setFilterShow(false);
  };

  return (
    <div>
      <Breadcrumbs breadcrumbItems={[{ title: "Сургалтууд", link: "/courses" }]} />
      <div className="container mb-[136px]">
        <div className="mb-[90px]">
          <h1 className="text-head font-[700] text-[40px] leading-[47px] mb-1">Сургалтууд</h1>
          <p className="text-lg-regular text-text">Бүх төрлийн сургалтуудыг нэг дороос үз.</p>
        </div>

        <div id="courses" className="grid grid-cols-1 lg:grid-cols-4 gap-[60px]">
          <div className="col-span-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-[22px]">
              <p className="text-text text-sm-regular">
                Нийт <span className="text-head text-sm-medium">{totalCourses} </span>
                үр дүн
              </p>
              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <SortDropDown />
                <button
                  onClick={showFilter}
                  className="btn-4 py-4 px-6 text-md-medium flex items-center gap-2 lg:hidden"
                >
                  <BiFilterAlt size={16} />
                  Шүүлт
                </button>
              </div>
            </div>
            {totalCourses > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[30px] mb-[77px]">
                {courses.map((course) => (
                  <CourseCard
                    course={course}
                    key={course._id}
                    user={user}
                    boughtCourses={boughtCoursesIds}
                  />
                ))}
              </div>
            )}
            {totalCourses === 0 && (
              <p className="text-center mt-10 text-text text-md-medium">Илэрц олдсонгүй</p>
            )}
            {totalCourses > 0 && <Pagination totalPage={totalPages} />}
          </div>
          <div className="hidden lg:flex flex-col gap-[30px]">{filterContent}</div>

          {/* Mobile Filter */}
          <div
            className={`fixed top-0 bottom-0 w-[70vw] min-h-screen bg-white z-[1000] p-5 overflow-auto ${
              filterShow ? "right-0" : "-right-full"
            } duration-300`}
          >
            <button
              onClick={closeFilter}
              className="text-base-medium w-full text-left p-5 rounded-lg text-color-1 bg-color-1/[.07] flex items-center gap-2 mb-5"
            >
              Шүүлтүүр
              <HiChevronRight size={18} />
            </button>
            <div className="flex flex-col gap-[30px]">{filterContent}</div>
          </div>
          {/* Backdrop */}
          <div
            onClick={closeFilter}
            className={`fixed top-0 right-0 bottom-0 left-0 w-screen h-screen bg-[#18181a]/70 z-[999] ${
              filterShow ? "opacity-100" : "opacity-0 pointer-events-none"
            } duration-300`}
          />
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
