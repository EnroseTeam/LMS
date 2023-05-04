import "swiper/css/navigation";
import "swiper/css/pagination";

import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import CategoryCard from "./subComponents/CategoryCard";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { ICourseCategory } from "@/interfaces/courses";

interface TopCategoriesProps {
  categories: ICourseCategory[];
}

const TopCategoriesSection: FC<TopCategoriesProps> = ({ categories }) => (
  <div className="container mb-[120px]">
    <div className="mb-[51px] text-center">
      <h1 className="text-head text-3xl-bold mb-[9px]">Сургалтын ангилалууд</h1>
      <p className="text-text text-md-regular">
        Хүссэн сургалтаа ангилалаар нь шүүгээд олох боломжтой.
      </p>
    </div>

    <Swiper
      grabCursor={true}
      spaceBetween={20}
      slidesPerView={2}
      breakpoints={{
        1024: {
          slidesPerView: 6,
          spaceBetween: 30,
        },
      }}
      navigation={{
        nextEl: ".slider-style-2-next",
        prevEl: ".slider-style-2-prev",
      }}
      pagination={{ clickable: true, el: ".slider-style-2-pagination" }}
      modules={[Navigation, Pagination]}
    >
      {categories.map((category) => (
        <SwiperSlide key={category._id}>
          <CategoryCard category={category} />
        </SwiperSlide>
      ))}

      <div className="flex items-center justify-center gap-5 mt-[30px] lg:mt-[60px]">
        <button className="slider-style-2-prev">
          <BsArrowLeft />
        </button>
        <div className="slider-style-2-pagination" />
        <button className="slider-style-2-next">
          <BsArrowRight />
        </button>
      </div>
    </Swiper>
  </div>
);

export default TopCategoriesSection;
