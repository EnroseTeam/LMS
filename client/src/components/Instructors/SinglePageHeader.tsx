import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/global/Button";
import placeholder from "../../assets/placeholder.png";
import RatingStar from "@/components/global/RatingStar";

import { AiOutlineComment, AiOutlineUser } from "react-icons/ai";
import { BiRightArrow } from "react-icons/bi";
import { ImFacebook, ImTwitter, ImLinkedin2 } from "react-icons/im";
import { BsInstagram } from "react-icons/bs";

const SinglePageHeader: FC = () => (
  <div className="container relative bg-color-1 pt-[69px] rounded-lg text-white mb-[30px]">
    <div className="px-[325px]">
      <div className="rounded-full overflow-hidden w-[127px] h-[127px] mb-[20px]">
        <Image
          src={placeholder}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <h1 className="font-[700] text-[30px] leading-[45px]">Ali Tufan</h1>
      <p className="text-md-regular mb-[10px]">UX Designer</p>

      <div className="flex items-center gap-4 pb-[30px]">
        <span className="flex items-center gap-[5px]">
          <RatingStar className="fill-[#E59819]" />
          <p className="text-[#E59819] text-sm-medium">4.5</p>
          <span className="text-xs-regular">Instructors Rating</span>
        </span>

        <span className="flex items-center gap-[10px]">
          <AiOutlineComment />
          <span className="text-xs-regular">23,987 Reviews</span>
        </span>

        <span className="flex items-center gap-[10px]">
          <AiOutlineUser />
          <span className="text-xs-regular">692 Students</span>
        </span>

        <span className="flex items-center gap-[10px]">
          <BiRightArrow />
          <span className="text-xs-regular">23,987 Reviews</span>
        </span>
      </div>

      <div className="flex items-center pb-[76px]">
        <Button className="bg-color-6 text-color-2 text-base-medium">
          Send Message
        </Button>
        <div className="flex items-center gap-6 ml-[30px]">
          <Link
            className=" p-4 rounded-full hover:bg-white/10 hover:text-white duration-300"
            href="/"
          >
            <ImFacebook />
          </Link>
          <Link
            className=" p-4 rounded-full hover:bg-white/10 hover:text-white duration-300"
            href="/"
          >
            <ImTwitter />
          </Link>
          <Link
            className=" p-4 rounded-full hover:bg-white/10 hover:text-white duration-300"
            href="/"
          >
            <BsInstagram />
          </Link>
          <Link
            className=" p-4 rounded-full hover:bg-white/10 hover:text-white duration-300"
            href="/"
          >
            <ImLinkedin2 />
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default SinglePageHeader;
