import "swiper/css/pagination";
import "swiper/css";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Breadcrumbs from "@/components/global/Breadcrumbs";
import Image from "next/image";
import { FC } from "react";
import Link from "next/link";
import { ImFacebook, ImLinkedin2, ImTwitter } from "react-icons/im";
import { BsArrowLeft, BsArrowRight, BsInstagram } from "react-icons/bs";
import axios from "axios";
import { IBlog } from "@/interfaces/blogs";
import { GetServerSideProps } from "next";
import { axiosInstance } from "@/utils/axiosInstance";
import RelatedBlogCard from "@/components/Blogs/RelateadBlogCard";

interface SingleBlogPageProps {
  blog: IBlog;
  blogs: IBlog[];
}

export const getServerSideProps: GetServerSideProps<SingleBlogPageProps> = async ({ params }) => {
  const [blogRes, blogsRes] = await axios.all([
    axiosInstance.get(`/api/blogs/${params?.id}`),
    axiosInstance.get("/api/blogs?pageSize=6"),
  ]);
  return {
    props: {
      blog: blogRes.data.body,
      blogs: blogsRes.data.body,
    },
  };
};

const SingleBlogPage: FC<SingleBlogPageProps> = ({ blog, blogs }) => (
  <>
    <Breadcrumbs breadcrumbItems={[{ title: "Мэдээ", link: "/blogs" }]} />
    <div>
      <div className="lg:max-w-[1100px] mx-auto lg:px-[120px] text-center bg-white">
        <h1 className="text-head text-4x-bold ">{blog.name}</h1>
        <p className="text-lg-regular text-text pb-10 lg:pb-[90px]">{blog.updatedAt}</p>
      </div>
      <div className="rounded-lg overflow-hidden group relative lg:px-[315px] ">
        <Image
          src={blog.picture}
          alt="postSingle"
          width={1290}
          height={600}
          className="w-full items-center object-cover aspect-[2/1]"
        />
      </div>
    </div>
    <div className="mx-auto px-12 lg:px-[335px]">
      <div>
        <h3 className="text-head text-xl-medium pt-8 lg:pt-16">{blog.name}</h3>
        <div
          className="[&>p]:py-4 lg:[&>p]:py-[30px] [&>p]:text-text [&>p]:text-md-regular [&>ul]:list-disc lg:[&>ul]:space-y-[30px] [&>ul]:ml-4 [&>blockquote]:text-text [&>blockquote]:text-xl-medium [&>blockquote]:my-10  [&>blockquote]:pl-20 [&>blockquote]:border-l-8 [&>blockquote]:border-blue-700 [&>img]:w-full [&>img]:object-cover [&>img]:aspect-[1.3] [&>img]:rounded-2xl"
          dangerouslySetInnerHTML={{ __html: blog.text }}
        />

        <div className="flex flex-col lg:flex-row items-center justify-between lg:py-[30px]">
          <div className="flex items-center justify-between gap-4 text-sm">
            <p className="text-lg-medium">Share</p>
            <Link
              className="text-text p-4 rounded-full hover:bg-text/40 duration-300"
              href="https://facebook.com"
              target="_blank"
            >
              <ImFacebook />
            </Link>
            <Link
              className="text-text p-4 rounded-full hover:bg-text/40 duration-300"
              href="https://twitter.com"
              target="_blank"
            >
              <ImTwitter />
            </Link>
            <Link
              className="text-text p-4 rounded-full hover:bg-text/40 duration-300"
              href="https://instagram.com"
              target="_blank"
            >
              <BsInstagram />
            </Link>
            <Link
              className="text-text p-4 rounded-full hover:bg-text/40 duration-300"
              href="https://linkedin.com"
              target="_blank"
            >
              <ImLinkedin2 />
            </Link>
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col lg:flex-row gap-2">
              <Link
                className="bg-text/40 text-center py-2 px-4 text-black rounded-full hover:bg-color-2 hover:text-white duration-300"
                href="/"
                target="_blank"
              >
                Courses
              </Link>
              <Link
                className="bg-text/40 py-2 px-4 text-black rounded-full hover:bg-color-2 hover:text-white duration-300"
                href="/"
                target="_blank"
              >
                Learn
              </Link>
            </div>
            <div className="flex flex-col lg:flex-row gap-2">
              <Link
                className="bg-text/40 py-2 px-4 text-black rounded-full hover:bg-color-2 hover:text-white duration-300"
                href="/"
                target="_blank"
              >
                Online
              </Link>
              <Link
                className="bg-text/40 py-2 px-4 text-black rounded-full hover:bg-color-2 hover:text-white duration-300"
                href="/"
                target="_blank"
              >
                LMS
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t-2 pb-2 lg:py-[30px]" />
        <div className="grid grid-cols-10">
          <div className="col-span-2 lg:col-span-1 flex justify-center">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={
                  "https://team-enrose-s3-bucket.s3.ap-northeast-1.amazonaws.com/images/wdxL7_LiT67eRzHPncQPh-html5-css3.jpg"
                }
                alt="postSingle"
                width={500}
                height={500}
                className="w-full h-full aspect-square object-cover"
              />
            </div>
          </div>
          <div className="col-span-8 lg:col-span-9">
            <h3 className="text-head text-lg-medium pb-[5px]">Ганболд</h3>
            <p className="text-text text-sm-regular pb-6">Программист</p>
            <p className="text-text text-md-regular pb-[30px]">
              Энэ нь статик вэб хуудас болон React-д суурилсан онлайн програмуудыг хурдан бөгөөд
              хялбар бүтээх JavaScript-ийн хүрээ юм.
            </p>
          </div>
        </div>
        <div className="border-t-2 lg:py-[30px]" />
      </div>
    </div>
    <div className="bg-bg-1 px-8 pb-10 lg:pb-[120px] lg:px-[300px]">
      <h1 className="text-center text-head text-3xl-bold pt-16 lg:pt-[120px] pb-[9px]">
        Холбоотой мэдээнүүд
      </h1>
      <p className="text-center text-text text-md-regular pb-[60px]">мэдээ, мэдээлэл</p>
      <Swiper
        grabCursor={true}
        spaceBetween={8}
        slidesPerView={1}
        breakpoints={{
          1024: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        }}
        navigation={{
          nextEl: ".slider-style-2-next",
          prevEl: ".slider-style-2-prev",
        }}
        pagination={{ clickable: true, el: ".slider-style-2-pagination" }}
        modules={[Navigation, Pagination]}
      >
        {blogs.map((blog) => (
          <SwiperSlide key={blog._id}>
            <RelatedBlogCard blog={blog} />
          </SwiperSlide>
        ))}

        <div className="flex items-center justify-center gap-5 mt-[30px] lg:mt-[60px]">
          <button className="slider-style-2-prev">
            <BsArrowLeft />
          </button>
          <div className="slider-style-2-pagination" />
          <button className="slider-style-2-next">
            <BsArrowRight />
          </button>
        </div>
      </Swiper>
    </div>
  </>
);

export default SingleBlogPage;
