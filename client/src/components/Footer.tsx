import { FC } from 'react';
import { ImFacebook, ImTwitter, ImLinkedin2 } from 'react-icons/im';
import { BsInstagram } from 'react-icons/bs';
import Link from 'next/link';
import mainLogo from '../assets/logo-main.svg';
import Image from 'next/image';
import { ICourseCategory } from '@/interfaces/courses';

interface FooterProps {
  categories: ICourseCategory[];
}

export const Footer: FC<FooterProps> = ({ categories }) => (
  <div className="bg-head">
    <div className="container">
      <div className="py-[60px] text-white flex items-center  justify-between border-b border-b-white/[.15]">
        <div className="text-2xl-medium pb-2 hover:text-color-6">
          <Link href="/">
            <Image src={mainLogo} alt="IntelliSense" />
          </Link>
        </div>
        <div className="flex items-center gap-[30px]">
          <p className="text-lg-medium">Follow Us On Social Media</p>
          <div className="flex justify-between gap-4 text-sm">
            <Link className="text-white p-4 rounded-full hover:bg-white/10 duration-300" href="/">
              <ImFacebook />
            </Link>
            <Link className="text-white p-4 rounded-full hover:bg-white/10 duration-300" href="/">
              <ImTwitter />
            </Link>
            <Link className="text-white p-4 rounded-full hover:bg-white/10 duration-300" href="/">
              <BsInstagram />
            </Link>
            <Link className="text-white p-4 rounded-full hover:bg-white/10 duration-300" href="/">
              <ImLinkedin2 />
            </Link>
          </div>
        </div>
      </div>

      <div className="text-white grid grid-cols-12 pt-[60px] pb-[127px] border-b border-b-white/[.15]">
        <div className="col-span-9 grid grid-cols-4">
          <ul className="flex flex-col gap-4 text-md-regular">
            <p className="uppercase mb-[26px] text-lg-medium">About</p>
            <li className="hover:text-color-6">
              <Link href="/">About Us</Link>
            </li>
            <li className="hover:text-color-6">
              <Link href="/">Learner Stories</Link>
            </li>
            <li className="hover:text-color-6">
              <Link href="/">Careers</Link>
            </li>
            <li className="hover:text-color-6">
              <Link href="/"> Press</Link>
            </li>
            <li className="hover:text-color-6">
              <Link href="/">Leadership</Link>
            </li>
            <li className="hover:text-color-6">
              <Link href="/">Contact Us</Link>
            </li>
          </ul>
          <div className="grid grid-cols-2 col-span-2">
            <ul className="flex flex-col gap-4 text-md-regular">
              <p className="uppercase mb-[26px] text-lg-medium">Ангилалууд</p>
              {categories.map((category) => (
                <li key={category._id} className="hover:text-color-6 duration-300">
                  <Link href="/">{category.name} </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-4 text-md-regular">
              <p className="uppercase mb-[26px] invisible">Categories</p>
              <li className="hover:text-color-6">
                <Link href="/">Lifiestyle </Link>
              </li>
              <li className="hover:text-color-6">
                <Link href="/">Photography & Video </Link>
              </li>
              <li className="hover:text-color-6">
                <Link href="/">Health & Fitness </Link>
              </li>
              <li className="hover:text-color-6">
                <Link href="/">Music </Link>
              </li>
              <li className="hover:text-color-6">
                <Link href="/"> UX Design </Link>
              </li>
              <li className="hover:text-color-6">
                <Link href="/">Seo </Link>
              </li>
            </ul>
          </div>

          <ul className="flex flex-col gap-4 text-md-regular">
            <p className="uppercase mb-[26px] select-none text-lg-medium">Support</p>
            <li className="hover:text-color-6">
              <Link href="/">Documentation </Link>
            </li>
            <li className="hover:text-color-6">
              <Link href="/">FAQS </Link>
            </li>
            <li className="hover:text-color-6">
              <Link href="/">Dashboard </Link>
            </li>
            <li className="hover:text-color-6">
              <Link href="/">Contact </Link>
            </li>
            <li className="hover:text-color-6">
              <Link href="/"> Office </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-3">
          <p className="uppercase mb-[26px] select-none text-lg-medium">Get in touch</p>
          <p className="mb-5 text-md-regular">We don’t send spam so don’t worry.</p>
          <div className="relative bg-white w-full h-[60px] rounded-full pl-[30px] text-sm-regular focus-within:ring-4 focus-within:ring-color-1">
            <input
              type="text"
              placeholder="Email..."
              className="w-[calc(100%_-_100px)] h-full rounded-full text-text focus:outline-none placeholder:text-text"
            />

            <button className="absolute top-[10px] right-[10px] bottom-[10px] py-[12px] px-6 bg-color-1 rounded-[60px] hover:bg-color-1/80 duration-300">
              Submit
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between py-12 text-white text-xs-regular">
        <p>© 2023 Educrat. All Right Reserved.</p>

        <div className="flex items-center">
          <ul className="flex gap-3 items-center">
            <li className="pb-2 hover:text-color-6 cursor-pointer">
              <Link href="/">Help</Link>
            </li>
            <li className="pb-2 hover:text-color-6 cursor-pointer">
              <Link href="/">Privacy Policy</Link>
            </li>
            <li className="pb-2 hover:text-color-6 cursor-pointer">
              <Link href="/">Cookie Notice</Link>
            </li>
            <li className="pb-2 hover:text-color-6 cursor-pointer">
              <Link href="/">Security</Link>
            </li>
            <li className="pb-2 hover:text-color-6 cursor-pointer">
              <Link href="/">Terms of Use</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);
