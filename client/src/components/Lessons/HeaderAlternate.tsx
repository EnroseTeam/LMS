import { FC } from 'react';
import Image from 'next/image';

import logo from '@/assets/logo-main.svg';
import Link from 'next/link';

const HeaderAlternate: FC = () => (
  <div className="bg-head text-white py-5">
    <div className="container flex items-center justify-between">
      <Link href="/">
        <Image alt="Logo" src={logo} />
      </Link>
      <h1 className="text-xl font-medium leading-9">
        The Ultimate Drawing Course Beginner to Advanced
      </h1>
      <button className="text-head text-md-regular py-[7px] px-[30px] bg-white rounded-[60px] hover:bg-white/70 duration-300">
        Back to Course
      </button>
    </div>
  </div>
);

export default HeaderAlternate;
