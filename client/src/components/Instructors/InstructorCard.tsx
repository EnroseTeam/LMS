import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import { ImFacebook, ImTwitter, ImLinkedin2 } from "react-icons/im";
import { AiOutlineUser } from "react-icons/ai";
import { BiRightArrow } from "react-icons/bi";
import { BsInstagram } from "react-icons/bs";

import RatingStar from "../global/RatingStar";
import { IUser } from "@/interfaces/user";
import { useRouter } from "next/router";

interface InstructorCardProps {
  instructor: IUser;
}

const InstructorCard: FC<InstructorCardProps> = ({ instructor }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-[20px]">
      <button
        onClick={(): void => {
          router.push(`/instructors/${instructor._id}`);
        }}
        className="rounded-lg overflow-hidden group relative"
      >
        <Image
          src={instructor.avatar}
          alt=""
          width={331}
          height={368}
          className="w-full object-cover aspect-[.9/1]"
        />
        <div className="absolute w-full h-full top-0 right-0 left-0 bottom-0 bg-head/0 opacity-0 group-hover:bg-head/50 group-hover:opacity-100 duration-300 ">
          <div className="flex justify-center items-center w-full h-full text-white absolute -bottom-full group-hover:bottom-0 duration-300">
            {instructor.socialAccounts.facebook && (
              <Link
                onClick={(e): void => {
                  e.stopPropagation();
                }}
                target="_blank"
                href={instructor.socialAccounts.facebook}
                className="text-white p-4 rounded-full hover:bg-white/10 duration-300"
              >
                <ImFacebook />
              </Link>
            )}
            {instructor.socialAccounts.twitter && (
              <Link
                onClick={(e): void => {
                  e.stopPropagation();
                }}
                target="_blank"
                href={instructor.socialAccounts.twitter}
                className="text-white p-4 rounded-full hover:bg-white/10 duration-300"
              >
                <ImTwitter />
              </Link>
            )}
            {instructor.socialAccounts.instagram && (
              <Link
                onClick={(e): void => {
                  e.stopPropagation();
                }}
                target="_blank"
                href={instructor.socialAccounts.instagram}
                className="text-white p-4 rounded-full hover:bg-white/10 duration-300"
              >
                <BsInstagram />
              </Link>
            )}
            {instructor.socialAccounts.linkedin && (
              <Link
                onClick={(e): void => {
                  e.stopPropagation();
                }}
                target="_blank"
                href={instructor.socialAccounts.linkedin}
                className="text-white p-4 rounded-full hover:bg-white/10 duration-300"
              >
                <ImLinkedin2 />
              </Link>
            )}
          </div>
        </div>
      </button>
      <div className="">
        <Link
          href={`instructors/${instructor._id}`}
          className="block text-head text-lg-medium hover:text-head/80 duration-300 mb-[5px]"
        >
          {instructor.fullName}
        </Link>
        {/* сервэр дээр instructor-т title өгөх */}
        <p className="text-text mb-[11px]">President of Sales</p>
        <div className="flex items-center gap-[20px]">
          <span className="flex items-center  gap-2 text-md">
            <RatingStar count={1} rating={1} />
            <p className="text-[#E59819] text-sm-medium mt-[2px]">
              {instructor.avgRating}
            </p>
          </span>
          <span className="flex items-center  gap-2 text-md text-icon">
            <AiOutlineUser />
            {/* сурагчидын тоог оруулах */}
            <span className="text-text text-sm-regular">365 Students</span>
          </span>
          <span className="flex items-center  gap-2 text-md text-icon">
            <BiRightArrow />
            <span className="text-text text-sm-regular">
              {instructor.ownCourses.length} хичээл
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;
