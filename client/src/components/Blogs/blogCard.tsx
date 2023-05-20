import { FC } from "react";
import Image from "next/image";
import { IBlog } from "@/interfaces/blogs";
import Link from "next/link";

interface BlogCardProps {
  blog: IBlog;
}

const BlogCard: FC<BlogCardProps> = ({ blog }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-[93px] items-center">
    <Link
      target="_blank"
      href={`blogs/${blog._id}`}
      className="rounded-lg overflow-hidden group relative"
    >
      <Image
        src={blog.picture}
        alt="postNN"
        width={520}
        height={400}
        className="w-full object-cover aspect-[1.3/1]"
      />
      <div className="absolute w-full h-full top-0 right-0 left-0 bottom-0 bg-head/0 opacity-0 group-hover:bg-head/50 group-hover:opacity-100 duration-300 cursor-pointer" />
    </Link>
    <div>
      <div className="flex items-center">
        <h1 className="text-sm-medium text-color-1 pr-[20px]">EDUCATION</h1>
        <span className="text-md-regular text-text">
          {new Date(blog.updatedAt).toLocaleDateString()}
        </span>
      </div>
      <div>
        <h1 className="text-[#242239] text-2xl-medium py-[20px]">
          <Link
            href={`blogs/${blog._id}`}
            className="block text-head hover:text-head/80 duration-300 mb-[5px]"
          >
            {blog.name}
          </Link>
        </h1>
        <p className="text-text text-sm-medium pb-[20px]">{blog.description}</p>
      </div>
      <Link href={`blogs/${blog._id}`}>
        <button className="py-4 px-7 btn-4">Цааш унших...</button>
      </Link>
    </div>
  </div>
);

export default BlogCard;
