import { FC } from "react";
import { axiosInstance } from "@/utils/axiosInstance";

import { IBlog } from "@/interfaces/blogs";
import { GetStaticProps } from "next";
import SingleBlogRow from "@/components/Blogs/SingleBlogRow";
import { useRouter } from "next/router";

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

const AdminBlogPage: FC<AdminBlogsPageProps> = ({ blogs }) => {
  const router = useRouter();

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark m-6">
      <div className="flex justify-between items-center py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-bold text-black dark:text-white">Бүх Мэдээ</h4>
        <button
          onClick={(): void => {
            router.push({ pathname: "/blogs/create" });
          }}
          className="border border-primary rounded-md bg-transparent py-3 px-5 text-sm text-center font-medium text-primary hover:bg-opacity-90  dark:border-meta-2 dark:text-meta-2 hover:bg-primary hover:border-primary hover:text-white dark:hover:bg-meta-2 dark:hover:text-primary duration-300"
        >
          Мэдээ нэмэх
        </button>
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
  );
};

export default AdminBlogPage;
