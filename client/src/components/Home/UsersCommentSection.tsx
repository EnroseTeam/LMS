import "swiper/css";
import "swiper/css/navigation";

import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import UserCommentCard from "./subComponents/UserCommentCard";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const UsersCommentSection: FC = () => (
  <div className="bg-color-1 pt-[120px] pb-[112px] text-white">
    <div className="container">
      <div className="text-center mb-[51px]">
        <h1 className="text-color-6 text-3xl-bold mb-[10px]">
          Хэрэлэгчдийн сэтгэгдэл
        </h1>
        <p className="text-md-regular">Манай төгсөгчдийн сэтгэгдлүүд.</p>
      </div>

      <Swiper
        grabCursor={true}
        spaceBetween={30}
        slidesPerView={3}
        navigation={{
          nextEl: ".slider-style-1-next",
          prevEl: ".slider-style-1-prev",
        }}
        modules={[Navigation]}
        className="mb-[116px]"
      >
        <SwiperSlide>
          <UserCommentCard />
        </SwiperSlide>

        <SwiperSlide>
          <UserCommentCard />
        </SwiperSlide>

        <SwiperSlide>
          <UserCommentCard />
        </SwiperSlide>

        <SwiperSlide>
          <UserCommentCard />
        </SwiperSlide>

        <div className="flex items-center justify-end gap-5 mt-[60px]">
          <button className="slider-style-1-prev">
            <BsArrowLeft />
          </button>
          <button className="slider-style-1-next">
            <BsArrowRight />
          </button>
        </div>
      </Swiper>

      <div className="grid grid-cols-4 text-center">
        <div className="flex flex-col gap-[7px]">
          <h1 className="text-color-6 text-[35px] font-bold leading-[41px]">
            350,000+
          </h1>
          <p className="text-md-regular">Нийт сурагч</p>
        </div>

        <div className="flex flex-col gap-[7px]">
          <h1 className="text-color-6 text-[35px] font-bold leading-[41px]">
            496,000+
          </h1>
          <p className="text-md-regular">Хичээл үзсэн тоо</p>
        </div>

        <div className="flex flex-col gap-[7px]">
          <h1 className="text-color-6 text-[35px] font-bold leading-[41px]">
            19,000+
          </h1>
          <p className="text-md-regular">5 одтой үнэлгээ</p>
        </div>

        <div className="flex flex-col gap-[7px]">
          <h1 className="text-color-6 text-[35px] font-bold leading-[41px]">
            987,000+
          </h1>
          <p className="text-md-regular">Төгсөгчид</p>
        </div>
      </div>
    </div>
  </div>
);

export default UsersCommentSection;
