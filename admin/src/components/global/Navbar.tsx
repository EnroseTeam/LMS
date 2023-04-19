import { FC } from "react";
import React from "react";
import { BsMoon } from "react-icons/bs";
import { SlFrame } from "react-icons/sl";
import { RiShoppingBag2Line, RiMailLine, RiMenu4Fill } from "react-icons/ri";
import { TbBellRinging } from "react-icons/tb";
import Image from "next/image";
import iconImage from "../../assets/placeholder.png";
import logoMain from "../../assets/logoBlack.svg";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";

const Navbar: FC = () => (
  <div className="bg-[#E5E5E5] w-full">
    <div className="flex grid-col-2 items-center justify-between bg-white py-[36px] pr-[30px]">
      <div className="flex items-center">
        <RiMenu4Fill className="w-[36px] h-[30px] ml-[30px] mr-[30px]" />
        <Image src={logoMain} alt="/" width={171} height={50} />
      </div>
      <div className="flex items-center gap-3 text-head">
        <p className="flex items-center text-md-regular">
          All Pages <MdOutlineKeyboardArrowDown />
        </p>
        <p className="flex items-center text-md-regular">
          My Courses
          <MdOutlineKeyboardArrowDown />
        </p>
        <Link
          href="/"
          className="py-[1rem] px-[1rem] hover:bg-bg-1 hover:rounded-lg"
        >
          <BsMoon />
        </Link>
        <Link
          href="/"
          className="py-[1rem] px-[1rem] hover:bg-bg-1 hover:rounded-lg"
        >
          <SlFrame />
        </Link>
        <Link
          href="/"
          className="py-[1rem] px-[1rem] hover:bg-bg-1 hover:rounded-lg"
        >
          <RiShoppingBag2Line />
        </Link>
        <Link
          href="/"
          className="py-[1rem] px-[1rem] hover:bg-bg-1 hover:rounded-lg"
        >
          <RiMailLine />
        </Link>
        <Link
          href="/"
          className="py-[1rem] px-[1rem] hover:bg-bg-1 hover:rounded-lg"
        >
          <TbBellRinging />
        </Link>

        <Image
          src={iconImage}
          alt="/"
          width={50}
          height={50}
          className="rounded-lg"
        />
      </div>
    </div>
  </div>
);

export default Navbar;
