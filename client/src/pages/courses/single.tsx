import Breadcrumbs from '@/components/Breadcrumbs';
import RatingStar from '@/components/RatingStar';
import { ICourseCategory } from '@/interfaces/courses';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { FC } from 'react';

import {
  BsPersonWorkspace,
  BsClock,
  BsCollectionPlay,
  BsBarChart,
  BsTranslate,
  BsInfinity,
  BsInstagram,
  BsPlay,
} from 'react-icons/bs';
import { HiOutlinePuzzle } from 'react-icons/hi';
import { TfiMedall } from 'react-icons/tfi';
import { ImFacebook, ImTwitter, ImLinkedin2 } from 'react-icons/im';

import placeholder from '@/assets/placeholder.png';
import shape from '@/assets/hero-shape.svg';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';

interface SingleCoursePageProps {
  categories: ICourseCategory[];
}

export const getServerSideProps: GetServerSideProps<SingleCoursePageProps> = async () => {
  const res = await axios.get('http://localhost:5000/api/courses/categories');
  return {
    props: {
      categories: res.data.body,
    },
  };
};

const SingleCoursePage: FC<SingleCoursePageProps> = () => (
  <>
    <div className="bg-head pb-[60px] relative overflow-hidden">
      <Breadcrumbs
        transparent
        breadcrumbItems={[
          { title: 'Сургалтууд', link: '/courses' },
          { title: 'ReactJS', link: '/courses/single' },
        ]}
      />

      <div className="container absolute w-full top-8 bottom-[62px] right-0 left-0 pointer-events-none">
        <Image src={shape} alt="Shape" className="w-full aspect-auto object-contain" />
      </div>

      <div className="container grid grid-cols-2 gap-[145px] text-icon">
        <div className="flex flex-col gap-[30px]">
          {/* Course Head */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="uppercase py-2 px-4 bg-color-6 text-head text-[11px] font-medium leading-[13px] rounded-[60px]">
                Best Seller
              </div>
              <div className="uppercase py-2 px-4 bg-color-4 text-white text-[11px] font-medium leading-[13px] rounded-[60px]">
                New
              </div>
              <div className="uppercase py-2 px-4 bg-color-1 text-white text-[11px] font-medium leading-[13px] rounded-[60px]">
                Popular
              </div>
            </div>

            <h1 className="text-3xl-bold text-white">
              User Experience Design Essentials - Adobe XD UI UX Design
            </h1>

            <p className="text-icon text-md-regular">
              Use XD to get a job in UI Design, User Interface, User Experience design, UX design &
              Web Design
            </p>

            <div className="flex items-center gap-7">
              <div className="flex items-center gap-[10px]">
                <p className="text-[#E59819] text-sm-medium mt-[2px]">4.5</p>
                <div className="flex items-center gap-1">
                  <RatingStar className="fill-[#E59819]" />
                  <RatingStar className="fill-[#E59819]" />
                  <RatingStar className="fill-[#E59819]" />
                  <RatingStar className="fill-[#E59819]" />
                  <RatingStar className="fill-[#E59819]" />
                </div>
                <p className="text-icon text-xs-regular">(1991)</p>
              </div>

              <div className="flex items-center gap-[10px]">
                <BsPersonWorkspace size={16} />
                <p className=" text-sm-regular">853 enrolled on this course</p>
              </div>

              <div className="flex items-center gap-[10px]">
                <BsClock size={16} />
                <p className=" text-sm-regular">Last updated 11/2021</p>
              </div>
            </div>

            <div className="flex items-center gap-[10px]">
              <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
                <Image
                  src={placeholder}
                  alt="Ali Tufan"
                  className="w-full object-cover aspect-square"
                />
              </div>
              <p className="text-sm-regular">Ali Tufan</p>
            </div>
          </div>

          {/* Course Includes */}
          <div className="flex flex-col text-white text-md-regular leading-[40px]">
            <div className="flex items-center justify-between border-b border-b-white/[.15]">
              <span className="flex items-center gap-[10px]">
                <BsCollectionPlay size={16} />
                <h1>Lessons</h1>
              </span>

              <h2>20</h2>
            </div>

            <div className="flex items-center justify-between border-b border-b-white/[.15]">
              <span className="flex items-center gap-[10px]">
                <HiOutlinePuzzle size={16} />
                <h1>Quizzes</h1>
              </span>

              <h2>3</h2>
            </div>

            <div className="flex items-center justify-between border-b border-b-white/[.15]">
              <span className="flex items-center gap-[10px]">
                <BsClock size={16} />
                <h1>Duration</h1>
              </span>

              <h2>13 hours</h2>
            </div>

            <div className="flex items-center justify-between border-b border-b-white/[.15]">
              <span className="flex items-center gap-[10px]">
                <BsBarChart size={16} />
                <h1>Skill level</h1>
              </span>

              <h2>Beginner</h2>
            </div>

            <div className="flex items-center justify-between border-b border-b-white/[.15]">
              <span className="flex items-center gap-[10px]">
                <BsTranslate size={16} />
                <h1>Language</h1>
              </span>

              <h2>English</h2>
            </div>

            <div className="flex items-center justify-between border-b border-b-white/[.15]">
              <span className="flex items-center gap-[10px]">
                <TfiMedall size={16} />
                <h1>Certificate</h1>
              </span>

              <h2>Yes</h2>
            </div>

            <div className="flex items-center justify-between border-b border-b-white/[.15]">
              <span className="flex items-center gap-[10px]">
                <BsInfinity size={16} />
                <h1>Full lifetime access</h1>
              </span>

              <h2>Yes</h2>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-0 text-sm text-icon">
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

        <div className="flex flex-col gap-[30px]">
          <div className="rounded-lg overflow-hidden w-full relative">
            <Image src={placeholder} alt="Video" className="w-full aspect-auto object-contain" />

            <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] p-5 bg-white rounded-full cursor-pointer">
              <BsPlay size={40} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h1 className="text-white text-2xl-medium">$96.00</h1>
            <h3 className="text-icon text-md-medium">$76.00</h3>
          </div>

          <div className="grid grid-cols-2 gap-[35px]">
            <Button className="bg-color-1 text-white hover:bg-color-1/70 duration-300 ">
              Add To Cart
            </Button>
            <Button className="border-2 border-color-6 text-color-6 hover:bg-color-6/90 hover:text-white duration-300 hover:border-transparent">
              Buy Now
            </Button>
          </div>

          <p className="text-icon text-sm-regular">30-Day Money-Back Guarantee</p>
        </div>
      </div>
    </div>
    <div className="container py-[120px] grid grid-cols-3">
      <div></div>

      <div className="col-span-2">
        <h1 className="text-head text-xl font-medium leading-[23px]">Description</h1>
      </div>
    </div>
  </>
);

export default SingleCoursePage;
