import { ICourse, ICourseCategory } from "@/interfaces/courses";
import Link from "next/link";
import React, { FC } from "react";

interface DropdownLargeProps {
  categories: ICourseCategory[];
  courses: ICourse[];
}

const DropdownLarge: FC<DropdownLargeProps> = ({ categories, courses }) => (
  <div className="absolute top-full pt-2 left-0 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto duration-300 cursor-auto whitespace-nowrap">
    <div className="px-10">
      <div className="w-[10px] h-[10px] rotate-45 bg-white" />
    </div>
    <div className="w-screen fixed left-0 right-0 -mt-[5px]">
      <div className="grid grid-cols-6 gap-[60px] bg-white w-[1399px] mx-auto rounded-lg shadow-shadow-4 p-[30px] text-head">
        {categories
          .sort((a, b) => b.courseCount - a.courseCount)
          .slice(0, 6)
          .map((category) => (
            <div key={category._id} className="text-center">
              <h2 className="mb-5 text-lg-medium">{category.name}</h2>
              <ul className="text-md-regular leading-[35px] text-left">
                {courses
                  .filter((course) => course.category.slug === category.slug)
                  .slice(0, 6)
                  .map((course) => (
                    <li
                      key={course._id}
                      className="hover:text-color-1 hover:underline duration-300"
                    >
                      <Link href={`/courses/${course._id}`}>{course.name}</Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  </div>
);

export default DropdownLarge;
