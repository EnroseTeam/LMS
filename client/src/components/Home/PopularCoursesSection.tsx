import { FC } from 'react';

import CourseCard from '../Courses/CourseCard';
import { ICourse } from '@/interfaces/courses';

interface PopularCoursesProps {
  courses: ICourse[];
}

const PopularCoursesSection: FC<PopularCoursesProps> = ({ courses }) => (
  <div className="container mb-[120px] flex flex-col items-center">
    <div className="text-center mb-[51px]">
      <h1 className="text-head text-3xl-bold mb-[9px]">Our Most Popular Courses</h1>
      <p className="text-text text-md-regular">10,000+ unique online course list designs</p>
    </div>

    <div className="flex items-center gap-4 mb-[60px] text-text text-md-regular">
      <button className="py-2 px-3 whitespace-nowrap rounded-lg hover:text-color-1 hover:bg-color-1/[.07] duration-300">
        All Categories
      </button>

      <button className="py-2 px-3 whitespace-nowrap rounded-lg hover:text-color-1 hover:bg-color-1/[.07] duration-300">
        Animation
      </button>

      <button className="py-2 px-3 whitespace-nowrap rounded-lg hover:text-color-1 hover:bg-color-1/[.07] duration-300">
        Design
      </button>

      <button className="py-2 px-3 whitespace-nowrap rounded-lg hover:text-color-1 hover:bg-color-1/[.07] duration-300">
        Illustration
      </button>

      <button className="py-2 px-3 whitespace-nowrap rounded-lg hover:text-color-1 hover:bg-color-1/[.07] duration-300">
        Lifestyle
      </button>

      <button className="py-2 px-3 whitespace-nowrap rounded-lg hover:text-color-1 hover:bg-color-1/[.07] duration-300">
        Photo & Film
      </button>

      <button className="py-2 px-3 whitespace-nowrap rounded-lg hover:text-color-1 hover:bg-color-1/[.07] duration-300">
        Business
      </button>

      <button className="py-2 px-3 whitespace-nowrap rounded-lg hover:text-color-1 hover:bg-color-1/[.07] duration-300">
        Writing
      </button>
    </div>

    <div className="grid grid-cols-4 gap-[30px]">
      {courses.map((course) => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  </div>
);

export default PopularCoursesSection;