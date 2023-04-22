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

interface CoursesPageProps {
  categories: ICourseCategory[];
  courses: ICourse[];
  instructors: IUser[];
  levels: ICourseLevel[];
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
  } = query;
  const [resCategory, resCourses, instructorRes, levelRes] = await axios.all([
    axios.get("http://localhost:5000/api/courses/categories"),
    axios.get(
      `http://localhost:5000/api/courses?category=${category}&rating=${rating}&sort=${sort}&instructor=${instructor}&price=${price}&level=${level}&length=${length}`
    ),
    axios.get(`http://localhost:5000/api/users/instructors`),
    axios.get(`http://localhost:5000/api/courses/levels`),
  ]);
  return {
    props: {
      categories: resCategory.data.body,
      courses: resCourses.data.body,
      instructors: instructorRes.data.body,
      levels: levelRes.data.body,
    },
  };
};

const CoursesPage: FC<CoursesPageProps> = ({ courses, categories, instructors, levels }) => {
  console.log(courses);

  const priceItems: IRadioButtonFilterItem[] = [
    { content: "Бүгд", slug: "0-10000000", count: 12 },
    { content: "Үнэтэй", slug: "1-10000000", count: 12 },
    { content: "Үнэгүй", slug: "0-0", count: 12 },
  ];

  const ratingItems: IRadioButtonFilterItem[] = [
    {
      content: (
        <span className="flex items-center gap-[10px]">
          <RatingStar count={5} rating={4.5} gap={4} />
          <h5 className="text-head text-sm-regular">4.5 ба дээш</h5>
        </span>
      ),
      slug: "4.5",
      count: 100,
    },
    {
      content: (
        <span className="flex items-center gap-[10px]">
          <RatingStar count={5} rating={4.0} gap={4} />
          <h5 className="text-head text-sm-regular">4.0 ба дээш</h5>
        </span>
      ),
      slug: "4.0",
      count: 100,
    },
    {
      content: (
        <span className="flex items-center gap-[10px]">
          <RatingStar count={5} rating={3.5} gap={4} />
          <h5 className="text-head text-sm-regular">3.5 ба дээш</h5>
        </span>
      ),
      slug: "3.5",
      count: 100,
    },
    {
      content: (
        <span className="flex items-center gap-[10px]">
          <RatingStar count={5} rating={3} gap={4} />
          <h5 className="text-head text-sm-regular">3.0 ба дээш</h5>
        </span>
      ),
      slug: "3",
      count: 100,
    },
  ];

  const lengthItems: ICheckBoxFilterItem[] = [
    { title: "3-аас бага цаг", slug: "0-3", count: 0 },
    { title: "4 - 7 цаг", slug: "4-7", count: 0 },
    { title: "8 - 18 цаг", slug: "8-18", count: 0 },
    { title: "20-оос дээш цаг", slug: "20-10000", count: 0 },
  ];

  return (
    <div>
      <Breadcrumbs breadcrumbItems={[{ title: "Сургалтууд", link: "/courses" }]} />
      <div className="container mb-[136px]">
        <div className="mb-[147px]">
          <h1 className="text-head font-[700] text-[40px] leading-[47px] mb-1">Сургалтууд</h1>
          <p className="text-lg-regular text-text">
            Write an introductory description of the category.
          </p>
        </div>

        <div id="courses" className="grid grid-cols-4 gap-[60px]">
          <div className="col-span-3">
            <div className="flex justify-between items-center mb-[22px]">
              <p className="text-text text-sm-regular">
                Нийт <span className="text-head text-sm-medium">{courses.length} </span>
                үр дүн
              </p>
              <SortDropDown />
            </div>
            <div className="grid grid-cols-3 gap-[30px] mb-[77px]">
              {courses.map((course) => (
                <CourseCard course={course} key={course._id} />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-[30px]">
            <CheckBoxFilter
              items={categories.map((category) => ({
                title: category.name,
                slug: category.slug,
                count: category.courseCount,
              }))}
              title={{ name: "Ангилал", slug: "category" }}
            />
            <RadioButtonFilter title={{ name: "Үнэлгээ", slug: "rating" }} items={ratingItems} />
            <CheckBoxFilter
              items={instructors.map((instructor) => ({
                title: instructor.fullName,
                slug: instructor._id,
                count: instructor.ownCourses.length,
              }))}
              title={{ name: "Багш", slug: "instructor" }}
            />
            <RadioButtonFilter title={{ name: "Үнэ", slug: "price" }} items={priceItems} />
            <CheckBoxFilter
              title={{ name: "Түвшин", slug: "level" }}
              items={levels.map((level) => ({
                title: level.name,
                slug: level.slug,
                count: level.courseCount,
              }))}
            />
            <CheckBoxFilter title={{ name: "Хугацаа", slug: "length" }} items={lengthItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
