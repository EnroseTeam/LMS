import { FC, useContext, useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import CourseCard from "../Courses/CourseCard";
import { ICourse, ICourseCategory } from "@/interfaces/courses";
import classNames from "classnames";
import useSwr from "swr";
import { fetcher } from "@/utils/fetcher";
import { AuthContext } from "@/contexts/AuthContext";

interface PopularCoursesProps {
  courses: ICourse[];
  categories: ICourseCategory[];
}

const PopularCoursesSection: FC<PopularCoursesProps> = ({ courses, categories }) => {
  const [initialCourses, setInitialCourses] = useState<ICourse[]>(courses);
  const [activeTab, setActiveTab] = useState<string>("");

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

  const categoryFilterHandler = (slug?: string): void => {
    if (slug) {
      setInitialCourses(courses.filter((course) => course.category.slug === slug));
    } else {
      setInitialCourses(courses);
    }
  };

  return (
    <div className="container mb-[120px]">
      <div className="text-center mb-[51px]">
        <h1 className="text-head text-3xl-bold mb-[9px]">Хамгийн Эрэлттэй Сургалтууд</h1>
        <p className="text-text text-md-regular">5,000+ гаруй сургалтууд</p>
      </div>

      <Swiper
        grabCursor={true}
        slidesPerView={"auto"}
        spaceBetween={20}
        breakpoints={{
          1024: {
            spaceBetween: 30,
          },
        }}
        className="mb-[60px] text-md-regular text-text"
      >
        <SwiperSlide className="flex-1">
          <button
            onClick={(): void => {
              setActiveTab("");
              categoryFilterHandler();
            }}
            className={classNames(
              "py-2 px-3 whitespace-nowrap rounded-lg hover:text-color-1 hover:bg-color-1/[.07] duration-300",
              { "text-color-1 bg-color-1/[.07]": !activeTab }
            )}
          >
            Бүгд
          </button>
        </SwiperSlide>

        {categories.map((category) => (
          <SwiperSlide className="flex-1" key={category._id}>
            <button
              onClick={(): void => {
                setActiveTab(category.slug);
                categoryFilterHandler(category.slug);
              }}
              className={classNames(
                "py-2 px-3 whitespace-nowrap rounded-lg hover:text-color-1 hover:bg-color-1/[.07] duration-300",
                { "text-color-1 bg-color-1/[.07]": activeTab === category.slug }
              )}
            >
              {category.name}
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px]">
        {initialCourses.map((course) => (
          <CourseCard
            key={course._id}
            course={course}
            user={user}
            boughtCourses={boughtCoursesIds}
          />
        ))}
      </div>

      <Swiper grabCursor={true} slidesPerView={1} spaceBetween={20} className="sm:hidden">
        {initialCourses.map((course) => (
          <SwiperSlide key={course._id}>
            <CourseCard course={course} user={user} boughtCourses={boughtCoursesIds} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularCoursesSection;
