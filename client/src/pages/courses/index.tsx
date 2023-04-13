import 'swiper/css';
import 'swiper/css/navigation';

import { ICourseCategory } from '@/interfaces/courses';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import Breadcrumbs from '@/components/global/Breadcrumbs';

import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

import { title } from 'process';
import CourseCard from '@/components/Courses/CourseCard';
import { ICourse } from '@/interfaces/courses';

interface CoursesPageProps {
  categories?: ICourseCategory[];
  courses: ICourse[];
}

export const getServerSideProps: GetServerSideProps<
  CoursesPageProps
> = async () => {
  const [resCategory, resCourses] = await axios.all([
    axios.get('http://localhost:5000/api/courses/categories'),
    axios.get('http://localhost:5000/api/courses'),
  ]);
  return {
    props: {
      categories: resCategory.data.body,
      courses: resCourses.data.body,
    },
  };
};

const CoursesPage: FC<CoursesPageProps> = ({ courses }) => (
  <div>
    <Breadcrumbs
      breadcrumbItems={[{ title: 'Бүх сургалтууд', link: '/courses' }]}
    />
    <div className="container">
      <div className="mb-[147px]">
        <h1 className="text-head font-[700] text-[40px] leading-[47px] mb-1">
          User Interface Courses
        </h1>
        <p className="text-lg-regular text-text">
          Write an introductory description of the category.
        </p>
      </div>
      <div className="flex items-center justify-between mb-[36px]">
        <h2 className="text-head text-2xl-bold">Courses to get you started</h2>
        <div className="flex items-center gap-2 text-text text-md-regular">
          <button className="rounded-lg whitespace-nowrap hover:text-color-1 hover:bg-color-1/[.07] py-2 px-3 duration-300">
            All
          </button>
          <button className="rounded-lg whitespace-nowrap hover:text-color-1 hover:bg-color-1/[.07] py-2 px-3 duration-300">
            Trending
          </button>
          <button className="rounded-lg whitespace-nowrap hover:text-color-1 hover:bg-color-1/[.07] py-2 px-3 duration-300">
            Popular
          </button>
          <button className="rounded-lg whitespace-nowrap hover:text-color-1 hover:bg-color-1/[.07] py-2 px-3 duration-300">
            Featured
          </button>
        </div>
      </div>
      <div className="relative">
        <Swiper
          grabCursor={true}
          spaceBetween={30}
          slidesPerView={4}
          navigation={{
            nextEl: '.slider-style-1-next',
            prevEl: '.slider-style-1-prev',
          }}
          modules={[Navigation]}
          className="mb-[107px] static"
        >
          {courses.map((course) => (
            <SwiperSlide key={course._id}>
              <CourseCard course={course} />
            </SwiperSlide>
          ))}

          <button className="slider-style-1-prev absolute left-0 top-[50%] -translate-x-[50%]  z-[10] bg-color-1 text-white">
            <BsArrowLeft />
          </button>
          <button className="slider-style-1-next absolute right-0 top-[50%] translate-x-[50%] z-[10] bg-color-1 text-white">
            <BsArrowRight />
          </button>
        </Swiper>
      </div>
    </div>
  </div>
);

export default CoursesPage;
