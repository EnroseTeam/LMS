import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import RatingStar from '../global/RatingStar';
import { ICourse } from '@/interfaces/courses';
import { BsFileEarmarkText, BsClock, BsBarChart } from 'react-icons/bs';
import placeHolderImg from '@/assets/placeholder.png';

interface CourseCardProps {
  course: ICourse;
}

const CourseCard: FC<CourseCardProps> = ({ course }) => (
  <div className="flex flex-col gap-[15px]">
    <Link
      href={`/courses/${course._id}`}
      className="rounded-lg overflow-hidden w-full group relative"
    >
      <Image
        src={course.picture}
        width={300}
        height={210}
        alt="Placeholder"
        className="w-full aspect-[1.42/1] object-cover"
      />
      <div className="w-full h-full absolute top-0 right-0 left-0 bottom-0 bg-head/0 group-hover:bg-head/50 duration-300" />
    </Link>

    <div className="flex flex-col gap-[10px]">
      <div className="flex items-center gap-[10px]">
        <p className="text-[#E59819] text-sm-medium">4.5</p>
        <RatingStar count={4.5} gap={5} />
        <p className="text-text text-xs-regular">(1991)</p>
      </div>

      <Link
        href={`/courses/${course._id}`}
        className="text-head text-lg-medium hover:text-head/80 duration-300"
      >
        {course.name}
      </Link>

      <div className="flex items-center gap-[20px]">
        <span className="flex items-center gap-2 text-md text-icon">
          <BsFileEarmarkText />
          <span className="text-sm-regular text-text">6 lessons</span>
        </span>

        <span className="flex items-center gap-2 text-md text-icon">
          <BsClock />
          <span className="text-sm-regular text-text">3h 56m</span>
        </span>

        <span className="flex items-center gap-2 text-md text-icon">
          <BsBarChart />
          <span className="text-sm-regular text-text">{course.level.name}</span>
        </span>
      </div>

      <div className="pt-[10px] flex items-center justify-between border-t border-t-border-1">
        <div className="flex items-center gap-[10px]">
          <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
            <Image src={placeHolderImg} alt="Profile" className="object-cover w-full h-full" />
          </div>
          {/* Backend зассаны дараа багшийн мэдээллийг энд харуулна */}
          <h1 className="text-text text-sm-regular"></h1>
        </div>

        <div className="flex items-center gap-2">
          {course.discountPrice > 0 && (
            <p className="text-text text-md-medium line-through">{course.price}</p>
          )}
          <p className="text-head text-md-medium">
            ${course.discountPrice > 0 ? course.discountPrice : course.price}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default CourseCard;
