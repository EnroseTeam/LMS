import CourseSectionForm from "@/components/Instructors/Dashboard/Courses/CourseSectionForm";
import { AuthContext } from "@/contexts/AuthContext";
import { ICourse } from "@/interfaces/courses";
import DashboardLayout from "@/layouts/DashboardLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { axiosInstance } from "@/utils/axiosInstance";
import { fetcher } from "@/utils/fetcher";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, ReactNode, useContext, useEffect, useRef, useState } from "react";
import useSwr from "swr";

interface InstructorDashboardSingleCoursePageProps {
  course: ICourse;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axiosInstance.get("/api/courses/allIds");
  const paths = res.data.body.map((id: string) => ({ params: { id } }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<InstructorDashboardSingleCoursePageProps> = async ({
  params,
}) => {
  try {
    const res = await axiosInstance.get<{ body: ICourse }>(`/api/courses/${params?.id}`);

    return {
      props: {
        course: res.data.body,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

const InstructorDashboardSingleCoursePage: NextPageWithLayout<
  InstructorDashboardSingleCoursePageProps
> = ({ course }) => (
  <>
    <h1 className="text-head text-3xl-bold mb-[9px]">{course.name}</h1>
    <p className="text-text text-md-regular mb-[60px]">Сургалтын дэлгэрэнгүй мэдээлэл</p>
    <div className="flex flex-col gap-8">
      <CourseMediaContent course={course} />
      <CourseInfoContent course={course} />
      <CourseSectionForm course={course} />
    </div>
  </>
);

interface CourseContentProps {
  course: ICourse;
}

const CourseMediaContent: FC<CourseContentProps> = ({ course }) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const {
    data: userOwnCourses,
    isLoading: ownCoursesLoading,
    error: coursesError,
  } = useSwr(user && "/api/courses/instructor", fetcher<{ body: ICourse[] }>);

  const [isReady, setIsReady] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [course]);

  useEffect(() => {
    if (!ownCoursesLoading && userOwnCourses && user) {
      const ids: string[] = [];
      for (const course of userOwnCourses.body) {
        ids.push(course._id);
      }

      if (!ids.includes(course._id)) {
        router.push("/instructors/dashboard/my-courses");
      } else {
        setIsReady(true);
      }
    }

    if (!ownCoursesLoading && coursesError) {
      router.push("/instructors/dashboard/my-courses");
    }
  }, [user, userOwnCourses, ownCoursesLoading, course, router, coursesError]);

  if (!isReady) return <></>;

  return (
    <div className="rounded-2xl shadow-shadow-dashboard bg-white">
      <div className="px-[30px] py-5 border-b border-b-border-1">
        <h2 className="text-head text-lg-medium">Зураг болон бичлэг</h2>
      </div>
      <div className="p-[30px] grid grid-cols-2 gap-5">
        <div className="col-span-1">
          <div className="w-full rounded-lg overflow-hidden mb-5">
            <Image
              src={course.picture}
              alt={course.name}
              width={600}
              height={600}
              className="w-full aspect-[1.2/1] object-cover"
            />
          </div>
          <h5 className="text-head text-lg-medium">Сургалтын зураг</h5>
        </div>

        <div className="col-span-1">
          <div className="w-full rounded-lg overflow-hidden mb-5">
            <video ref={videoRef} className="block w-full aspect-[1.2/1] object-cover" controls>
              <source src={course.video} type="video/mp4" />
            </video>
          </div>
          <h5 className="text-head text-lg-medium">Танилцуулга бичлэг</h5>
        </div>
      </div>
    </div>
  );
};

const CourseInfoContent: FC<CourseContentProps> = ({ course }) => (
  <div className="rounded-2xl shadow-shadow-dashboard bg-white">
    <div className="px-[30px] py-5 border-b border-b-border-1">
      <h2 className="text-head text-lg-medium">Сургалтын ерөнхий мэдээлэл</h2>
    </div>
    <div className="p-[30px] flex flex-col gap-5">
      <div className="grid grid-cols-3 items-start">
        <span className="block col-span-1 text-head text-md-medium leading-[36px]">Нэр</span>
        <span className="block col-span-2 text-text text-base-regular">{course.name}</span>
      </div>

      <div className="grid grid-cols-3 items-start">
        <span className="block col-span-1 text-head text-md-medium leading-[36px]">Тайлбар</span>
        <span className="block col-span-2 text-text text-base-regular">{course.description}</span>
      </div>

      <div className="grid grid-cols-3">
        <span className="block col-span-1 text-head text-md-medium leading-[36px]">Түвшин</span>
        <span className="block col-span-2 text-text text-base-regular">{course.level.name}</span>
      </div>

      <div className="grid grid-cols-3">
        <span className="block col-span-1 text-head text-md-medium leading-[36px]">Ангилал</span>
        <span className="block col-span-2 text-text text-base-regular">{course.category.name}</span>
      </div>

      <div className="grid grid-cols-3">
        <span className="block col-span-1 text-head text-md-medium leading-[36px]">Зорилго</span>
        <span className="col-span-2 text-text text-base-regular flex flex-col">
          {course.goals.map((goal, index) => (
            <span key={index}>
              {index + 1}. {goal}
            </span>
          ))}
        </span>
      </div>

      <div className="grid grid-cols-3">
        <span className="block col-span-1 text-head text-md-medium leading-[36px]">
          Тавигдах шаардлага
        </span>
        <span className="col-span-2 text-text text-base-regular flex flex-col">
          {course.requirements.map((req, index) => (
            <span key={index}>
              {index + 1}. {req}
            </span>
          ))}
        </span>
      </div>

      <div className="grid grid-cols-3">
        <span className="block col-span-1 text-head text-md-medium leading-[36px]">Үндсэн үнэ</span>
        <span className="block col-span-2 text-text text-base-regular">₮{course.price}</span>
      </div>

      {course.discountPrice > 0 && (
        <div className="grid grid-cols-3">
          <span className="block col-span-1 text-head text-md-medium leading-[36px]">
            Хямдралтай үнэ
          </span>
          <span className="block col-span-2 text-text text-base-regular">
            ₮{course.discountPrice}
          </span>
        </div>
      )}
    </div>
  </div>
);

export default InstructorDashboardSingleCoursePage;
InstructorDashboardSingleCoursePage.getLayout = function (page): ReactNode {
  return <DashboardLayout>{page}</DashboardLayout>;
};
