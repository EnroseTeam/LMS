import { FC } from "react";
import Image from "next/image";

import { SlGraduation } from "react-icons/sl";
import { CgPlayButtonR } from "react-icons/cg";
import { BsLaptop, BsBriefcase } from "react-icons/bs";

import Button from "../global/Button";
import bgShape from "@/assets/hero-shape.svg";

const HeroSection: FC = () => (
  <div className="relative overflow-hidden w-full bg-head pt-[55px] pb-[136px] hero">
    <div className="container grid grid-cols-1 lg:grid-cols-2 gap-[29px lg:gap-[139px]]">
      <div className="my-auto text-white">
        <h1 className="select-none text-[30px] font-bold leading-[43px] mb-3 lg:text-[55px] lg:leading-[80px]">
          Онлайнаар хүссэн чадвараа эзэмших газар{" "}
          <span className="text-color-6 underline">IntelliSense</span>
        </h1>
        <p className="select-none text-md-regular  mb-[27px] w-full lg:w-[50ch] lg:text-lg-regular">
          Олон улсын шаардлага хангасан сургалтуудын тусламжтайгаар өөрийн чадвараа хөгжүүлээрэй.
        </p>

        <div className="flex flex-col items-center gap-5 text-base-medium mb-[84px] lg:flex-row">
          <Button className="bg-color-1 hover:bg-color-1/70 duration-300 whitespace-nowrap w-full lg:w-fit">
            Үнэгүй элсэх
          </Button>
          <Button className="text-color-6 border-2 border-color-6 hover:bg-color-6/90 hover:text-white hover:border-transparent duration-300 whitespace-nowrap w-full lg:w-fit">
            Сургалтууд үзэх
          </Button>
        </div>

        <div className=" hidden gap-6 lg:flex">
          <div className="flex items-center gap-2 text-xl">
            <SlGraduation />
            <p className="text-md-medium">12 мянган сурагч</p>
          </div>

          <div className="flex items-center gap-2 text-xl">
            <CgPlayButtonR />
            <p className="text-md-medium">5,000 орчим сургалтууд</p>
          </div>

          <div className="flex items-center gap-2 text-xl">
            <BsLaptop />
            <p className="text-md-medium">Хүссэн зүйлээ сурах</p>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="w-[90%] blob-1 overflow-hidden">
          {/* Top Card */}
          <div className="hidden lg:flex absolute -top-5 -left-12 pt-5 pl-5 pr-[66px] pb-4 bg-white rounded-lg shadow-shadow-2  items-center gap-5">
            <div className="w-[60px] h-[60px] bg-color-6 rounded-full" />

            <div>
              <h1 className="text-color-2 text-base-medium mb-[2px]">У.Ганболд</h1>
              <p className="text-text text-md-regular">Программист</p>
            </div>
          </div>

          {/* Bottom Card */}
          <div className="absolute -bottom-2 -right-0 lg:-right-8 pt-5 pl-5 pr-[36px] pb-4 bg-white rounded-lg shadow-shadow-2 flex items-center gap-5">
            <div className="shadow-shadow-2 w-[50px] h-[50px] bg-color-4/[.15] rounded-full grid place-items-center text-xl text-color-4">
              <BsBriefcase />
            </div>

            <div>
              <h1 className="text-color-4 text-base-medium mb-[2px]">1.000+</h1>
              <p className="text-text text-md-regular">Үнэгүй сургалтууд</p>
            </div>
          </div>

          {/* Hero Picture */}
          <Image
            src="https://res.cloudinary.com/dvlgyc6gs/image/upload/v1682238571/kggh1orkww0rmvvkc53q.jpg"
            alt="hero"
            width={920}
            height={920}
            className="aspect-square object-cover"
          />
        </div>
      </div>
    </div>

    {/* Background shapes */}
    <div className="container absolute top-8 bottom-[62px] right-0 left-0  pointer-events-none">
      <Image src={bgShape} alt="Background shapes" className="w-full" />
    </div>

    {/* Bottom waves */}
    <div className="absolute bottom-0 right-0 left-0 w-full overflow-hidden leading-[0] hidden lg:block">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-[calc(137%_+_1.3px)] h-[75px]"
      >
        <path
          d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
          className="fill-white"
        />
      </svg>
    </div>
  </div>
);

export default HeroSection;
