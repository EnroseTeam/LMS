import { ICourseCategory } from "@/interfaces/courses";
import axios from "axios";
import { GetServerSideProps } from "next";
import { FC } from "react";
import Breadcrumbs from "@/components/global/Breadcrumbs";
import BgShape from "../../assets/hero-shape.svg";
import Image from "next/image";
import Button from "@/components/global/Button";
import Link from "next/link";
import placeholder from "../../assets/placeholder.png";
import RatingStar from "@/components/global/RatingStar";

import { AiOutlineComment, AiOutlineUser } from "react-icons/ai";
import { BiRightArrow } from "react-icons/bi";
import { ImFacebook, ImTwitter, ImLinkedin2 } from "react-icons/im";
import { BsInstagram } from "react-icons/bs";

interface CoursesPageProps {
  categories: ICourseCategory[];
}

export const getServerSideProps: GetServerSideProps<
  CoursesPageProps
> = async () => {
  const res = await axios.get("http://localhost:5000/api/courses/categories");
  return {
    props: {
      categories: res.data.body,
    },
  };
};

const SingleInstructorPage: FC = () => (
  <>
    <Breadcrumbs
      breadcrumbItems={[
        { title: "Багш, сургагч нар", link: "/instructors" },
        { title: "Ali Tufan", link: "/instructors/instructor" },
      ]}
    />
    <div className="container relative bg-color-1 pt-[69px] rounded-lg text-white mb-[30px]">
      <div className="px-[325px]">
        <div className="rounded-full overflow-hidden w-[127px] h-[127px] mb-[20px]">
          <Image
            src={placeholder}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="font-[700] text-[30px] leading-[45px]">Ali Tufan</h1>
        <p className="text-md-regular mb-[10px]">UX Designer</p>

        <div className="flex items-center gap-4 pb-[30px]">
          <span className="flex items-center gap-[5px]">
            <RatingStar className="fill-[#E59819]" />
            <p className="text-[#E59819] text-sm-medium">4.5</p>
            <span className="text-xs-regular">Instructors Rating</span>
          </span>

          <span className="flex items-center gap-[10px]">
            <AiOutlineComment />
            <span className="text-xs-regular">23,987 Reviews</span>
          </span>

          <span className="flex items-center gap-[10px]">
            <AiOutlineUser />
            <span className="text-xs-regular">692 Students</span>
          </span>

          <span className="flex items-center gap-[10px]">
            <BiRightArrow />
            <span className="text-xs-regular">23,987 Reviews</span>
          </span>
        </div>

        <div className="flex items-center pb-[76px]">
          <Button className="bg-color-6 text-color-2 text-base-medium">
            Send Message
          </Button>
          <div className="flex items-center gap-6 ml-[30px]">
            <Link
              className=" p-4 rounded-full hover:bg-white/10 hover:text-white duration-300"
              href="/"
            >
              <ImFacebook />
            </Link>
            <Link
              className=" p-4 rounded-full hover:bg-white/10 hover:text-white duration-300"
              href="/"
            >
              <ImTwitter />
            </Link>
            <Link
              className=" p-4 rounded-full hover:bg-white/10 hover:text-white duration-300"
              href="/"
            >
              <BsInstagram />
            </Link>
            <Link
              className=" p-4 rounded-full hover:bg-white/10 hover:text-white duration-300"
              href="/"
            >
              <ImLinkedin2 />
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div className="absolute container top-8 right-0 left-0 pointer-events-none ">
      <Image src={BgShape} alt="" className="w-full" />
    </div>

    <div className="container px-[325px]">
      <div className="flex gap-[30px]">
        <button>Overview</button>
        <button>Courses</button>
      </div>
    </div>
  </>
);

export default SingleInstructorPage;
