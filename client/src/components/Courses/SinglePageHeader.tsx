import { ICourse } from "@/interfaces/courses";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  BsPersonWorkspace,
  BsClock,
  BsCollectionPlay,
  BsBarChart,
  BsInfinity,
  BsInstagram,
  BsPlay,
} from "react-icons/bs";
import { HiOutlinePuzzle } from "react-icons/hi";
import { ImFacebook, ImTwitter, ImLinkedin2 } from "react-icons/im";

import Breadcrumbs from "@/components/global/Breadcrumbs";
import Button from "@/components/global/Button";
import RatingStar from "@/components/global/RatingStar";

import shape from "@/assets/hero-shape.svg";

interface SinglePageHeaderProps {
  course: ICourse;
}

const SinglePageHeader: FC<SinglePageHeaderProps> = ({ course }) => (
  <div className="bg-head pb-[60px] relative overflow-hidden">
    <Breadcrumbs
      transparent
      breadcrumbItems={[
        { title: "Сургалтууд", link: "/courses" },
        { title: course.category.name, link: `/courses?category=${course.category.slug}` },
        { title: course.name, link: `/courses/${course._id}` },
      ]}
    />

    <div className="container absolute w-full top-8 bottom-[62px] right-0 left-0 pointer-events-none">
      <Image src={shape} alt="Shape" className="w-full aspect-auto object-contain" />
    </div>

    <div className="container grid grid-cols-2 gap-[145px] text-icon">
      <div className="flex flex-col gap-[30px]">
        {/* Course Head */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <div className="uppercase py-2 px-4 bg-color-6 text-head text-[11px] font-medium leading-[13px] rounded-[60px]">
              Best Seller
            </div>
            <div className="uppercase py-2 px-4 bg-color-4 text-white text-[11px] font-medium leading-[13px] rounded-[60px]">
              New
            </div>
            <div className="uppercase py-2 px-4 bg-color-1 text-white text-[11px] font-medium leading-[13px] rounded-[60px]">
              Popular
            </div>
          </div>

          <h1 className="text-3xl-bold text-white">{course.name}</h1>

          <div
            className="text-icon text-md-regular"
            dangerouslySetInnerHTML={{ __html: course.description.slice(0, 200) + "..." }}
          />

          <div className="flex items-center gap-7">
            <div className="flex items-center gap-[10px]">
              <p className="text-[#E59819] text-sm-medium mt-[2px]">
                {course.avgRating.toFixed(1)}
              </p>
              <RatingStar gap={4} count={course.avgRating} />
              <p className="text-icon text-xs-regular">({course.reviews.length})</p>
            </div>

            <div className="flex items-center gap-[10px]">
              <BsPersonWorkspace size={16} />
              <p className=" text-sm-regular">{course.purchaseCount} сурагч элссэн</p>
            </div>

            <div className="flex items-center gap-[10px]">
              <BsClock size={16} />
              <p className=" text-sm-regular">
                Сүүлд{" "}
                {new Date(course.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                })}
                -нд шинэчлэгдсэн
              </p>
            </div>
          </div>

          <div className="flex items-center gap-[10px]">
            <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
              <Image
                src={course.instructor.avatar}
                alt="Ali Tufan"
                width={30}
                height={30}
                className="w-full object-cover aspect-square"
              />
            </div>
            <p className="text-sm-regular">{course.instructor.fullName}</p>
          </div>
        </div>

        {/* Course Includes */}
        <div className="flex flex-col text-white text-md-regular leading-[40px]">
          <div className="flex items-center justify-between border-b border-b-white/[.15]">
            <span className="flex items-center gap-[10px]">
              <BsCollectionPlay size={16} />
              <h1>Хичээлийн тоо</h1>
            </span>

            <h2>{20}</h2>
          </div>

          <div className="flex items-center justify-between border-b border-b-white/[.15]">
            <span className="flex items-center gap-[10px]">
              <HiOutlinePuzzle size={16} />
              <h1>Шалгалтын тоо</h1>
            </span>

            <h2>3</h2>
          </div>

          <div className="flex items-center justify-between border-b border-b-white/[.15]">
            <span className="flex items-center gap-[10px]">
              <BsClock size={16} />
              <h1>Хугацаа</h1>
            </span>

            <h2>13 hours</h2>
          </div>

          <div className="flex items-center justify-between border-b border-b-white/[.15]">
            <span className="flex items-center gap-[10px]">
              <BsBarChart size={16} />
              <h1>Түвшин</h1>
            </span>

            <h2>{course.level.name}</h2>
          </div>

          <div className="flex items-center justify-between border-b border-b-white/[.15]">
            <span className="flex items-center gap-[10px]">
              <BsInfinity size={16} />
              <h1>Насан туршийн эрх</h1>
            </span>

            <h2>Тийм</h2>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex gap-0 text-sm text-icon">
          {course.instructor.socialAccounts.facebook && (
            <Link
              className=" p-4 rounded-full hover:bg-white/10 hover:text-white duration-300"
              href={course.instructor.socialAccounts.facebook}
              target="_blank"
            >
              <ImFacebook />
            </Link>
          )}
          {course.instructor.socialAccounts.twitter && (
            <Link
              className=" p-4 rounded-full hover:bg-white/10 hover:text-white duration-300"
              href={course.instructor.socialAccounts.twitter}
              target="_blank"
            >
              <ImTwitter />
            </Link>
          )}
          {course.instructor.socialAccounts.instagram && (
            <Link
              className=" p-4 rounded-full hover:bg-white/10 hover:text-white duration-300"
              href={course.instructor.socialAccounts.instagram}
              target="_blank"
            >
              <BsInstagram />
            </Link>
          )}
          {course.instructor.socialAccounts.linkedin && (
            <Link
              className=" p-4 rounded-full hover:bg-white/10 hover:text-white duration-300"
              href={course.instructor.socialAccounts.linkedin}
              target="_blank"
            >
              <ImLinkedin2 />
            </Link>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-[30px]">
        <div className="rounded-lg overflow-hidden w-full relative">
          <Image
            src={course.picture}
            width={513}
            height={450}
            alt="Video"
            className="w-full aspect-auto object-contain"
          />

          <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] p-5 bg-white rounded-full cursor-pointer">
            <BsPlay size={40} />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <h1 className="text-white text-2xl-medium">₮{course.price}</h1>
          {course.discountPrice > 0 && (
            <h3 className="text-icon text-md-medium">₮{course.discountPrice}</h3>
          )}
        </div>

        <div className="grid grid-cols-2 gap-[35px]">
          <Button className="bg-color-1 text-white hover:bg-color-1/70 duration-300 ">
            Сагслах
          </Button>
          <Button className="border-2 border-color-6 text-color-6 hover:bg-color-6/90 hover:text-white duration-300 hover:border-transparent">
            Худалдаж авах
          </Button>
        </div>

        <p className="text-icon text-sm-regular">14 хоногын дотор мөнгөө буцааж авах боломжтой</p>
      </div>
    </div>
  </div>
);

export default SinglePageHeader;
