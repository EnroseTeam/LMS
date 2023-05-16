import RatingStar from "@/components/global/RatingStar";
import { ICourse } from "@/interfaces/courses";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsBarChart, BsClock, BsFileEarmarkText } from "react-icons/bs";
import { MdPublishedWithChanges, MdEdit, MdDelete, MdUnpublished } from "react-icons/md";
import classNames from "classnames";
import { useRouter } from "next/router";

interface CourseCardProps {
  course: ICourse;
}

const CourseCard: FC<CourseCardProps> = ({ course }) => {
  const [dropDownShow, setDropDownShow] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div className="p-[10px] border border-border-1 rounded-lg grid grid-cols-5 gap-5 relative">
      <Link
        href={`/courses/${course._id}`}
        className="col-span-2 rounded-lg overflow-hidden group relative"
      >
        <Image
          src={course.picture}
          alt={course.name}
          width={500}
          height={500}
          className="w-full aspect-[1.3/1] object-cover group-hover:scale-110 duration-300"
        />
        <div className="w-full h-full absolute top-0 left-0 right-0 group-hover:bg-head/50 duration-300" />
      </Link>

      <div className="col-span-3 flex flex-col gap-3 justify-center">
        <div className="flex items-center gap-[10px]">
          <p className="text-[#E59819] text-sm-medium">{course.avgRating.toFixed(1)}</p>
          <RatingStar count={5} rating={course.avgRating} gap={5} />
          <p className="text-text text-xs-regular">({course.reviews.length})</p>
        </div>

        <Link
          href={`/courses/${course._id}`}
          className="text-head text-lg-medium hover:text-head/80 duration-300"
        >
          {course.name}
        </Link>

        <div className="flex items-center gap-5 whitespace-nowrap">
          <span className="flex items-center gap-2 text-md text-icon">
            <BsFileEarmarkText />
            <span className="text-sm-regular text-text">{course.lessonCount} хичээл</span>
          </span>

          <span className="flex items-center gap-2 text-md text-icon">
            <BsClock />
            <span className="text-sm-regular text-text">
              {course.totalLessonLength.hour > 0 && `${course.totalLessonLength.hour} цаг `}
              {course.totalLessonLength.minute > 0 && `${course.totalLessonLength.minute} минут`}
            </span>
          </span>

          <span className="flex items-center gap-2 text-md text-icon">
            <BsBarChart />
            <span className="text-sm-regular text-text">{course.level.name}</span>
          </span>
        </div>

        <div className="flex items-center justify-end gap-2 pt-[10px] border-t border-t-border-1">
          {course.discountPrice > 0 && (
            <p className="text-text text-md-medium line-through">{course.price}</p>
          )}
          <p className="text-head text-md-medium">
            ₮{course.discountPrice > 0 ? course.discountPrice : course.price}
          </p>
        </div>
      </div>

      <div className="absolute top-[10px] right-[10px] group/button">
        <button
          onClick={(): void => {
            setDropDownShow(!dropDownShow);
          }}
          className="p-3 bg-white rounded-lg shadow-shadow-1 border border-border-1 text-icon  group-hover/button:text-white group-hover/button:bg-icon duration-300"
        >
          <BiDotsVerticalRounded size={18} />
        </button>

        <div
          className={classNames(
            "absolute top-full right-0 mt-2 duration-300 z-10",
            { "opacity-100": dropDownShow },
            { "opacity-0 pointer-events-none": !dropDownShow }
          )}
        >
          <div className="border-t border-l border-border-1 w-[10px] h-[10px] rotate-45 bg-white absolute right-5" />

          <div className="bg-white border border-border-1  rounded-lg py-5 px-8 mt-[5px] flex flex-col gap-5 text-text text-lg-medium shadow-shadow-dashboard">
            {!course.isPublished && (
              <button className="flex items-center gap-3 hover:text-color-1 duration-300 group">
                <MdPublishedWithChanges
                  size={20}
                  className="text-icon group-hover:text-color-1 duration-300"
                />
                Нийтлэх
              </button>
            )}

            {course.isPublished && (
              <button className="flex items-center gap-3 hover:text-color-1 duration-300 group">
                <MdUnpublished
                  size={20}
                  className="text-icon group-hover:text-color-1 duration-300"
                />
                Нийтлэхээ болих
              </button>
            )}

            <button
              onClick={(): void => {
                router.push(`/instructors/dashboard/my-courses/edit/${course._id}`);
              }}
              className="flex items-center gap-3 hover:text-color-1 duration-300 group"
            >
              <MdEdit size={20} className="text-icon group-hover:text-color-1 duration-300" />
              Засах
            </button>

            <button className="flex items-center gap-3 hover:text-color-1 duration-300 group">
              <MdDelete size={20} className="text-icon group-hover:text-color-1 duration-300" />
              Устгах
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
