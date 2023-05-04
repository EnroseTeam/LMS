import "swiper/css";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

import amazon from "@/assets/amazon-4.svg";
import amd from "@/assets/amd-logo-1-2.svg";
import cisco from "@/assets/cisco-2-1-2.svg";
import dropcam from "@/assets/dropcam.svg";
import logitech from "@/assets/logitech-2-1-3-1.svg";
import spotify from "@/assets/Spotify-2-2.svg";

const partners = [amazon, amd, cisco, dropcam, logitech, spotify];

const PartnerSection: FC = () => (
  <div className="container mt-11 mb-[120px]">
    <p className="text-md-regular mb-[51px] text-center text-head">
      Манай хамтрагчид
    </p>
    <Swiper
      grabCursor={true}
      slidesPerView={3}
      spaceBetween={100}
      breakpoints={{ 1024: { slidesPerView: 6, spaceBetween: 150 } }}
    >
      {partners.map((partner, index) => (
        <SwiperSlide key={`partner-${index}`}>
          <Link target="_blank" href="/">
            <Image src={partner} alt="" />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
);

export default PartnerSection;
