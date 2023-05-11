import { FC } from "react";
import Image from "next/image";

import logo from "@/assets/logo-main.svg";
import Link from "next/link";

interface HeaderAlternateProps {
  title: string;
  courseId: string;
}

const HeaderAlternate: FC<HeaderAlternateProps> = ({ title, courseId }) => (
  <header className="bg-head text-white py-5 sticky top-0 z-[999]">
    <div className="container flex flex-col gap-5 md:flex-row items-center justify-between">
      <Link href="/">
        <Image alt="Logo" src={logo} />
      </Link>
      <h1 className="text-xl font-medium leading-9">{title}</h1>
      <Link
        href={`/courses/${courseId}`}
        className="text-head text-md-regular py-[7px] px-[30px] bg-white rounded-[60px] hover:bg-white/70 duration-300"
      >
        Сургалтруу буцах
      </Link>
    </div>
  </header>
);

export default HeaderAlternate;
