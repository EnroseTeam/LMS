import { FC } from "react";
import Link from "next/link";

import InstructorCard from "../Instructors/InstructorCard";
import { IUser } from "@/interfaces/user";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { Swiper, SwiperSlide } from "swiper/react";

interface BestInstructorSectionProps {
  instructors: IUser[];
}

const BestInstructorSection: FC<BestInstructorSectionProps> = ({ instructors }) => (
  <>
    <div className="container mb-[111px] mt-[120px]">
      <div className="flex flex-col gap-y-[30px] justify-between items-start md:flex-row md:items-center mb-[43px]">
        <div>
          <h1 className="text-3xl-bold text-head">Шилдэг багш, сургагч нар</h1>
          <p className="text-text">Lorem ipsum dolor sit amet, consectetur.</p>
        </div>
        <Link href="/instructors" className="arrow-btn-1">
          Бүх багш, сургагчид
          <HiOutlineArrowUpRight size={20} />
        </Link>
      </div>
      <Swiper
        grabCursor={true}
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        className="mb-[60px]"
      >
        {instructors.map((instructor) => (
          <SwiperSlide key={instructor._id}>
            <InstructorCard instructor={instructor} />
          </SwiperSlide>
        ))}
      </Swiper>

      <p className="text-text lg:text-center">
        Өөрийн мэдлэгээ бусдад түгээж, нэмэлт орлоготой болмоор байна уу?
        <Link href="/become-instructor" className="text-color-1 ml-1 underline">
          Багш болох
        </Link>
      </p>
    </div>
  </>
);

export default BestInstructorSection;
