import { FC, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import RatingStar from "../global/RatingStar";
import { ICourse } from "@/interfaces/courses";
import { BsFileEarmarkText, BsClock, BsBarChart } from "react-icons/bs";
import HoverCourseCard from "./HoverCourseCard";
import { currencyFormatter } from "@/utils/currenctyFormatter";
import { IUser } from "@/interfaces/user";

interface CourseCardProps {
  course: ICourse;
  user: IUser | undefined;
  boughtCourses: string[];
  showHover?: boolean;
}

const CourseCard: FC<CourseCardProps> = ({ course, user, boughtCourses, showHover = true }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<"Left" | "Right">("Right");

  const calculatePosition = (): void => {
    if (cardRef.current) {
      if (
        cardRef.current.offsetLeft >=
        window.innerWidth - (cardRef.current.offsetLeft + cardRef.current.offsetWidth)
      )
        setPosition("Left");
      else setPosition("Right");
    }
  };

  useEffect(() => {
    calculatePosition();
    window.addEventListener("resize", calculatePosition);

    return () => {
      window.removeEventListener("resize", calculatePosition);
    };
  }, []);

  return (
    <div ref={cardRef} className="flex flex-col gap-[15px] relative group">
      <Link
        href={`/courses/${course._id}`}
        className="w-full overflow-hidden rounded-lg block relative group/picture"
      >
        <Image
          src={course.picture}
          width={800}
          height={600}
          alt={course.name}
          className="w-full aspect-[1.42/1] object-cover group-hover/picture:scale-110 duration-300"
        />
        <div className="w-full h-full absolute top-0 right-0 left-0 bottom-0 bg-head/0 group-hover/picture:bg-head/50 duration-300 " />
        {course.discountPrice > 0 && (
          <div className="absolute top-[10px] left-[5px] uppercase py-2 px-4 bg-color-6 text-head text-[11px] font-medium leading-[13px] rounded-[60px]">
            Хямдралтай
          </div>
        )}
      </Link>

      <div className="flex flex-col gap-[10px]">
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

        <div className="flex items-center justify-between whitespace-nowrap">
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

        <div className="pt-[10px] flex items-center justify-between border-t border-t-border-1">
          <div className="flex items-center gap-[10px]">
            <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
              <Image
                src={course.instructor.avatar}
                alt={course.instructor.fullName}
                width={60}
                height={60}
                className="object-cover w-full h-full"
              />
            </div>

            <h1 className="text-text text-sm-regular">{course.instructor.fullName}</h1>
          </div>

          <div className="flex items-center gap-2">
            {course.discountPrice > 0 && (
              <p className="text-text text-md-medium line-through">
                {currencyFormatter(course.price)}
              </p>
            )}
            <p className="text-head text-md-medium">
              {currencyFormatter(course.discountPrice > 0 ? course.discountPrice : course.price)}
            </p>
          </div>
        </div>
      </div>

      {showHover && (
        <HoverCourseCard
          course={course}
          user={user}
          boughtCourses={boughtCourses}
          position={position}
        />
      )}
    </div>
  );
};

export default CourseCard;
