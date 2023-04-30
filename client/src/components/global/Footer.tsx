import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { ImFacebook, ImTwitter, ImLinkedin2 } from "react-icons/im";
import { BsInstagram } from "react-icons/bs";

import { ICourseCategory } from "@/interfaces/courses";
import mainLogo from "@/assets/logo-main.svg";

interface FooterProps {
  categories?: ICourseCategory[];
}

const Footer: FC<FooterProps> = ({ categories }) => (
  <footer className="bg-head">
    <div className="container">
      <div className="py-[60px] text-white flex items-center  justify-between border-b border-b-white/[.15]">
        <div className="text-2xl-medium pb-2 hover:text-color-6">
          <Link href="/">
            <Image src={mainLogo} alt="IntelliSense" />
          </Link>
        </div>
        <div className="flex items-center gap-[30px]">
          <p className="text-lg-medium">Манай сошиал хаягууд</p>
          <div className="flex justify-between gap-4 text-sm">
            <Link
              className="text-white p-4 rounded-full hover:bg-white/10 duration-300"
              href="https://facebook.com"
              target="_blank"
            >
              <ImFacebook />
            </Link>
            <Link
              className="text-white p-4 rounded-full hover:bg-white/10 duration-300"
              href="https://twitter.com"
              target="_blank"
            >
              <ImTwitter />
            </Link>
            <Link
              className="text-white p-4 rounded-full hover:bg-white/10 duration-300"
              href="https://instagram.com"
              target="_blank"
            >
              <BsInstagram />
            </Link>
            <Link
              className="text-white p-4 rounded-full hover:bg-white/10 duration-300"
              href="https://linkedin.com"
              target="_blank"
            >
              <ImLinkedin2 />
            </Link>
          </div>
        </div>
      </div>

      <div className="text-white grid grid-cols-12 pt-[60px] pb-[127px] border-b border-b-white/[.15]">
        <div className="col-span-9 grid grid-cols-4">
          <ul className="flex flex-col gap-4 text-md-regular">
            <p className="uppercase mb-[26px] text-lg-medium">Бид</p>
            <li>
              <Link
                href="/about-us"
                className="hover:text-color-6 duration-300"
              >
                Бидний тухай
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                className="hover:text-color-6 duration-300"
              >
                Холбоо барих
              </Link>
            </li>
          </ul>
          <div className="grid grid-cols-2 col-span-2">
            <ul className="flex flex-col gap-4 text-md-regular">
              <p className="uppercase mb-[26px] text-lg-medium">Ангилалууд</p>
              {categories?.slice(0, 6).map((category) => (
                <li key={category._id}>
                  <Link
                    href={`/courses?category=${category.slug}`}
                    className="hover:text-color-6 duration-300"
                  >
                    {category.name}{" "}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-4 text-md-regular">
              <p className="uppercase mb-[26px] invisible">Categories</p>
              {categories?.slice(6).map((category) => (
                <li key={category._id}>
                  <Link
                    href={`/courses?category=${category.slug}`}
                    className="hover:text-color-6 duration-300"
                  >
                    {category.name}{" "}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <ul className="flex flex-col gap-4 text-md-regular">
            <p className="uppercase mb-[26px] select-none text-lg-medium">
              Тусламж
            </p>
            <li>
              <Link
                href="/contact-us#faq"
                className="hover:text-color-6 duration-300"
              >
                Түгээмэл асуултууд
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-3">
          <p className="uppercase mb-[26px] select-none text-lg-medium">
            Холбоотой байх
          </p>
          <p className="mb-5 text-md-regular">
            Бид спам явуулахгүй тул санаа зовох зүйлгүй.
          </p>
          <div className="relative bg-white w-full h-[60px] rounded-full pl-[30px] text-sm-regular focus-within:ring-4 focus-within:ring-color-1">
            <input
              type="text"
              placeholder="И-мэйл..."
              className="w-[calc(100%_-_100px)] h-full rounded-full text-text focus:outline-none placeholder:text-text"
            />

            <button className="absolute top-[10px] right-[10px] bottom-[10px] py-[12px] px-6 bg-color-1 rounded-[60px] hover:bg-color-1/80 duration-300">
              Илгээх
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between py-12 text-white text-xs-regular">
        <p>© 2023 IntelliSense. Бүх эрх хуулиар хамгаалагдсан.</p>

        <div className="flex items-center">
          <ul className="flex gap-3 items-center">
            <li className="pb-2 hover:text-color-6 cursor-pointer">
              <Link href="/">Тусламж</Link>
            </li>
            <li className="pb-2 hover:text-color-6 cursor-pointer">
              <Link href="/">Дотоод журам</Link>
            </li>
            <li className="pb-2 hover:text-color-6 cursor-pointer">
              <Link href="/">Үйлчилгээний нөхцөл</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
