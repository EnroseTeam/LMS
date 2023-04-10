import { FC } from 'react';
import placeHolderImg from '../../assets/placeholder.png';
import Image from 'next/image';

import { BsFileEarmarkText, BsClock, BsBarChart } from 'react-icons/bs';
import Link from 'next/link';

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
          <svg
            width="10"
            height="11"
            viewBox="0 0 10 11"
            className="fill-[#E59819]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4.46355 1.24776L3.24299 3.83338L0.512158 4.24935C0.0224388 4.32355 -0.173823 4.95434 0.181317 5.31562L2.15701 7.32709L1.68973 10.1685C1.60561 10.6821 2.12337 11.0669 2.55701 10.8267L5 9.48503L7.44299 10.8267C7.87663 11.0649 8.39439 10.6821 8.31028 10.1685L7.84299 7.32709L9.81868 5.31562C10.1738 4.95434 9.97756 4.32355 9.48784 4.24935L6.75701 3.83338L5.53645 1.24776C5.31776 0.786883 4.68411 0.781024 4.46355 1.24776Z" />
          </svg>
          <svg
            width="10"
            height="11"
            viewBox="0 0 10 11"
            className="fill-[#E59819]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4.46355 1.24776L3.24299 3.83338L0.512158 4.24935C0.0224388 4.32355 -0.173823 4.95434 0.181317 5.31562L2.15701 7.32709L1.68973 10.1685C1.60561 10.6821 2.12337 11.0669 2.55701 10.8267L5 9.48503L7.44299 10.8267C7.87663 11.0649 8.39439 10.6821 8.31028 10.1685L7.84299 7.32709L9.81868 5.31562C10.1738 4.95434 9.97756 4.32355 9.48784 4.24935L6.75701 3.83338L5.53645 1.24776C5.31776 0.786883 4.68411 0.781024 4.46355 1.24776Z" />
          </svg>
          <svg
            width="10"
            height="11"
            viewBox="0 0 10 11"
            className="fill-[#E59819]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4.46355 1.24776L3.24299 3.83338L0.512158 4.24935C0.0224388 4.32355 -0.173823 4.95434 0.181317 5.31562L2.15701 7.32709L1.68973 10.1685C1.60561 10.6821 2.12337 11.0669 2.55701 10.8267L5 9.48503L7.44299 10.8267C7.87663 11.0649 8.39439 10.6821 8.31028 10.1685L7.84299 7.32709L9.81868 5.31562C10.1738 4.95434 9.97756 4.32355 9.48784 4.24935L6.75701 3.83338L5.53645 1.24776C5.31776 0.786883 4.68411 0.781024 4.46355 1.24776Z" />
          </svg>
          <svg
            width="10"
            height="11"
            viewBox="0 0 10 11"
            className="fill-[#E59819]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4.46355 1.24776L3.24299 3.83338L0.512158 4.24935C0.0224388 4.32355 -0.173823 4.95434 0.181317 5.31562L2.15701 7.32709L1.68973 10.1685C1.60561 10.6821 2.12337 11.0669 2.55701 10.8267L5 9.48503L7.44299 10.8267C7.87663 11.0649 8.39439 10.6821 8.31028 10.1685L7.84299 7.32709L9.81868 5.31562C10.1738 4.95434 9.97756 4.32355 9.48784 4.24935L6.75701 3.83338L5.53645 1.24776C5.31776 0.786883 4.68411 0.781024 4.46355 1.24776Z" />
          </svg>
          <svg
            width="10"
            height="11"
            viewBox="0 0 10 11"
            className="fill-[#E59819]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4.46355 1.24776L3.24299 3.83338L0.512158 4.24935C0.0224388 4.32355 -0.173823 4.95434 0.181317 5.31562L2.15701 7.32709L1.68973 10.1685C1.60561 10.6821 2.12337 11.0669 2.55701 10.8267L5 9.48503L7.44299 10.8267C7.87663 11.0649 8.39439 10.6821 8.31028 10.1685L7.84299 7.32709L9.81868 5.31562C10.1738 4.95434 9.97756 4.32355 9.48784 4.24935L6.75701 3.83338L5.53645 1.24776C5.31776 0.786883 4.68411 0.781024 4.46355 1.24776Z" />
          </svg>
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
