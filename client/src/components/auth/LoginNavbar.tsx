import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const LoginNavbar: FC = () => (
  <div className="flex items-center gap-5">
    <ul className="flex gap-5">
      <li className="flex items-center hover:text-head/[0.7] ">
        <Link href="/">Home</Link>
        <MdKeyboardArrowDown />
      </li>
      <li className="flex items-center hover:text-head/[0.7]">
        <Link href="/">Courses</Link>
        <MdKeyboardArrowDown className="hover:rotate-90" />
      </li>
      <li className="flex items-center hover:text-head/[0.7]">
        <Link href="/">Events</Link>
        <MdKeyboardArrowDown />
      </li>
      <li className="flex items-center hover:text-head/[0.7]">
        <Link href="/">Blog</Link>
        <MdKeyboardArrowDown />
      </li>
      <li className="flex items-center hover:text-head/[0.7]">
        <Link href="/">Pages</Link>
        <MdKeyboardArrowDown />
      </li>
      <li className="flex items-center hover:text-head/[0.7]">
        <Link href="/">Contact</Link>
        <MdKeyboardArrowDown />
      </li>
    </ul>

    <button className="py-[6px] px-[34px] text-head hover:bg-head hover:text-white hover:rounded-xl">
      Log in
    </button>
    <button className="py-[6px] px-[34px] bg-head text-white rounded-xl">
      Sign Up
    </button>
  </div>
);
export default LoginNavbar;
