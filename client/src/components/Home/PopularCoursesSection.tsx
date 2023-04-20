import { FC } from "react";

import CourseCard from "../Courses/CourseCard";
import { ICourse, ICourseCategory } from "@/interfaces/courses";
import { useRouter } from "next/router";

interface PopularCoursesProps {
  courses: ICourse[];
  categories: ICourseCategory[];
}

const PopularCoursesSection: FC<PopularCoursesProps> = ({ courses, categories }) => {
  const router = useRouter();

  return (
    <div className="container mb-[120px] flex flex-col items-center" id="popular-courses">
      <div className="text-center mb-[51px]">
        <h1 className="text-head text-3xl-bold mb-[9px]">Хамгийн Эрэлттэй Сургалтууд</h1>
        <p className="text-text text-md-regular">10,000+ unique online course list designs</p>
      </div>

      <div className="flex items-center gap-4 mb-[60px] text-text text-md-regular">
        <button
          onClick={(): void => {
            delete router.query.category;
            router.push({
              pathname: "/",
              hash: "popular-courses",
              query: router.query,
            });
          }}
          className={`py-2 px-3 whitespace-nowrap rounded-lg hover:text-color-1 hover:bg-color-1/[.07] duration-300 ${
            !router.query.category ? "text-color-1 bg-color-1/[.07]" : ""
          }`}
        >
          Бүгд
        </button>
        {categories.map((category) => (
          <button
            onClick={(): void => {
              router.push({
                query: { ...router.query, category: category.slug },
                hash: "popular-courses",
              });
            }}
            key={category._id}
            className={`py-2 px-3 whitespace-nowrap rounded-lg hover:text-color-1 hover:bg-color-1/[.07] duration-300 ${
              router.query.category === category.slug ? "text-color-1 bg-color-1/[.07]" : ""
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-[30px]">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default PopularCoursesSection;
