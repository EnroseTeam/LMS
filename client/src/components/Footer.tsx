import { FC } from "react";
import { ImFacebook, ImTwitter, ImLinkedin2 } from "react-icons/im";
import { BsInstagram } from "react-icons/bs";
import { IoEarthOutline } from "react-icons/io5";
import Link from "next/link";

export const Footer: FC = () => (
  <div className="bg-head ">
    <div className="containaer">
      {/* footer ehlel ------------------------------------------------------------------------------------------------- */}
      <div className="mx-auto ">
        <div className="py-[60px] text-white flex items-center  justify-between border-b border-b-white/15">
          <div className="text-2xl-medium pb-2 hover:text-color-6 cursor-pointer">
            IntelliSense
          </div>
          <div className="flex items-center">
            <p className="text-lg-regular mx-4 pb-2 hover:text-color-6 cursor-pointer">
              Follow Us On Social Media
            </p>
            <ul className="flex justify-between gap-4">
              <li className="text-white p-4 text-sm-regular rounded-full cursor-pointer hover:bg-white/10">
                <Link href="/">
                  <ImFacebook className="" />
                </Link>
              </li>
              <li className="text-white p-4 text-sm-regular rounded-full cursor-pointer hover:bg-white/10">
                <Link href="/">
                  <ImTwitter />
                </Link>
              </li>
              <li className="text-white p-4 text-sm-regular rounded-full cursor-pointer hover:bg-white/10">
                <Link href="/">
                  <BsInstagram />
                </Link>
              </li>
              <li className="text-white p-4 text-sm-regular rounded-full cursor-pointer hover:bg-white/10">
                <Link href="/">
                  <ImLinkedin2 />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* footer dund */}
      <div>
        <div className="text-white grid grid-cols-12 py-[60px] border-b border-b-white/15">
          <div className="col-span-8 grid grid-cols-4">
            <div>
              <ul>
                <p className="uppercase mb-[26px] lg-medium">About</p>
                <li className="pb-2 hover:text-color-6 cursor-pointer">
                  <Link href="/">About Us</Link>
                </li>
                <li className="pb-2 hover:text-color-6 cursor-pointer">
                  <Link href="/">Learner Stories</Link>
                </li>
                <li className="pb-2 hover:text-color-6 cursor-pointer">
                  <Link href="/">Careers</Link>
                </li>
                <li className="pb-2 hover:text-color-6 cursor-pointer">
                  <Link href="/"> Press</Link>
                </li>
                <li className="pb-2 hover:text-color-6 cursor-pointer">
                  <Link href="/">Leadership</Link>
                </li>
                <li className="pb-2 hover:text-color-6 cursor-pointer">
                  <Link href="/">Contact Us</Link>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 col-span-2">
              <ul>
                <p className="uppercase mb-[26px] lg-medium">Categories</p>
                <li className="pb-2 hover:text-color-6 cursor-pointer">
                  <Link href="/">
                    <Link href="/">Development </Link>
                  </Link>
                </li>
                <li className="pb-2 hover:text-color-6 cursor-pointer">
                  <Link href="/">Business </Link>
                </li>
                <li className="pb-2 hover:text-color-6 cursor-pointer">
                  <Link href="/">Finance & Accounting </Link>
                </li>
                <li className="pb-2 hover:text-color-6 cursor-pointer">
                  <Link href="/">IT & Software </Link>
                </li>
                <li className="pb-2 hover:text-color-6 cursor-pointer">
                  <Link href="/"> Office Productivity </Link>
                </li>
                <li className="pb-2 hover:text-color-6 cursor-pointer">
                  <Link href="/">Design </Link>
                </li>
                <li className="pb-2 hover:text-color-6 cursor-pointer">
                  <Link href="/">Marketing</Link>
                </li>
              </ul>
              <ul>
                <p className="uppercase mb-[26px] text-head select-none lg-medium">
                  Categories
                </p>
                <li className="pb-2 hover:text-color-6 cursor-pointer">
                  <Link href="/">Lifiestyle </Link>
                </li>
                <li className="pb-2 hover:text-color-6 cursor-pointer">
                  <Link href="/">Photography & Video </Link>
                </li>
                <li className="pb-2 hover:text-color-6 cursor-pointer">
                  <Link href="/">Health & Fitness </Link>
                </li>
                <li className="pb-2 hover:text-color-6 cursor-pointer">
                  <Link href="/">Music </Link>
                </li>
                <li className="pb-2 hover:text-color-6 cursor-pointer">
                  <Link href="/"> UX Design </Link>
                </li>
                <li className="pb-2 hover:text-color-6 cursor-pointer">
                  <Link href="/">Seo </Link>
                </li>
              </ul>
            </div>
            <div className="flex">
              <ul>
                <p className="uppercase mb-[26px]">Support</p>
                <li className="pb-2 hover:text-color-6 cursor-pointer">
                  <Link href="/">Documentation </Link>
                </li>
                <li className="pb-2 hover:text-color-6 cursor-pointer">
                  <Link href="/">FAQS </Link>
                </li>
                <li className="pb-2 hover:text-color-6 cursor-pointer">
                  <Link href="/">Dashboard </Link>
                </li>
                <li className="pb-2 hover:text-color-6 cursor-pointer">
                  <Link href="/">Contact </Link>
                </li>
                <li className="pb-2 hover:text-color-6 cursor-pointer">
                  <Link href="/"> Office </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-4">
            <p className="uppercase mb-[26px] lg-medium">Get in touch</p>
            <p className="pb-2 hover:text-color-6 cursor-pointer">
              We don’t send spam so don’t worry.
            </p>
            <div className="relative bg-white w-[298px] h-[60px] rounded-full pl-[30px] text-sm-regular pt">
              <input
                type="text"
                placeholder="Search"
                className=" w-[calc(100%_-_100px)] h-full rounded-full text-text focus:outline-none"
              />

              <button className="absolute top-[10px] right-[10px] bottom-[10px] px-[14px] py-3 bg-color-1 rounded-full ">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* footer bottom */}
      <div>
        <div className="grid grid-cols-12 py-[60px] text-white">
          <div className="flex items-center col-span-7">
            <ul>
              <li className="pb-2 hover:text-color-6 cursor-pointer">
                <Link href="/">© 2023 Educrat. All Right Reserved.</Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center col-span-4">
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
          <div className="flex items-center justify-center w-[141px] h-[50px] rounded-full col-span-1 hover:bg-white/10">
            <IoEarthOutline />
            <button className="pl-2 ">English</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
