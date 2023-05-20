import { AuthContext } from "@/contexts/AuthContext";
import { DashboardSidebarContext } from "@/contexts/DashboardSidebarContext";
import DashboardLayout from "@/layouts/DashboardLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { ReactNode, useContext, useEffect, useState } from "react";

import { AiOutlineTags, AiOutlinePlayCircle, AiOutlineComment } from "react-icons/ai";
import { SlGraduation } from "react-icons/sl";
import { BsFileEarmarkText, BsClock, BsBarChart } from "react-icons/bs";

import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";

import plcHolder from "@/assets/placeholder.png";
import DashboardBoxSkeleton from "@/components/Skeletons/DashboardBoxSkeleton";
import useSwr from "swr";
import { fetcher } from "@/utils/fetcher";
import { IInstructor } from "@/interfaces/user";
import { ICourse, ICourseReview } from "@/interfaces/courses";
import DashboardLatestCourseSkeleton from "@/components/Skeletons/DashboardLatestCourseSkeleton";
import RatingStar from "@/components/global/RatingStar";
import DashboardLatestReviewSkeleton from "@/components/Skeletons/DashboardLatestReviewSkeleton";

const InstructorDashboardPage: NextPageWithLayout = () => {
  const { user } = useContext(AuthContext);

  const { sidebarShow } = useContext(DashboardSidebarContext);

  const { data: instructor, isLoading: instructorLoading } = useSwr(
    user && `/api/instructors/${user._id}`,
    fetcher<{ body: IInstructor }>
  );

  const { data: instructorReviews, isLoading: reviewsLoading } = useSwr(
    `/api/courses/reviews/instructor`,
    fetcher<{ body: ICourseReview[] }>
  );

  const [totalSales, setTotalSales] = useState<number>(0);
  const [totalCourses, setTotalCourses] = useState<number>(0);
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [totalReviews, setTotalReviews] = useState<number>(0);

  const [latestCourses, setLatestCourses] = useState<ICourse[]>([]);
  const [latestReviews, setLatestReviews] = useState<ICourseReview[]>([]);

  useEffect(() => {
    if (!instructorLoading && instructor && instructorReviews) {
      setTotalCourses(instructor.body.ownCourses.length);
      let newSales = 0;
      let newStudents = 0;
      let newReviews = 0;
      for (const course of instructor.body.ownCourses) {
        if (course.discountPrice > 0) newSales += course.discountPrice;
        else newSales += course.price;

        newStudents += course.purchaseCount;
        newReviews += course.reviews.length;
      }

      setTotalSales(newSales);
      setTotalStudents(newStudents);
      setTotalReviews(newReviews);
      setLatestCourses(
        instructor.body.ownCourses
          .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
          .slice(0, 4)
      );

      setLatestReviews(
        instructorReviews.body
          .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
          .slice(0, 4)
      );
    }
  }, [instructor, instructorLoading, instructorReviews]);

  return (
    <>
      <h1 className="text-head text-3xl-bold mb-[9px]">Хянах Самбар</h1>
      <p className="text-text text-md-regular mb-[60px]">Таны сургалтуудын талаарх мэдээлэл</p>

      {instructorLoading && (
        <div
          className={classNames(
            "grid gap-[30px] mb-[30px] grid-cols-1 sm:grid-cols-2",
            { "lg:grid-cols-2": sidebarShow },
            { "lg:grid-cols-4": !sidebarShow }
          )}
        >
          {Array.from(Array(4)).map((val, index) => (
            <DashboardBoxSkeleton key={index} />
          ))}
        </div>
      )}
      {!instructorLoading && instructor && (
        <div
          className={classNames(
            "grid gap-[30px] mb-[30px] grid-cols-1 sm:grid-cols-2",
            { "lg:grid-cols-2": sidebarShow },
            { "lg:grid-cols-4": !sidebarShow }
          )}
        >
          <div className="bg-white rounded-2xl shadow-shadow-dashboard py-[35px] px-[30px] flex items-center justify-between  hover:bg-color-1 duration-300 group">
            <div className="space-y-[14px]">
              <h4 className="text-text text-md-medium group-hover:text-white duration-300">
                Нийт худалдаа
              </h4>
              <h1 className="text-head text-2xl-bold group-hover:text-white duration-300">
                ₮{totalSales}
              </h1>
            </div>

            <div className="text-color-1 group-hover:text-white duration-300">
              <AiOutlineTags size={40} />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-shadow-dashboard py-[35px] px-[30px] flex items-center justify-between  hover:bg-color-1 duration-300 group">
            <div className="space-y-[14px]">
              <h4 className="text-text text-md-medium group-hover:text-white duration-300">
                Нийт сургалтууд
              </h4>
              <h1 className="text-head text-2xl-bold group-hover:text-white duration-300">
                {totalCourses}
              </h1>
            </div>

            <div className="text-color-1 group-hover:text-white duration-300">
              <AiOutlinePlayCircle size={40} />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-shadow-dashboard py-[35px] px-[30px] flex items-center justify-between  hover:bg-color-1 duration-300 group">
            <div className="space-y-[14px]">
              <h4 className="text-text text-md-medium group-hover:text-white duration-300">
                Нийт сурагчид
              </h4>
              <h1 className="text-head text-2xl-bold group-hover:text-white duration-300">
                {totalStudents}
              </h1>
            </div>

            <div className="text-color-1 group-hover:text-white duration-300">
              <SlGraduation size={40} />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-shadow-dashboard py-[35px] px-[30px] flex items-center justify-between  hover:bg-color-1 duration-300 group">
            <div className="space-y-[14px]">
              <h4 className="text-text text-md-medium group-hover:text-white duration-300">
                Нийт сэтгэгдлүүд
              </h4>
              <h1 className="text-head text-2xl-bold group-hover:text-white duration-300">
                {totalReviews}
              </h1>
            </div>

            <div className="text-color-1 group-hover:text-white duration-300">
              <AiOutlineComment size={40} />
            </div>
          </div>
        </div>
      )}

      <div
        className={classNames(
          "grid gap-[30px] grid-cols-1",
          { "lg:grid-cols-1 xl:grid-cols-2": sidebarShow },
          { "lg:grid-cols-2 2xl:grid-cols-3": !sidebarShow }
        )}
      >
        {instructorLoading && <DashboardLatestCourseSkeleton />}
        {!instructorLoading && instructor && (
          <div className="bg-white shadow-shadow-dashboard rounded-2xl">
            <div className="border-b border-border-1 px-[30px] py-5 flex items-center justify-between">
              <h1 className="text-head text-lg-medium">Сүүлд нэмэгдсэн сургалтууд</h1>
              <Link
                className="underline text-color-1 text-sm-medium hover:text-color-1/70 duration-300"
                href={"/instructors/dashboard/my-courses"}
              >
                Бүгдийг харах
              </Link>
            </div>

            <div className="p-[30px] space-y-5">
              {latestCourses.map((course) => (
                <div
                  key={course._id}
                  className="pb-5 border-b border-border-1 grid grid-cols-5 gap-[15px]"
                >
                  <Link
                    href={"/"}
                    className="rounded-lg overflow-hidden relative group w-full block"
                  >
                    <Image
                      src={course.picture}
                      width={500}
                      height={500}
                      alt={course.name}
                      className="w-full h-full object-cover aspect-[1.13/1]"
                    />
                    <div className="absolute top-0 left-0 right-0 bottom-0 w-full group-hover:bg-color-2/50 duration-300" />
                  </Link>

                  <div className="col-span-4 space-y-[15px]">
                    <h2 className="text-head text-md-medium">{course.name}</h2>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-text text-sm-regular">
                        <BsFileEarmarkText size={16} />
                        <span>{course.lessonCount} хичээл</span>
                      </div>

                      <div className="flex items-center gap-1 text-text text-sm-regular">
                        <BsClock size={16} />
                        <span>
                          {course.totalLessonLength.hour > 0 &&
                            `${course.totalLessonLength.hour} цаг `}
                          {course.totalLessonLength.minute > 0 &&
                            `${course.totalLessonLength.minute} минут`}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-text text-sm-regular">
                        <BsBarChart size={16} />
                        <span>{course.level.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {reviewsLoading && <DashboardLatestReviewSkeleton />}
        {!reviewsLoading && instructorReviews && (
          <div className="bg-white shadow-shadow-dashboard rounded-2xl">
            <div className="border-b border-border-1 px-[30px] py-5 flex items-center justify-between">
              <h1 className="text-head text-lg-medium">Шинэ сэтгэгдлүүд</h1>
              <Link
                className="underline text-color-1 text-sm-medium hover:text-color-1/70 duration-300"
                href={"/instructors/dashboard/my-courses"}
              >
                Бүгдийг харах
              </Link>
            </div>

            <div className="p-[30px] space-y-5">
              {latestReviews.map((review) => (
                <div
                  key={review._id}
                  className="pb-5 border-b border-border-1 grid grid-cols-6 gap-[15px]"
                >
                  <Link
                    href={"/instructors/dashboard/reviews"}
                    className="rounded-full overflow-hidden relative group w-full block"
                  >
                    <Image
                      src={review.user.avatar}
                      width={500}
                      height={500}
                      alt={review.user.fullName}
                      className="w-full h-full object-cover aspect-square"
                    />
                    <div className="absolute top-0 left-0 right-0 bottom-0 w-full group-hover:bg-color-2/50 duration-300" />
                  </Link>

                  <div className="col-span-4 space-y-[15px]">
                    <h2 className="text-head text-md-medium">{review.user.fullName}</h2>

                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <h5 className="text-head text-base-medium">{review.title}</h5>
                        <div className="flex items-center gap-1 leading-none">
                          <span className="text-[#E59819] text-sm-medium">{review.rating}</span>
                          <RatingStar count={5} rating={review.rating} gap={4} />
                        </div>
                      </div>
                      {review.text && <p className="text-text text-sm-regular">{review.text}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white shadow-shadow-dashboard rounded-2xl">
          <div className="border-b border-border-1 px-[30px] py-5 flex items-center justify-between">
            <h1 className="text-head text-lg-medium">Мэдэгдэл</h1>
            <Link
              className="underline text-color-1 text-sm-medium hover:text-color-1/70 duration-300"
              href={"/instructors/dashboard/my-courses"}
            >
              Бүгдийг харах
            </Link>
          </div>

          <div className="p-[30px] space-y-5">
            <div className="pb-5 border-b border-border-1 grid grid-cols-5 gap-[15px]">
              <Link href={"/"} className="rounded-lg overflow-hidden relative group w-full block">
                <Image
                  src={plcHolder}
                  alt="Placeholder"
                  className="w-full h-full object-cover aspect-[1.13/1]"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 w-full group-hover:bg-color-2/50 duration-300" />
              </Link>

              <div className="col-span-4 space-y-[15px]">
                <h2 className="text-head text-md-medium">
                  Complete Python Bootcamp From Zero to Hero in Python
                </h2>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsFileEarmarkText size={16} />
                    <span>6 хичээл</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsClock size={16} />
                    <span>2 цаг 30 минут</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsBarChart size={16} />
                    <span>Анхан шат</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pb-5 border-b border-border-1 grid grid-cols-5 gap-[15px]">
              <Link href={"/"} className="rounded-lg overflow-hidden relative group w-full block">
                <Image
                  src={plcHolder}
                  alt="Placeholder"
                  className="w-full h-full object-cover aspect-[1.13/1]"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 w-full group-hover:bg-color-2/50 duration-300" />
              </Link>

              <div className="col-span-4 space-y-[15px]">
                <h2 className="text-head text-md-medium">
                  Complete Python Bootcamp From Zero to Hero in Python
                </h2>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsFileEarmarkText size={16} />
                    <span>6 хичээл</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsClock size={16} />
                    <span>2 цаг 30 минут</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsBarChart size={16} />
                    <span>Анхан шат</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pb-5 border-b border-border-1 grid grid-cols-5 gap-[15px]">
              <Link href={"/"} className="rounded-lg overflow-hidden relative group w-full block">
                <Image
                  src={plcHolder}
                  alt="Placeholder"
                  className="w-full h-full object-cover aspect-[1.13/1]"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 w-full group-hover:bg-color-2/50 duration-300" />
              </Link>

              <div className="col-span-4 space-y-[15px]">
                <h2 className="text-head text-md-medium">
                  Complete Python Bootcamp From Zero to Hero in Python
                </h2>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsFileEarmarkText size={16} />
                    <span>6 хичээл</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsClock size={16} />
                    <span>2 цаг 30 минут</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsBarChart size={16} />
                    <span>Анхан шат</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pb-5 grid grid-cols-5 gap-[15px]">
              <Link href={"/"} className="rounded-lg overflow-hidden relative group w-full block">
                <Image
                  src={plcHolder}
                  alt="Placeholder"
                  className="w-full h-full object-cover aspect-[1.13/1]"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 w-full group-hover:bg-color-2/50 duration-300" />
              </Link>

              <div className="col-span-4 space-y-[15px]">
                <h2 className="text-head text-md-medium">
                  Complete Python Bootcamp From Zero to Hero in Python
                </h2>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsFileEarmarkText size={16} />
                    <span>6 хичээл</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsClock size={16} />
                    <span>2 цаг 30 минут</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsBarChart size={16} />
                    <span>Анхан шат</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorDashboardPage;

InstructorDashboardPage.getLayout = function getLayout(page): ReactNode {
  return <DashboardLayout>{page}</DashboardLayout>;
};
