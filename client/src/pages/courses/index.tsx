import { ICourseCategory } from "@/interfaces/courses";
import axios from "axios";

import { GetServerSideProps } from "next";
import { FC } from "react";
import Breadcrumbs from "@/components/global/Breadcrumbs";

import CourseCard from "@/components/Courses/CourseCard";
import { ICourse } from "@/interfaces/courses";
import CheckBoxFilter from "@/components/global/CheckBoxFilter";
import RadioButtonFilter from "@/components/global/RadioButtonFilter";
import { IRadioButtonFilterItem } from "@/interfaces/components";
import RatingStar from "@/components/global/RatingStar";
import SortDropDown from "@/components/global/SortDropDown";
import { IUser } from "@/interfaces/user";

interface CoursesPageProps {
  categories: ICourseCategory[];
  courses: ICourse[];
  instructors: IUser[];
}

export const getServerSideProps: GetServerSideProps<CoursesPageProps> = async ({ query }) => {
  const {
    category = "",
    rating = "0",
    sort = "popular",
    instructor = "",
    price = "0-10000000",
  } = query;
  const [resCategory, resCourses, instructorRes] = await axios.all([
    axios.get("http://localhost:5000/api/courses/categories"),
    axios.get(
      `http://localhost:5000/api/courses?category=${category}&rating=${rating}&sort=${sort}&instructor=${instructor}&price=${price}`
    ),
    axios.get(`http://localhost:5000/api/users/instructors`),
  ]);
  return {
    props: {
      categories: resCategory.data.body,
      courses: resCourses.data.body,
      instructors: instructorRes.data.body,
    },
  };
};

const CoursesPage: FC<CoursesPageProps> = ({ courses, categories, instructors }) => {
  const items: IRadioButtonFilterItem[] = [
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
            <RadioButtonFilter title={{ name: "Үнэ", slug: "price" }} items={items} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
