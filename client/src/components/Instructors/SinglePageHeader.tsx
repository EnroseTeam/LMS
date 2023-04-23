import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/global/Button";

import RatingStar from "@/components/global/RatingStar";

import { AiOutlineComment, AiOutlineUser } from "react-icons/ai";
import { BiRightArrow } from "react-icons/bi";
import { ImFacebook, ImTwitter, ImLinkedin2 } from "react-icons/im";
import { BsInstagram } from "react-icons/bs";
import { IUser } from "@/interfaces/user";

interface SinglePageHeaderProps {
  instructor: IUser;
}

const SinglePageHeader: FC<SinglePageHeaderProps> = ({ instructor }) => (
  <div className="container relative bg-color-1 pt-[69px] rounded-lg text-white mb-[30px]">
    <div className="px-[325px]">
      <div className="rounded-full overflow-hidden w-[127px] h-[127px] mb-[20px]">
        <Image
          src={instructor.avatar}
          width={127}
          height={127}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <h1 className="font-[700] text-[30px] leading-[45px]">
        {instructor.fullName}
      </h1>
      <p className="text-md-regular mb-[10px]">UX Designer</p>

      <div className="flex items-center gap-5 pb-[30px]">
        <span className="flex items-center gap-2">
          <div className="flex gap-[2px] text-[#E59819] text-sm-medium">
            <RatingStar rating={1} count={1} />
            <p className="">{instructor.avgRating}</p>
          </div>
          <span className="text-xs-regular">Үнэлгээ</span>
        </span>

        <span className="flex items-center gap-2">
          <AiOutlineComment />
          <div className="flex text-xs-regular gap-1">
            <span>23,987</span>
            <span>Сэтгэгдэл</span>
          </div>
        </span>

        <span className="flex items-center gap-2">
          <AiOutlineUser />
          <div className="flex text-xs-regular gap-1">
            <span>692</span>
            <span>Сурагчид</span>
          </div>
        </span>

        <span className="flex items-center gap-[10px]">
          <BiRightArrow />
          <span className="text-xs-regular">
            {instructor.ownCourses.length}
          </span>
        </span>
      </div>

      <div className="flex items-center pb-[76px]">
        <Button className="bg-color-6 text-color-2 text-base-medium">
          Мессеж илгээх
        </Button>
        <div className="flex items-center ml-[30px] ">
          {instructor.socialAccounts.facebook && (
            <Link
              target="_blank"
              href={instructor.socialAccounts.facebook}
              className="text-white p-4 rounded-full hover:bg-white/10 duration-300"
            >
              <ImFacebook />
            </Link>
          )}
          {instructor.socialAccounts.twitter && (
            <Link
              target="_blank"
              href={instructor.socialAccounts.twitter}
              className="text-white p-4 rounded-full hover:bg-white/10 duration-300"
            >
              <ImTwitter />
            </Link>
          )}
          {instructor.socialAccounts.instagram && (
            <Link
              target="_blank"
              href={instructor.socialAccounts.instagram}
              className="text-white p-4 rounded-full hover:bg-white/10 duration-300"
            >
              <BsInstagram />
            </Link>
          )}
          {instructor.socialAccounts.linkedin && (
            <Link
              target="_blank"
              href={instructor.socialAccounts.linkedin}
              className="text-white p-4 rounded-full hover:bg-white/10 duration-300"
            >
              <ImLinkedin2 />
            </Link>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default SinglePageHeader;
