import React, { FC } from "react";
import Image from "next/image";

import Link from "next/link";
import { HiOutlineArrowUpRight } from "react-icons/hi2";
import { IBlog } from "@/interfaces/blogs";

interface NewsSectionProps {
  blogs: IBlog[];
}

const NewsSection: FC<NewsSectionProps> = ({ blogs }) => (
  <div className="container text-head mt-[60px] mb-[69px] lg:mt-[120px] lg:mb-[112px]">
    <div className="flex flex-col items-start mb-[30px] lg:flex-row lg:items-center lg:justify-between lg:mb-[51px] gap-[30px]">
      <div>
        <h1 className="text-3xl-bold mb-[9px]">Мэдээ мэдээлэл</h1>
        <p className="text-text font-md-regular">Хамгийн сүүлийн үеийн мэдээ</p>
      </div>

      <Link className="arrow-btn-1" href="/blogs">
        Бүх мэдээ
        <HiOutlineArrowUpRight size={20} />
      </Link>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[20px] lg:gap-[30px]">
      {blogs.slice(0, 2).map((blog) => (
        <div key={blog._id}>
          <Link
            href={`/blogs/${blog._id}`}
            className="block w-full overflow-hidden rounded-lg mb-5 group relative"
          >
            <Image
              src={blog.picture}
              alt={blog.name}
              width={800}
              height={800}
              className="w-full aspect-[1.2/1] object-cover group-hover:scale-110 duration-300"
            />

            <div className="absolute top-0 right-0 left-0 w-full h-full group-hover:bg-head/50 duration-300" />
          </Link>
          <span className="block uppercase text-color-1 text-sm-medium mb-[10px]">Education</span>
          <Link
            href={`/blogs/${blog._id}`}
            className="block text-[#242239] text-2xl-medium leading-9 mb-[10px] hover:text-[#242239]/70 duration-300"
          >
            {blog.name}
          </Link>
          <span className="text-text block text-md-regular">
            {new Date(blog.updatedAt).toLocaleDateString("en-US")}
          </span>
        </div>
      ))}

      <div className="flex flex-col gap-[30px]">
        {blogs.slice(2).map((blog) => (
          <div key={blog._id} className="grid grid-cols-3 items-center gap-4">
            <Link
              href={`/blogs/${blog._id}`}
              className="block w-full rounded-lg overflow-hidden relative group"
            >
              <Image
                alt={blog.name}
                src={blog.picture}
                width={300}
                height={300}
                className="w-full aspect-square object-cover group-hover:scale-110 duration-300"
              />

              <div className="absolute top-0 right-0 left-0 w-full h-full group-hover:bg-head/50 duration-300" />
            </Link>

            <div className="col-span-2">
              <span className="block uppercase text-color-1 text-xs-medium mb-[10px]">Courses</span>
              <Link
                className="block text-lg-medium mb-[10px] w-[20ch] hover:text-head/70 duration-300"
                href={`/blogs/${blog._id}`}
              >
                {blog.name}
              </Link>
              <span className="block text-text text-xs-regular">
                {new Date(blog.updatedAt).toLocaleDateString("en-US")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default NewsSection;
