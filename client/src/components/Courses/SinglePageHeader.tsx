import { ICourse } from "@/interfaces/courses";
import { FC, useState, useEffect, useRef, useContext } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  BsPersonWorkspace,
  BsClock,
  BsCollectionPlay,
  BsBarChart,
  BsInfinity,
  BsInstagram,
  BsPlay,
} from "react-icons/bs";
import { ImFacebook, ImTwitter, ImLinkedin2 } from "react-icons/im";

import Breadcrumbs from "@/components/global/Breadcrumbs";
import RatingStar from "@/components/global/RatingStar";

import shape from "@/assets/hero-shape.svg";
import ButtonSkeleton from "@/components/Skeletons/ButtonSkeleton";
import { IoMdClose } from "react-icons/io";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/router";
import useSwr from "swr";
import { fetcher } from "@/utils/fetcher";
import { AuthContext } from "@/contexts/AuthContext";

interface SinglePageHeaderProps {
  course: ICourse;
}

const SinglePageHeader: FC<SinglePageHeaderProps> = ({ course }) => {
  const router = useRouter();
  const { addCartItem } = useCart();

  const { user, isUserLoading } = useContext(AuthContext);

  const { data: userOwnCourses, isLoading: ownCoursesLoading } = useSwr(
    user && "/api/courses/instructor",
    fetcher<{ body: ICourse[] }>
  );
  const { data: userBoughtCourses, isLoading: boughtCoursesLoading } = useSwr(
    user && "/api/courses/user",
    fetcher<{ body: ICourse[] }>
  );

  const [boughtCourses, setBoughtCourses] = useState<string[]>([]);
  const [ownCourses, setOwnCourses] = useState<string[]>([]);

  const [showVideo, setShowVideo] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!ownCoursesLoading && userOwnCourses) {
      setOwnCourses(userOwnCourses.body.map((course) => course._id));
    }

    if (!boughtCoursesLoading && userBoughtCourses) {
      setBoughtCourses(userBoughtCourses.body.map((course) => course._id));
    }
  }, [userBoughtCourses, userOwnCourses, ownCoursesLoading, boughtCoursesLoading]);

  return (
    <div className="bg-head pb-[60px] relative overflow-hidden">
      <Breadcrumbs
        transparent
        breadcrumbItems={[
          { title: "Сургалтууд", link: "/courses" },
          {
            title: course.category.name,
            link: `/courses?category=${course.category.slug}`,
          },
          { title: course.name, link: `/courses/${course._id}` },
        ]}
      />

      <div className="container absolute w-full top-8 bottom-[62px] right-0 left-0 pointer-events-none">
        <Image src={shape} alt="Shape" className="w-full aspect-auto object-contain" />
      </div>

      <div className="container grid grid-cols-1 lg:grid-cols-2 items-center gap-[45px] lg:gap-[145px] text-icon">
        <div className="flex flex-col gap-[30px]">
          {/* Course Head */}

          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              {course.discountPrice > 0 && (
                <div className="uppercase py-2 px-4 bg-color-6 text-head text-[11px] font-medium leading-[13px] rounded-[60px]">
                  Хямдралтай
                </div>
              )}
            </div>

            <h1 className="text-3xl-bold text-white">{course.name}</h1>

            <div className="lg:hidden rounded-lg overflow-hidden w-full relative">
              <Image
                src={course.picture}
                width={513}
                height={450}
                alt="Video"
                className="w-full aspect-auto object-contain"
              />

              <div
                onClick={(): void => {
                  setShowVideo(true);
                }}
                className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] p-5 bg-white rounded-full cursor-pointer hover:text-white hover:bg-icon duration-300"
              >
                <BsPlay size={40} />
              </div>
            </div>

            <div
              className="text-icon text-md-regular"
              dangerouslySetInnerHTML={{
                __html: course.description.slice(0, 200) + "...",
              }}
            />

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-start sm:items-center lg:items-start xl:items-center gap-5 sm:gap-7 lg:gap-5 xl:gap-7">
              <div className="flex items-center gap-[10px]">
                <p className="text-[#E59819] text-sm-medium mt-[2px]">
                  {course.avgRating.toFixed(1)}
                </p>
                <RatingStar gap={4} rating={course.avgRating} />
                <p className="text-icon text-xs-regular">({course.reviews.length})</p>
              </div>

              <div className="flex items-center gap-[10px]">
                <BsPersonWorkspace size={16} />
                <p className=" text-sm-regular">{course.students.length} сурагч элссэн</p>
              </div>

              <div className="flex items-center gap-[10px]">
                <BsClock size={16} />
                <p className=" text-sm-regular">
                  Сүүлд{" "}
                  {new Date(course.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                  })}
                  -нд шинэчлэгдсэн
                </p>
              </div>
            </div>

            <div className="flex items-center gap-[10px]">
              <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
                <Image
                  src={course.instructor.avatar}
                  alt={course.instructor.fullName}
                  width={30}
                  height={30}
                  className="w-full object-cover aspect-square"
                />
              </div>
              <p className="text-sm-regular">{course.instructor.fullName}</p>
            </div>
          </div>

          {/* Course Includes */}
          <div className="flex flex-col text-white text-md-regular leading-[40px]">
            <div className="flex items-center justify-between border-b border-b-white/[.15]">
              <span className="flex items-center gap-[10px]">
                <BsCollectionPlay size={16} />
                <h1>Хичээлийн тоо</h1>
              </span>

              <h2>{course.lessonCount}</h2>
            </div>

            <div className="flex items-center justify-between border-b border-b-white/[.15]">
              <span className="flex items-center gap-[10px]">
                <BsClock size={16} />
                <h1>Хугацаа</h1>
              </span>

              <h2>
                {course.totalLessonLength.hour > 0 && `${course.totalLessonLength.hour} цаг `}
                {course.totalLessonLength.minute > 0 && `${course.totalLessonLength.minute} минут`}
              </h2>
            </div>

            <div className="flex items-center justify-between border-b border-b-white/[.15]">
              <span className="flex items-center gap-[10px]">
                <BsBarChart size={16} />
                <h1>Түвшин</h1>
              </span>

              <h2>{course.level.name}</h2>
            </div>

            <div className="flex items-center justify-between border-b border-b-white/[.15]">
              <span className="flex items-center gap-[10px]">
                <BsInfinity size={16} />
                <h1>Насан туршийн эрх</h1>
              </span>

              <h2>Тийм</h2>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-0 text-sm text-icon">
            {course.instructor.socialAccounts.facebook && (
              <Link
                className=" p-4 rounded-full hover:bg-white/10 hover:text-white duration-300"
                href={course.instructor.socialAccounts.facebook}
                target="_blank"
              >
                <ImFacebook />
              </Link>
            )}
            {course.instructor.socialAccounts.twitter && (
              <Link
                className=" p-4 rounded-full hover:bg-white/10 hover:text-white duration-300"
                href={course.instructor.socialAccounts.twitter}
                target="_blank"
              >
                <ImTwitter />
              </Link>
            )}
            {course.instructor.socialAccounts.instagram && (
              <Link
                className=" p-4 rounded-full hover:bg-white/10 hover:text-white duration-300"
                href={course.instructor.socialAccounts.instagram}
                target="_blank"
              >
                <BsInstagram />
              </Link>
            )}
            {course.instructor.socialAccounts.linkedin && (
              <Link
                className=" p-4 rounded-full hover:bg-white/10 hover:text-white duration-300"
                href={course.instructor.socialAccounts.linkedin}
                target="_blank"
              >
                <ImLinkedin2 />
              </Link>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-[30px]">
          <div className="hidden lg:block rounded-lg overflow-hidden w-full relative">
            <Image
              src={course.picture}
              width={513}
              height={450}
              alt="Video"
              className="w-full aspect-auto object-contain"
            />

            <div
              onClick={(): void => {
                setShowVideo(true);
              }}
              className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] p-5 bg-white rounded-full cursor-pointer hover:text-white hover:bg-icon duration-300"
            >
              <BsPlay size={40} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h1
              className={
                course.discountPrice > 0
                  ? " text-icon text-md-medium"
                  : "text-white text-2xl-medium"
              }
            >
              ₮{course.price}
            </h1>
            {course.discountPrice > 0 && (
              <h3 className="text-white text-2xl-medium">₮{course.discountPrice}</h3>
            )}
          </div>

          {(isUserLoading || ownCoursesLoading || boughtCoursesLoading) && <ButtonSkeleton />}

          {!user && !isUserLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-[15px] sm:gap-[25px] lg:gap-[15px] xl:gap-[25px]">
              <button
                onClick={(): void => {
                  addCartItem(course);
                }}
                className="btn-1"
              >
                Сагслах
              </button>
              <button
                onClick={(): void => {
                  router.push({
                    pathname: "/user/cart/checkout",
                    query: { course: course._id },
                  });
                }}
                className="btn-2-outline"
              >
                Худалдаж авах
              </button>
            </div>
          )}
          {user &&
            !isUserLoading &&
            !ownCourses.includes(course._id) &&
            !boughtCourses.includes(course._id) &&
            !ownCoursesLoading &&
            !boughtCoursesLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-[15px] sm:gap-[25px] lg:gap-[15px] xl:gap-[25px]">
                <button
                  onClick={(): void => {
                    addCartItem(course);
                  }}
                  className="btn-1"
                >
                  Сагслах
                </button>
                <button
                  onClick={(): void => {
                    router.push({
                      pathname: "/user/cart/checkout",
                      query: { course: course._id },
                    });
                  }}
                  className="btn-2-outline"
                >
                  Худалдаж авах
                </button>
              </div>
            )}
          {user &&
            !isUserLoading &&
            (ownCourses.includes(course._id) || boughtCourses.includes(course._id)) &&
            !boughtCoursesLoading &&
            !ownCoursesLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-[15px] sm:gap-[25px] lg:gap-[15px] xl:gap-[25px]">
                <button
                  onClick={(): void => {
                    router.push(`/lessons/${course.sections[0].lessons[0]._id}`);
                  }}
                  className="btn-1"
                >
                  Үзэж эхлэх
                </button>
                <button
                  onClick={(): void => {
                    router.push("/courses");
                  }}
                  className="btn-2-outline"
                >
                  Сургалтуудруу буцах
                </button>
              </div>
            )}
        </div>
      </div>

      <div
        onKeyDown={(e): void => {
          if (e.key === "Escape") {
            if (videoRef.current) videoRef.current.pause();
            setShowVideo(false);
          }
        }}
        onClick={(): void => {
          if (videoRef.current) videoRef.current.pause();
          setShowVideo(false);
        }}
        className={`w-screen h-screen fixed top-0 right-0 left-0 bg-[#18181a]/70 grid place-items-center z-[1000] ${
          showVideo ? "opacity-100" : "opacity-0 pointer-events-none"
        } duration-150`}
      >
        <video
          ref={videoRef}
          onClick={(e): void => {
            e.stopPropagation();
          }}
          className="w-[70%] rounded-lg mb-[41px]"
          controls
        >
          <source src={course.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <button
          className={`absolute top-5 right-10 text-head p-[10px] text-2xl bg-white rounded-full hover:text-white hover:bg-head duration-300`}
        >
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};

export default SinglePageHeader;
