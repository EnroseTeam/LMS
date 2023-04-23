import { ICourseCategory, ICourseLevel } from "@/interfaces/courses";
import axios from "axios";

import { GetServerSideProps } from "next";
import { FC } from "react";
import Breadcrumbs from "@/components/global/Breadcrumbs";

import CourseCard from "@/components/Courses/CourseCard";
import { ICourse } from "@/interfaces/courses";
import CheckBoxFilter from "@/components/global/CheckBoxFilter";
import RadioButtonFilter from "@/components/global/RadioButtonFilter";
import { ICheckBoxFilterItem, IRadioButtonFilterItem } from "@/interfaces/components";
import RatingStar from "@/components/global/RatingStar";
import SortDropDown from "@/components/global/SortDropDown";
import { IUser } from "@/interfaces/user";
import Pagination from "@/components/global/Pagination";

interface CoursesPageProps {
  categories: ICourseCategory[];
  courses: ICourse[];
  instructors: IUser[];
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
    axios.get("http://localhost:5000/api/courses/categories"),
    axios.get(
      `http://localhost:5000/api/courses?category=${category}&rating=${rating}&sort=${sort}&instructor=${instructor}&price=${price}&level=${level}&length=${length}&page=${page}&pageSize=${pageSize}`
    ),
    axios.get(`http://localhost:5000/api/users/instructors`),
    axios.get(`http://localhost:5000/api/courses/levels`),
    axios.get(`http://localhost:5000/api/courses/counts`),
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

  return (
    <div>
      <Breadcrumbs breadcrumbItems={[{ title: "Сургалтууд", link: "/courses" }]} />
      <div className="container mb-[136px]">
        <div className="mb-[90px]">
          <h1 className="text-head font-[700] text-[40px] leading-[47px] mb-1">Сургалтууд</h1>
          <p className="text-lg-regular text-text">Бүх төрлийн сургалтуудыг нэг дороос үз.</p>
        </div>

        <div id="courses" className="grid grid-cols-4 gap-[60px]">
          <div className="col-span-3">
            <div className="flex justify-between items-center mb-[22px]">
              <p className="text-text text-sm-regular">
                Нийт <span className="text-head text-sm-medium">{totalCourses} </span>
                үр дүн
              </p>
              <SortDropDown />
            </div>
            {totalCourses > 0 && (
              <div className="grid grid-cols-3 gap-[30px] mb-[77px]">
                {courses.map((course) => (
                  <CourseCard course={course} key={course._id} />
                ))}
              </div>
            )}
            {totalCourses === 0 && (
              <p className="text-center mt-10 text-text text-md-medium">Илэрц олдсонгүй</p>
            )}
            {totalCourses > 0 && <Pagination totalPage={totalPages} />}
          </div>
          <div className="flex flex-col gap-[30px]">
            <CheckBoxFilter items={categoryItems} title={{ name: "Ангилал", slug: "category" }} />
            <RadioButtonFilter items={ratingItems} title={{ name: "Үнэлгээ", slug: "rating" }} />
            <CheckBoxFilter items={instructorItems} title={{ name: "Багш", slug: "instructor" }} />
            <RadioButtonFilter items={priceItems} title={{ name: "Үнэ", slug: "price" }} />
            <CheckBoxFilter items={levelItems} title={{ name: "Түвшин", slug: "level" }} />
            <CheckBoxFilter items={lengthItems} title={{ name: "Хугацаа", slug: "length" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
