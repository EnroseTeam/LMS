import "swiper/css";
import "swiper/css/navigation";

import { ICourseCategory } from "@/interfaces/courses";
import axios from "axios";

import { GetServerSideProps } from "next";
import { FC, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import Breadcrumbs from "@/components/global/Breadcrumbs";

import { BsArrowLeft, BsArrowRight, BsChevronDown } from "react-icons/bs";

import CourseCard from "@/components/Courses/CourseCard";
import { ICourse } from "@/interfaces/courses";
import PopularInstructorCard from "@/components/Instructors/PopularInstructorCard.tsx";
import CheckBoxFilter from "@/components/global/CheckBoxFilter";
import RadioButtonFilter from "@/components/global/RadioButtonFilter";

interface CoursesPageProps {
  categories: ICourseCategory[];
  courses: ICourse[];
}

export const getServerSideProps: GetServerSideProps<CoursesPageProps> = async ({ query }) => {
  const { category = "" } = query;
  const [resCategory, resCourses] = await axios.all([
    axios.get("http://localhost:5000/api/courses/categories"),
    axios.get(`http://localhost:5000/api/courses?category=${category}`),
  ]);
  return {
    props: {
      categories: resCategory.data.body,
      courses: resCourses.data.body,
    },
  };
};

const CoursesPage: FC<CoursesPageProps> = ({ courses, categories }) => {
  const [dropSort, setDropSort] = useState(false);

  const dropSortHandler = (): void => {
    setDropSort(!dropSort);
  };

  const items = [
    { content: "All", count: 12 },
    { content: "Paid", count: 12 },
    { content: "Free", count: 12 },
  ];

  return (
    <div>
      <Breadcrumbs breadcrumbItems={[{ title: "Бүх сургалтууд", link: "/courses" }]} />
      <div className="container mb-[136px]">
        <div className="mb-[147px]">
          <h1 className="text-head font-[700] text-[40px] leading-[47px] mb-1">
            User Interface Courses
          </h1>
          <p className="text-lg-regular text-text">
            Write an introductory description of the category.
          </p>
        </div>
        {/* <div className="flex items-center justify-between mb-[36px]">
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
              nextEl: ".slider-style-1-next",
              prevEl: ".slider-style-1-prev",
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

        <div className="mb-[150px]">
          <div className="flex items-center justify-between mb-[40px]">
            <h2 className="text-head text-2xl-bold">Popular Instructors</h2>

            <div className="flex items-center gap-5">
              <button className="slider-style-2-prev">
                <BsArrowLeft />
              </button>
              <div className="slider-style-2-pagination" />
              <button className="slider-style-2-next">
                <BsArrowRight />
              </button>
            </div>
          </div>
          <Swiper
            grabCursor={true}
            spaceBetween={30}
            slidesPerView={5}
            navigation={{
              nextEl: ".slider-style-2-next",
              prevEl: ".slider-style-2-prev",
            }}
            pagination={{ clickable: true, el: ".slider-style-2-pagination" }}
            modules={[Navigation, Pagination]}
            className="flex justify-between"
          >
            <SwiperSlide>
              <PopularInstructorCard />
            </SwiperSlide>

            <SwiperSlide>
              <PopularInstructorCard />
            </SwiperSlide>

            <SwiperSlide>
              <PopularInstructorCard />
            </SwiperSlide>

            <SwiperSlide>
              <PopularInstructorCard />
            </SwiperSlide>

            <SwiperSlide>
              <PopularInstructorCard />
            </SwiperSlide>

            <SwiperSlide>
              <PopularInstructorCard />
            </SwiperSlide>

            <SwiperSlide>
              <PopularInstructorCard />
            </SwiperSlide>
          </Swiper>
        </div>
         */}
        <div id="courses" className="grid grid-cols-4 gap-[60px]">
          <div className="col-span-3">
            <div className="flex justify-between items-center mb-[22px]">
              <p className="text-text text-sm-regular">
                Showing <span className="text-head text-sm-medium">250 </span>
                total results
              </p>
              <div className="relative">
                <button
                  onClick={dropSortHandler}
                  className="bg-bg-4 rounded-lg py-4 px-[15px] flex items-center gap-[46px] text-text text-sm-regular"
                >
                  Most Popular
                  <BsChevronDown
                    className={`duration-300 ${dropSort ? "rotate-[-180deg]" : "rotate-0"}`}
                  />
                </button>
                <div
                  className={`${
                    dropSort ? "opacity-100" : "opacity-0 pointer-events-none"
                  } absolute top-[60px] z-[10] bg-bg-4 rounded-lg py-[22px] pl-[30px] pr-[50px] duration-300 shadow-lg`}
                >
                  <ul className="flex flex-col font-[400] text-[15px] leading-[35px] text-head ">
                    <li className="hover:text-color-1 whitespace-nowrap cursor-pointer hover:underline ">
                      Popular
                    </li>
                    <li className="hover:text-color-1 whitespace-nowrap cursor-pointer hover:underline">
                      Newest
                    </li>
                    <li className="hover:text-color-1 whitespace-nowrap cursor-pointer hover:underline">
                      A - Z
                    </li>
                    <li className="hover:text-color-1 whitespace-nowrap cursor-pointer hover:underline">
                      Z - A
                    </li>
                    <li className="hover:text-color-1 whitespace-nowrap cursor-pointer hover:underline">
                      Chief
                    </li>
                  </ul>
                </div>
              </div>
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
            <RadioButtonFilter title="Price" items={items} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
