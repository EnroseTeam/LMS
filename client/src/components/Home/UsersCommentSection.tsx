import 'swiper/css';
import 'swiper/css/navigation';

import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

import UserCommentCard from './subComponents/UserCommentCard';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

const UsersCommentSection: FC = () => (
  <div className="bg-color-1 pt-[120px] pb-[112px] text-white">
    <div className="container">
      <div className="text-center mb-[51px]">
        <h1 className="text-color-6 text-3xl-bold mb-[10px]">What People Say</h1>
        <p className="text-md-regular">Lorem ipsum dolor sit amet, consectetur.</p>
      </div>

      <Swiper
        grabCursor={true}
        spaceBetween={30}
        slidesPerView={3}
        navigation={{
          nextEl: '.slider-style-1-next',
          prevEl: '.slider-style-1-prev',
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
          <h1 className="text-color-6 text-[35px] font-bold leading-[41px]">350,000+</h1>
          <p className="text-md-regular">Students worldwide</p>
        </div>

        <div className="flex flex-col gap-[7px]">
          <h1 className="text-color-6 text-[35px] font-bold leading-[41px]">496,000+</h1>
          <p className="text-md-regular">Total course views</p>
        </div>

        <div className="flex flex-col gap-[7px]">
          <h1 className="text-color-6 text-[35px] font-bold leading-[41px]">19,000+</h1>
          <p className="text-md-regular">Five-star course reviews</p>
        </div>

        <div className="flex flex-col gap-[7px]">
          <h1 className="text-color-6 text-[35px] font-bold leading-[41px]">987,000+</h1>
          <p className="text-md-regular">Students community</p>
        </div>
      </div>
    </div>
  </div>
);

export default UsersCommentSection;
