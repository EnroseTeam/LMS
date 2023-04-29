import Image from "next/image";
import React, { FC } from "react";
import postImage from "@/assets/placeholder.png";

const BlogPage: FC = () => (
  <>
    <div>
      <div className="flex flex-col items-center justify-center w-[640px] m-auto">
        <h1 className="text-4x-bold text-head pt-[90px] pb-1">Latest News</h1>
        <p className="lg-regular text-text pb-[30px]">
          We’re on a mission to deliver engaging, curated courses at a
          reasonable price.
        </p>
        <div className="relative bg-white w-full h-[60px] rounded-md pl-[30px border border-solid text-sm-regular focus-within:ring-4 focus-within:ring-color-1 mb-[78px]">
          <input
            type="text"
            placeholder="Enter Your Email... "
            className="w-[calc(100%_-_100px)] h-full pl-2 rounded-full text-text focus:outline-none placeholder:text-text"
          />
          <button className="absolute top-[10px] right-[10px] bottom-[10px] py-[12px] px-6 text-white bg-color-1 rounded-md hover:bg-color-1/80 duration-300">
            Submit
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center w-[1070px] mx-auto pb-[60px]">
        <div className="">
          <Image
            src={postImage}
            alt="postNN"
            width={520}
            height={400}
            className="rounded-lg"
            // className="aspect-square object-cover"
          />
        </div>
        <div className="pl-[93px]">
          <div className="flex items-center">
            <h1 className="text-sm-medium text-color-1 pr-[20px]">EDUCATION</h1>
            <p className="text-md-regular text-text">December 16, 2022</p>
          </div>
          <div>
            <h1 className="text-[#242239] text-2xl-medium py-[20px]">
              Eco-Education in Our Lives: We Can Change the Future
            </h1>
            <p className="text-text text-sm-medium pb-[20px]">
              Our features, journey, tips and us being us. Lorem ipsum dolor sit
              amet, accumsan in, tempor dictum neque.
            </p>
          </div>
          <button className="py-4 px-7 bg-color-1/[0.1] rounded-md  text-color-1">
            Read More
          </button>
        </div>
      </div>
    </div>
  </>
);

export default BlogPage;
