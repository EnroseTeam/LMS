import { FC } from "react";
import { axiosInstance } from "@/utils/axiosInstance";

import { IBlog } from "@/interfaces/blogs";
import { GetStaticProps } from "next";
import SingleBlogRow from "@/components/Blogs/SingleBlogRow";

interface AdminBlogsPageProps {
  blogs: IBlog[];
}

export const getStaticProps: GetStaticProps<AdminBlogsPageProps> = async () => {
  const blogRes = await axiosInstance.get("/api/blogs");
  return {
    props: {
      blogs: blogRes.data.body,
    },
  };
};

const AdminBlogPage: FC<AdminBlogsPageProps> = ({ blogs }) => (
  <>
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark m-6">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-bold text-black dark:text-white">
          Бүх Мэдээ
        </h4>
      </div>
      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark  md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Гарчиг</p>
        </div>

        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Тайлбар</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Огноо</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Нийтлэгч</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Засах/Устгах</p>
        </div>
      </div>
      {blogs.map((blog) => (
        <SingleBlogRow blog={blog} key={blog._id} />
      ))}
    </div>
  </>
);

export default AdminBlogPage;
