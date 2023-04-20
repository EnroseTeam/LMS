import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import placeholder from "../../assets/placeholder.png";
import RatingStar from "../global/RatingStar";

import { AiOutlineUser } from "react-icons/ai";
import { BiRightArrow } from "react-icons/bi";
import { ImFacebook, ImTwitter, ImLinkedin2 } from "react-icons/im";
import { BsInstagram } from "react-icons/bs";
const PopularInstructorCard: FC = () => (
  <div className="flex flex-col justify-center items-center">
    <Link
      href="/"
      className="rounded-full overflow-hidden w-[180px] h-[180px] mb-[15px] group relative"
    >
      <Image src={placeholder} alt="" className="w-full h-full object-cover" />
      <div className="absolute w-full h-full top-0 right-0 left-0 bottom-0 bg-head/0 opacity-0 group-hover:bg-head/50 group-hover:opacity-100 duration-300 flex justify-center items-center">
        <button className=" p-2 rounded-full hover:bg-white/10 hover:text-white duration-300 text-sm">
          <ImFacebook />
        </button>
        <button className=" p-2 rounded-full hover:bg-white/10 hover:text-white duration-300 text-sm">
          <ImTwitter />
        </button>
        <button className=" p-2 rounded-full hover:bg-white/10 hover:text-white duration-300 text-sm">
          <BsInstagram />
        </button>
        <button className=" p-2 rounded-full hover:bg-white/10 hover:text-white duration-300 text-sm">
          <ImLinkedin2 />
        </button>
      </div>
    </Link>
    <span className="flex justify-center mb-[6px] gap-[5px]">
      <RatingStar count={1} rating={1} />
      <p className="text-[#E59819] text-sm-medium">4.5</p>
    </span>
    <Link
      href="/instructors/instructor"
      className="block text-head text-lg-medium hover:text-head/80 duration-300 mb-[5px] text-center"
    >
      Floyd Miles
    </Link>
    <p className="text-text mb-[11px] text-center">President of Sales</p>
    <div className="flex gap-[15px]">
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
);

export default PopularInstructorCard;
