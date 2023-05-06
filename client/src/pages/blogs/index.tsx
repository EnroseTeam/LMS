import React, { FC } from "react";
import Breadcrumbs from "@/components/global/Breadcrumbs";
import BlogCard from "@/components/Blogs/blogCard";
import { IBlog } from "@/interfaces/blogs";
import { GetServerSideProps } from "next";
import axios from "axios";
import Pagination from "@/components/global/Pagination";

interface BlogPageProps {
  blogs: IBlog[];
  totalPages: number;
  totalBlogs: number;
}

export const getServerSideProps: GetServerSideProps<BlogPageProps> = async ({
  query,
}) => {
  const { page = "1", pageSize = "2" } = query;
  const blogRes = await axios.get(
    `http://localhost:5000/api/blogs?page=${page}&pageSize=${pageSize}`
  );
  return {
    props: {
      blogs: blogRes.data.body,
      totalPages: blogRes.data.totalPage,
      totalBlogs: blogRes.data.totalBlogs,
    },
  };
};

const BlogPage: FC<BlogPageProps> = ({ blogs, totalPages, totalBlogs }) => (
  <>
    <div className="max-w-[1100px] mx-auto">
      <Breadcrumbs breadcrumbItems={[{ title: "Мэдээ", link: "/blogs" }]} />
      <div className="flex flex-col items-center justify-center px-[120px]">
        <h1 className="text-4x-bold text-head pt-[90px] pb-1">Онцлох мэдээ</h1>
        <p className="lg-regular text-text pb-[30px]">
          We’re on a mission to deliver engaging, curated courses at a
          reasonable price.
        </p>
        <div className="relative bg-white w-full h-[60px]  rounded-md pl-[30px border border-solid text-sm-regular focus-within:ring-4 focus-within:ring-color-1 mb-[78px]">
          <input
            type="text"
            placeholder="Мэдээ хайх ... "
            className="w-[calc(100%_-_100px)] h-full pl-2 rounded-full text-text focus:outline-none placeholder:text-text"
          />
          <button className="absolute top-[10px] right-[10px] bottom-[10px] py-[12px] px-6 text-white bg-color-1 rounded-md hover:bg-color-1/80 duration-300">
            Хайх
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-16">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>

      <div className="mb-[120px] mt-[60px]">
        {totalBlogs > 0 && <Pagination totalPage={totalPages} />}
      </div>
    </div>
  </>
);

export default BlogPage;
