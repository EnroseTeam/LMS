import React, { FC } from "react";
import Image from "next/image";
import bimage from "../../assets/backimg.svg";

export const ResourcesNews: FC = () => (
  <div className="container">
    <div className="flex items-center justify-between pt-[120px] pb-[46px]">
      <div>
        <h1 className="text-head text-3xl-bold">Resources & News</h1>
        <p className="text-md-regular text-text">
          Lorem ipsum dolor sit amet, consectetur
        </p>
      </div>
      <button className="w-[176px] h-[50px] bg-color-1 rounded-md">
        Browse Blog
      </button>
    </div>
    <div className="grid grid-cols-3 gap-[15px] pb-[112px]">
      <div className="">
        <Image
          src={bimage}
          alt=""
          className="rounded-xl pb-[5px]"
          width={435}
          height={354}
        />
        <p className="text-color-1 text-sm-medium pb-[10px]">EDUCATION</p>
        <h1 className="text-[#242239] text-2xl-medium pb-[10px]">
          Eco-Education in Our Lives: We Can Change the Future
        </h1>
        <p className="text-text text-md-regular">December 16, 2022</p>
      </div>
      <div className="">
        <Image
          src={bimage}
          alt=""
          className="rounded-xl pb-[5px]"
          width={435}
          height={354}
        />
        <p className="text-color-1 text-sm-medium pb-[10px] uppercase">
          Education
        </p>
        <h1 className="text-[#242239] text-2xl-medium pb-[10px]">
          Eco-Education in Our Lives: We Can Change the Future
        </h1>
        <p className="text-text text-md-regular">December 16, 2022</p>
      </div>

      <div className="">
        <div className="flex items-center justify-between pb-[13px]">
          <Image
            src={bimage}
            alt=""
            className="rounded-xl "
            width={155}
            height={157}
          />
          <div className="pl-[10px]">
            <h1 className="text-color-1 text-xs-medium uppercase pb-[10px]">
              Courses
            </h1>
            <h3 className="text-head text-lg-medium pb-[10px]">
              Medical Chemistry: The Molecular Basis
            </h3>
            <p className="text-text text-md-regular">December 16, 2022</p>
          </div>
        </div>
        <div className="pb-[13px]">
          <Image
            src={bimage}
            alt=""
            className="rounded-xl "
            width={155}
            height={157}
          />
          <div className="pl-[10px]">
            <h1 className="text-color-1 text-xs-medium uppercase pb-[10px]">
              Courses
            </h1>
            <h3 className="text-head text-lg-medium pb-[10px]">
              Medical Chemistry: The Molecular Basis
            </h3>
            <p className="text-text text-md-regular">December 16, 2022</p>
          </div>
        </div>
        <div className="pb-[13px]">
          <Image
            src={bimage}
            alt=""
            className="rounded-xl "
            width={155}
            height={157}
          />
          <div className="pl-[10px]">
            <h1 className="text-color-1 text-xs-medium uppercase pb-[10px]">
              Courses
            </h1>
            <h3 className="text-head text-lg-medium pb-[10px]">
              Medical Chemistry: The Molecular Basis
            </h3>
            <p className="text-text text-md-regular">December 16, 2022</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
