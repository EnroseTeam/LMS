import { FC } from "react";
import React from "react";
import { BsBookmark, BsMoon } from "react-icons/bs";
import { SlFrame } from "react-icons/sl";
import {
  RiShoppingBag2Line,
  RiMailLine,
  RiFileList3Line,
  RiMenu4Fill,
} from "react-icons/ri";
import { TbBellRinging, TbMessageCircle, TbPlaceholder } from "react-icons/tb";
import Image from "next/image";
import iconImage from "../../assets/placeholder.png";
import logoMain from "../../assets/logoBlack.svg";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Link from "next/link";
import {
  AiOutlineCompass,
  AiOutlinePlayCircle,
  AiOutlinePoweroff,
  AiOutlineSetting,
} from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";

const Navbar: FC = () => (
  <div className="bg-[#E5E5E5] w-full h-screen">
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
    <div className="flex bg-bg-1 w-screen h-screen rounded-[2rem]">
      <div className="bg-white w-[310px] h-screen text-text text-lg-medium pl-[55px] pt-[50px]">
        <ul className="flex flex-col gap-[18px]">
          <Link
            href="/"
            className="flex items-center px-4 py-4 hover:bg-head hover:text-white hover:rounded-[1rem] active:bg-head"
          >
            <AiOutlineCompass />
            <li className="pl-[15px]">Dashboard</li>
          </Link>
          <Link
            href="/"
            className="flex items-center px-4 py-4 hover:bg-head hover:text-white hover:rounded-[1rem]"
          >
            <AiOutlinePlayCircle />
            <li className="pl-[15px]">My Courses</li>
          </Link>
          <Link
            href="/"
            className="flex items-center px-4 py-4 hover:bg-head hover:text-white hover:rounded-[1rem]"
          >
            <BsBookmark />
            <li className="pl-[15px]">Bookmarks</li>
          </Link>
          <Link
            href="/"
            className="flex items-center px-4 py-4 hover:bg-head hover:text-white hover:rounded-[1rem]"
          >
            <BiMessageDetail />
            <li className="pl-[15px]">Messages</li>
          </Link>
          <Link
            href="/"
            className="flex items-center px-4 py-4 hover:bg-head hover:text-white hover:rounded-[1rem]"
          >
            <RiFileList3Line />
            <li className="pl-[15px]">Create Course</li>
          </Link>
          <Link
            href="/"
            className="flex items-center px-4 py-4 hover:bg-head hover:text-white hover:rounded-[1rem]"
          >
            <TbMessageCircle />
            <li className="pl-[15px]">Reviews</li>
          </Link>
          <Link
            href="/"
            className="flex items-center px-4 py-4 hover:bg-head hover:text-white hover:rounded-[1rem]"
          >
            <AiOutlineSetting />
            <li className="pl-[15px]">Settings</li>
          </Link>
          <Link
            href="/"
            className="flex items-center px-4 py-4 hover:bg-head hover:text-white hover:rounded-[1rem]"
          >
            <AiOutlinePoweroff />
            <li className="pl-[15px]">Logout</li>
          </Link>
        </ul>
      </div>
      <div className="bg-bg-1 w-screen h-screen ">
        <div className="text-3xl-bold text-head pl-[60px] pt-[60px]">
          <h1>Dashboard</h1>
          <p className="text-md-regular text-text">
            Lorem ipsum dolor sit amet, consectetur.
          </p>
        </div>
        <div className="flex items-center justify-around mx-auto gap-[2rem]">
          <div className="w-[345px] h-[170px] bg-white rounded-lg">1</div>
          <div className="w-[345px] h-[170px] bg-white rounded-lg">1</div>
          <div className="w-[345px] h-[170px] bg-white rounded-lg">1</div>
          <div className="w-[345px] h-[170px] bg-white rounded-lg">1</div>
        </div>
      </div>
    </div>
  </div>
);

export default Navbar;
