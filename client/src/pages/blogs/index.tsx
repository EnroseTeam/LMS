import React, { FC } from "react";
import Breadcrumbs from "@/components/global/Breadcrumbs";
import BlogCard from "@/components/Blogs/blogCard";
import { IBlog } from "@/interfaces/blogs";
import { GetServerSideProps } from "next";
import Pagination from "@/components/global/Pagination";
import { axiosInstance } from "@/utils/axiosInstance";

interface BlogPageProps {
  blogs: IBlog[];
  totalPages: number;
  totalBlogs: number;
}

export const getServerSideProps: GetServerSideProps<BlogPageProps> = async ({
  query,
}) => {
  const { page = "1", pageSize = "2" } = query;
  const blogRes = await axiosInstance.get(
    `/api/blogs?page=${page}&pageSize=${pageSize}`
  );
  console.log("blogs.length", blogRes.data.body.length);
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
    <Breadcrumbs breadcrumbItems={[{ title: "Мэдээ", link: "/blogs" }]} />
    <div className="container mb lg:max-w-[1100px] mx-auto">
      <div className="flex flex-col items-center px-5 justify-center lg:px-[120px]">
        <h1 className="text-4x-bold text-head lg:pt-[90px] pb-1">
          Онцлох мэдээ
        </h1>
        <p className="lg-regular text-text pb-[30px]">мэдээ, мэдээлэл</p>
        <div className="relative bg-white w-full h-[60px] rounded-md pl-[30px] border border-solid text-sm-regular focus-within:ring-4 focus-within:ring-color-1 mb-8 lg:mb-[78px]">
          <input
            type="text"
            placeholder="Мэдээ хайх ... "
            className="w-[calc(100%_-_100px)] h-full pl-2 rounded-full text-text focus:outline-none placeholder:text-text"
          />
          <button className="absolute top-[10px] right-[10px] bottom-[10px] lg:py-[12px] px-6 text-white bg-color-1 rounded-md hover:bg-color-1/80 duration-300">
            Хайх
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-16 px-5">
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
