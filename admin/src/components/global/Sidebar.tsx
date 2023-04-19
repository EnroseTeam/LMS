import { FC } from "react";
import React from "react";
import { RiFileList3Line } from "react-icons/ri";
import { TbMessageCircle } from "react-icons/tb";
import Link from "next/link";
import {
  AiOutlineCompass,
  AiOutlinePlayCircle,
  AiOutlinePoweroff,
  AiOutlineSetting,
} from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";

const Sidebar: FC = () => (
  <div className="bg-white w-[300px] h-screen text-text text-lg-medium pl-[55px] pt-[50px]">
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
);

export default Sidebar;
