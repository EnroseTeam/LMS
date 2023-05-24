import { ReactNode, useEffect, useRef, useState } from "react";
import { GetServerSideProps } from "next";

import FooterAlternate from "@/components/Lessons/FooterAlternate";
import HeaderAlternate from "@/components/Lessons/HeaderAlternate";
import { ICourse, ICourseLesson } from "@/interfaces/courses";
import Accordion from "@/components/global/Accordion";
import Link from "next/link";

import { BsPlayFill } from "react-icons/bs";
import SinglePageDescriptionContent from "@/components/Courses/SinglePageDescriptionContent";
import SinglePageReviewContent from "@/components/Courses/SinglePageReviewContent";
import { useRouter } from "next/router";
import { axiosInstance } from "@/utils/axiosInstance";
import { NextPageWithLayout } from "../_app";
import NoLayout from "@/layouts/NoLayout";
import { isAxiosError } from "axios";

interface SingleLessonPageProps {
  lesson: ICourseLesson;
  course: ICourse;
}

export const getServerSideProps: GetServerSideProps<SingleLessonPageProps> = async ({
  params,
  req,
}) => {
  try {
    const res = await axiosInstance.get(`/api/courses/lessons/${params?.id}`, {
      headers: {
        Cookie: `connect.sid=${req.cookies["connect.sid"]}`,
      },
    });
    const courseRes = await axiosInstance.get(`/api/courses/${res.data.body.section.course}`);

    return {
      props: {
        lesson: res.data.body,
        course: courseRes.data.body,
      },
    };
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        return {
          redirect: {
            destination: "/auth/login",
            permanent: true,
          },
        };
      }

      if (error.response?.status === 403) {
        return {
          redirect: {
            destination: "/",
            permanent: true,
          },
        };
      }
    }

    return {
      notFound: true,
    };
  }
};

const SingleLessonPage: NextPageWithLayout<SingleLessonPageProps> = ({ lesson, course }) => {
  const router = useRouter();
  const video = useRef<HTMLVideoElement>(null);

  const [prevUrl, setPrevUrl] = useState<string>("");
  const [nextUrl, setNextUrl] = useState<string>("");

  const [isFirstLesson, setIsFirstLesson] = useState<boolean>(false);
  const [isLastLesson, setIsLastLesson] = useState<boolean>(false);

  const [currentSectionPosition, setCurrentSectionPosition] = useState<number>(0);

  useEffect(() => {
    const lessons: ICourseLesson[] = [];

    course.sections.map((section, index) => {
      section.lessons.map((curLesson) => {
        lessons.push(curLesson);
        if (curLesson._id === lesson._id) setCurrentSectionPosition(index);
      });
    });

    if (lessons[0]._id === lesson._id) {
      setIsFirstLesson(true);
    } else {
      setIsFirstLesson(false);
    }

    if (lessons[lessons.length - 1]._id === lesson._id) {
      setIsLastLesson(true);
    } else {
      setIsLastLesson(false);
    }

    lessons.map((curLesson, index) => {
      if (curLesson._id === lesson._id) {
        lessons[index + 1] && setNextUrl(lessons[index + 1]._id);
        lessons[index - 1] && setPrevUrl(lessons[index - 1]._id);
      }
    });
  }, [lesson, course.sections]);

  useEffect(() => {
    video.current?.load();
  }, [lesson]);

  return (
    <div key={lesson._id}>
      <HeaderAlternate title={lesson.name} courseId={lesson.section.course} />
      <main className="container grid grid-cols-1 lg:grid-cols-6 gap-[30px] mt-[30px] mb-[60px] lg:mb-0">
        <div className="col-span-1 lg:col-span-4">
          <video ref={video} className="w-full rounded-lg mb-[41px]" controls>
            <source src={lesson.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="flex flex-col gap-[10px] col-span-1 lg:col-span-2">
          {course.sections.map((section, index) => (
            <Accordion
              key={section._id}
              state={currentSectionPosition === index}
              header={<h1 className="text-head text-base-medium">{section.title}</h1>}
              content={
                <div className="p-[30px] flex flex-col gap-5">
                  {section.lessons.map((curLesson) => (
                    <Link
                      key={curLesson._id}
                      href={`/lessons/${curLesson._id}`}
                      className={`flex items-center justify-between group ${
                        curLesson._id === lesson._id ? "pointer-events-none" : ""
                      }`}
                    >
                      <span className="flex items-center gap-[10px] w-[50%]">
                        <div className="p-2 rounded-full bg-color-1/[.07] text-color-1 group-hover:bg-color-1 group-hover:text-white duration-300">
                          <BsPlayFill size={12} />
                        </div>
                        <h3
                          className={`text-text text-md-regular group-hover:text-color-1 duration-300 ${
                            curLesson._id === lesson._id ? "text-text/50" : ""
                          }`}
                        >
                          {curLesson.name}
                        </h3>
                      </span>
                      <p className="text-text text-md-regular underline">
                        {curLesson.length.hour > 0 && `${curLesson.length.hour} цаг`}
                        {curLesson.length.minute > 0 && `${curLesson.length.minute} минут`}
                      </p>
                    </Link>
                  ))}
                </div>
              }
            />
          ))}
        </div>
      </main>

      <div className="container grid grid-cols-1 lg:grid-cols-6">
        <div className="col-span-1 lg:col-span-4">
          <SinglePageDescriptionContent course={course} />
          <div className="w-full flex items-center justify-between mt-[36px] mb-[60px]">
            <button
              disabled={isFirstLesson}
              onClick={(): void => {
                router.push(`/lessons/${prevUrl}`);
              }}
              className="btn-1"
            >
              Өмнөх
            </button>
            <button
              disabled={isLastLesson}
              onClick={(): void => {
                router.push(`/lessons/${nextUrl}`);
              }}
              className="btn-1-outline"
            >
              Дараах
            </button>
          </div>
          <SinglePageReviewContent course={course} />
        </div>
      </div>
      <FooterAlternate />
    </div>
  );
};

export default SingleLessonPage;

SingleLessonPage.getLayout = function getLayout(page): ReactNode {
  return <NoLayout>{page}</NoLayout>;
};
