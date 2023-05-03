import RatingStar from "@/components/global/RatingStar";
import { ICourse } from "@/interfaces/courses";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface CourseCardProps {
  course: ICourse;
}

const CourseCard: FC<CourseCardProps> = ({ course }) => (
  <div>
    <Link
      href={"/"}
      className="w-full rounded-lg overflow-hidden mb-3 group relative block"
    >
      <Image
        src={course.picture}
        alt={course.name}
        width={500}
        height={500}
        className="w-full aspect-[1.4/1] object-cover group-hover:scale-110 duration-300"
      />

      <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full group-hover:bg-head/50 duration-300" />
    </Link>
    <div className="flex items-center justify-between  mb-2">
      <h1 className="text-text text-sm-regular">
        {course.instructor.fullName}
      </h1>
      <div className="flex items-center gap-[10px]">
        <span className="text-[#E59819] text-sm-regular">
          {course.avgRating.toFixed(1)}
        </span>
        <RatingStar count={5} rating={course.avgRating} gap={3} size={13} />
      </div>
    </div>
    <Link
      className="block text-head text-base-medium hover:text-head/50 duration-300"
      href={"/"}
    >
      {course.name}
    </Link>
  </div>
);

export default CourseCard;
