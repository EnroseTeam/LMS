import { FC } from "react";
import Image from "next/image";
import { IBlog } from "@/interfaces/blogs";

interface BlogCardProps {
  blog: IBlog;
}

const BlogCard: FC<BlogCardProps> = ({ blog }) => (
  <div className="flex items-center justify-center w-[1070px] mx-auto pb-[60px]">
    <div className="">
      <Image
        src={blog.picture}
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
        <span className="text-md-regular text-text">
          {new Date(blog.updatedAt).toLocaleDateString()}
        </span>
      </div>
      <div>
        <h1 className="text-[#242239] text-2xl-medium py-[20px]">
          {blog.name}
        </h1>
        <p className="text-text text-sm-medium pb-[20px]">{blog.description}</p>
      </div>
      <button className="py-4 px-7 bg-color-1/[0.1] rounded-md  text-color-1">
        Цааш унших...
      </button>
    </div>
  </div>
);

export default BlogCard;
