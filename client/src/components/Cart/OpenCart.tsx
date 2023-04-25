import { FC } from "react";
import { AiOutlineClose } from "react-icons/ai";

import placeholder from "@/assets/backimg.svg";
import Link from "next/link";
import Image from "next/image";

interface OpenCartProps {
  openCartShow: boolean;
  setOpenCartShow: (state: boolean) => void;
}

const OpenCart: FC<OpenCartProps> = ({ openCartShow, setOpenCartShow }) => (
  <div
    className={`absolute -right-7 top-7  ${
      openCartShow ? "opacity-100" : "opacity-0 pointer-events-none"
    } duration-300`}
  >
    <div className="bg-white w-[10px] h-[10px] rotate-45 ml-[367px]" />
    <div className="bg-white rounded-lg shadow-shadow-4 w-[410px] -mt-[6px] text-head cursor-default">
      <div className="flex flex-col gap-5 px-[30px] pt-[30px] mb-[30px]">
        <div className="flex items-center gap-[10px] relative">
          <button className="text-md text-color-1 absolute top-0 right-0">
            <AiOutlineClose />
          </button>
          <div className="w-20 h-20 rounded-lg overflow-hidden">
            <Image
              src={placeholder}
              alt="Cart Product"
              width={80}
              height={80}
              className="w-full aspect-square object-cover"
            />
          </div>

          <div className="flex flex-col flex-1 gap-[10px]">
            <h1 className="text-md-regular leading-6 text-left w-[90%]">
              The Ultimate Drawing Course Beginner to Advanced...
            </h1>
            <div className="flex items-center gap-[7px]">
              <span className="text-text line-through text-md-medium">$179</span>
              <span className="text-xl-medium">$79</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-[10px] relative">
          <button
            onClick={(): void => {
              setOpenCartShow(false);
            }}
            className="text-md text-color-1 absolute top-0 right-0"
          >
            <AiOutlineClose />
          </button>
          <div className="w-20 h-20 rounded-lg overflow-hidden">
            <Image
              src={placeholder}
              alt="Cart Product"
              width={80}
              height={80}
              className="w-full aspect-square object-cover"
            />
          </div>

          <div className="flex flex-col flex-1 gap-[10px]">
            <h1 className="text-md-regular leading-6 text-left w-[90%]">
              The Ultimate Drawing Course Beginner to Advanced...
            </h1>
            <div className="flex items-center gap-[7px]">
              <span className="text-text line-through text-md-medium">$179</span>
              <span className="text-xl-medium">$79</span>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-[20px] pb-[30px] px-[30px] border-t border-t-border-1">
        <div className="flex items-center justify-between text-xl-medium mb-[30px]">
          <h3>Нийт дүн:</h3>
          <p>₮25,000</p>
        </div>
        <div className="flex items-center justify-between text-base-regular">
          <Link href="/" className="text-white bg-head py-2 px-[35px] rounded-lg">
            Сагс үзэх
          </Link>
          <Link href="/" className="text-white bg-color-1 py-2 px-[35px] rounded-lg">
            Худалдаж авах
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default OpenCart;
