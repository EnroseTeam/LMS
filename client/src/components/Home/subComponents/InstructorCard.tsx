import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import placeholder from "../../../assets/placeholder.png";
import { ImFacebook, ImTwitter, ImLinkedin2 } from "react-icons/im";
import RatingStar from "./RatingStar";
import { AiOutlineUser } from "react-icons/ai";
import { BiRightArrow } from "react-icons/bi";
import { BsInstagram } from "react-icons/bs";

export const InstructorCard: FC = () => (
  <div className="flex flex-col gap-[20px]">
    <Link href="/" className="rounded-lg overflow-hidden group relative">
      <Image
        src={placeholder}
        alt=""
        className="w-full object-cover aspect-[.9/1]"
      />
      <div className="absolute w-full h-full top-0 right-0 left-0 bottom-0 bg-head/0 opacity-0 group-hover:bg-head/50 group-hover:opacity-100 duration-300 ">
        <div className="flex justify-center gap-5 items-center w-full h-full text-white">
          <Link href="/">
            <ImFacebook />
          </Link>
          <Link href="/">
            <ImTwitter />
          </Link>
          <Link href="/">
            <BsInstagram />
          </Link>
          <Link href="/">
            <ImLinkedin2 />
          </Link>
        </div>
      </div>
    </Link>
    <div className="">
      <Link
        href="/"
        className="block text-head text-lg-medium hover:text-head/80 duration-300 mb-[5px]"
      >
        Floyd Miles
      </Link>
      <p className="text-text mb-[11px]">President of Sales</p>

      <div className="flex items-center gap-[20px]">
        <span className="flex items-center  gap-2 text-md">
          <RatingStar className="fill-[#E59819]" />
          <p className="text-[#E59819] text-sm-medium mt-[2px]">4.5</p>
        </span>
        <span className="flex items-center  gap-2 text-md text-icon">
          <AiOutlineUser />
          <span className="text-text text-sm-regular">365 Students</span>
        </span>
        <span className="flex items-center  gap-2 text-md text-icon">
          <BiRightArrow />
          <span className="text-text text-sm-regular">15 Courses</span>
        </span>
      </div>
    </div>
  </div>
);
