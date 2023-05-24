import { FC, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import RatingStar from "@/components/global/RatingStar";
import BgShape from "../../assets/hero-shape.svg";

import { AiOutlineComment, AiOutlineUser } from "react-icons/ai";
import { BiRightArrow } from "react-icons/bi";
import { ImFacebook, ImTwitter, ImLinkedin2 } from "react-icons/im";
import { BsInstagram } from "react-icons/bs";
import { IInstructor } from "@/interfaces/user";

interface SinglePageHeaderProps {
  instructor: IInstructor;
}

const SinglePageHeader: FC<SinglePageHeaderProps> = ({ instructor }) => {
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [studentCount, setStudentCount] = useState<number>(0);

  useEffect(() => {
    let newReviewCount = 0;
    let newStudentCount = 0;

    instructor.ownCourses.map((course) => {
      newReviewCount += course.reviews.length;
      newStudentCount += course.purchaseCount;
    });

    setReviewCount(newReviewCount);
    setStudentCount(newStudentCount);
  }, [instructor]);

  return (
    <div className="container relative bg-color-1 py-7 sm:py-9 md:py-[69px] rounded-lg text-white mb-[30px] mt-[-90px] sm:mt-[-60px] md:mt-[-30px]">
      <div className="absolute container top-0 right-0 left-0 bottom-0 pointer-events-none w-full h-full">
        <Image src={BgShape} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="md:px-[145px] lg:px-[245px] xl:px-[325px] md:block flex flex-col items-center">
        <div className="rounded-full overflow-hidden w-[127px] h-[127px] mb-[20px] text-center">
          <Image
            src={instructor.avatar}
            width={127}
            height={127}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="font-[700] text-center md:text-start text-[30px] leading-[45px]">
          {instructor.fullName}
        </h1>
        <p className="text-md-regular mb-[10px]">UX Designer</p>

        <div className="grid grid-cols-2 smallest:grid-cols-4 items-start sm:items-center gap-5 pb-[30px]">
          <span className="flex items-center gap-2">
            <div className="flex gap-[2px] text-[#E59819] text-sm-medium">
              <RatingStar rating={1} count={1} />
              <p className="">{instructor.avgRating.toFixed(1)}</p>
            </div>
            <span className="text-xs-regular">Үнэлгээ</span>
          </span>

          <span className="flex items-center gap-2">
            <AiOutlineComment />
            <div className="flex text-xs-regular gap-1">
              <span>{reviewCount}</span>
              <span>Сэтгэгдэл</span>
            </div>
          </span>

          <span className="flex items-center gap-2">
            <AiOutlineUser />
            <div className="flex text-xs-regular gap-1">
              <span>{studentCount}</span>
              <span>Сурагчид</span>
            </div>
          </span>

          <span className="flex items-center gap-[10px]">
            <BiRightArrow />
            <span className="text-xs-regular">
              {instructor.ownCourses.length} сургалт
            </span>
          </span>
        </div>

        <div className="flex flex-col smallest:flex-row gap-2 items-start">
          <button className="btn-2">Мессеж илгээх</button>
          <div className="flex justify-center items-center ml-[30px] ">
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
};

export default SinglePageHeader;
