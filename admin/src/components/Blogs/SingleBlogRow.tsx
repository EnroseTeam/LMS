import { FC } from "react";

import Image from "next/image";

import { HiOutlineTrash } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import { IBlog } from "@/interfaces/blogs";

interface SingleBlogRowProps {
  blog: IBlog;
}

const SingleBlogRow: FC<SingleBlogRowProps> = ({ blog }) => (
  <>
    <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark md:px-6 2xl:px-7.5">
      <div className="col-span-2 flex items-center">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="min-h-12.5 min-w-15 max-h-12.5 max-w-15 rounded-md overflow-hidden">
            <Image
              width={120}
              height={100}
              src={blog.picture}
              alt="Product"
              className="w-full h-full object-cover aspect-[1.2/1]"
            />
          </div>
          <p className="font-medium text-sm text-black dark:text-white">
            {blog.name}
          </p>
        </div>
      </div>
      <div className="col-span-1 hidden items-center sm:flex">
        <p className="font-medium text-sm text-black dark:text-white">
          {blog.description}
        </p>
      </div>
      <div className="col-span-1 flex items-center">
        <p className="font-medium text-sm text-black dark:text-white">
          {new Date(blog.updatedAt).toLocaleDateString()}
        </p>
      </div>
      <div className="col-span-1 flex items-center">
        <p className="font-medium text-sm text-black dark:text-white">
          {blog.user.fullName}
        </p>
      </div>
      <div className="col-span-1 flex items-center gap-3 pl-4">
        <FiEdit size={20} className="text-meta-5" />
        <HiOutlineTrash size={23} className="text-meta-1" />
      </div>
    </div>
  </>
);

export default SingleBlogRow;
