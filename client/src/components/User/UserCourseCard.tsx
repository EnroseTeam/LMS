import { ICourse } from "@/interfaces/courses";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import RatingStar from "../global/RatingStar";
import { BsBarChart, BsClock, BsFileEarmarkText } from "react-icons/bs";

interface UserCourseCardProps {
  course: ICourse;
}

const UserCourseCard: FC<UserCourseCardProps> = ({ course }) => (
  <div className="p-[10px] border border-border-1 rounded-lg grid grid-cols-5 gap-5 ">
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
        <p className="text-[#E59819] text-sm-medium">
          {course.avgRating.toFixed(1)}
        </p>
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
          <span className="text-sm-regular text-text">
            {course.lessonCount} хичээл
          </span>
        </span>

        <span className="flex items-center gap-2 text-md text-icon">
          <BsClock />
          <span className="text-sm-regular text-text">
            {course.totalLessonLength.hour > 0 &&
              `${course.totalLessonLength.hour} цаг `}
            {course.totalLessonLength.minute > 0 &&
              `${course.totalLessonLength.minute} минут`}
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
              alt="Profile"
              width={30}
              height={30}
              className="object-cover w-full h-full"
            />
          </div>

          <h1 className="text-text text-sm-regular">
            {course.instructor.fullName}
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {course.discountPrice > 0 && (
            <p className="text-text text-md-medium line-through">
              {course.price}
            </p>
          )}
          <p className="text-head text-md-medium">
            ₮{course.discountPrice > 0 ? course.discountPrice : course.price}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default UserCourseCard;
