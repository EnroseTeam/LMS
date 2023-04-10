import { FC } from 'react';
import placeHolderImg from '@/assets/placeholder.png';
import Image from 'next/image';

import { BsFileEarmarkText, BsClock, BsBarChart } from 'react-icons/bs';
import Link from 'next/link';
import RatingStar from './RatingStar';

const CourseCard: FC = () => (
  <div className="flex flex-col gap-[15px]">
    <Link href="/" className="rounded-lg overflow-hidden w-full group relative">
      <Image src={placeHolderImg} alt="Placeholder" className="w-full object-contain" />
      <div className="w-full h-full absolute top-0 right-0 left-0 bottom-0 bg-head/0 group-hover:bg-head/50 duration-300" />
    </Link>

    <div className="flex flex-col gap-[10px]">
      <div className="flex items-center gap-[10px]">
        <p className="text-[#E59819] text-sm-medium mt-[2px]">4.5</p>
        <div className="flex items-center gap-1">
          <RatingStar className="fill-[#E59819]" />
          <RatingStar className="fill-[#E59819]" />
          <RatingStar className="fill-[#E59819]" />
          <RatingStar className="fill-[#E59819]" />
          <RatingStar className="fill-[#E59819]" />
        </div>
        <p className="text-text text-xs-regular">(1991)</p>
      </div>

      <Link href="/" className="text-head text-lg-medium hover:text-head/80 duration-300">
        Learn Figma - UI/UX Design Essential Training
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
          <span className="text-sm-regular text-text">Beginner</span>
        </span>
      </div>

      <div className="pt-[10px] flex items-center justify-between border-t border-t-border-1">
        <div className="flex items-center gap-[10px]">
          <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
            <Image src={placeHolderImg} alt="Profile" className="object-cover w-full h-full" />
          </div>
          <h1 className="text-text text-sm-regular">Ali Tufan</h1>
        </div>

        <div className="flex items-center gap-2">
          <p className="text-text text-md-medium line-through">$179</p>
          <p className="text-head text-md-medium">$79</p>
        </div>
      </div>
    </div>
  </div>
);

export default CourseCard;
