import { FC, useEffect, useRef, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";

import FooterAlternate from "@/components/Lessons/FooterAlternate";
import HeaderAlternate from "@/components/Lessons/HeaderAlternate";
import { ICourse, ICourseLesson } from "@/interfaces/courses";
import Accordion from "@/components/global/Accordion";
import Link from "next/link";

import { BsPlayFill } from "react-icons/bs";
import SinglePageDescriptionContent from "@/components/Courses/SinglePageDescriptionContent";
import SinglePageReviewContent from "@/components/Courses/SinglePageReviewContent";
import { useAuthenticate } from "@/hooks/useAuthenticate";
import { useRouter } from "next/router";
import { axiosInstance } from "@/utils/axiosInstance";

interface SingleLessonPageProps {
  lesson: ICourseLesson;
  course: ICourse;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axiosInstance.get(`/api/courses/lessons/ids`);
  const paths = res.data.body.map((id: string) => ({ params: { id } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<SingleLessonPageProps> = async ({
  params,
}) => {
  const res = await axiosInstance.get(`/api/courses/lessons/${params?.id}`);
  const courseRes = await axiosInstance.get(
    `/api/courses/${res.data.body.section.course}`
  );

  return {
    props: {
      lesson: res.data.body,
      course: courseRes.data.body,
    },
  };
};

const SingleLessonPage: FC<SingleLessonPageProps> = ({ lesson, course }) => {
  const { user, isLoading } = useAuthenticate();
  const [isReady, setIsReady] = useState<boolean>(false);
  const router = useRouter();
  const video = useRef<HTMLVideoElement>(null);

  const [prevUrl, setPrevUrl] = useState<string>("");
  const [nextUrl, setNextUrl] = useState<string>("");

  const [isFirstLesson, setIsFirstLesson] = useState<boolean>(false);
  const [isLastLesson, setIsLastLesson] = useState<boolean>(false);

  const [currentSectionPosition, setCurrentSectionPosition] =
    useState<number>(0);

  useEffect(() => {
    let curSectionPos = 0;
    let curLessonPos = 0;

    course.sections.map((section, secIndex) => {
      section.lessons.map((curLesson, lesIndex) => {
        if (curLesson._id === lesson._id) {
          curLessonPos = lesIndex;
          curSectionPos = secIndex;
        }
      });
    });

    setCurrentSectionPosition(curSectionPos);

    if (curSectionPos === 0 && curLessonPos === 0) {
      setIsFirstLesson(true);
      setNextUrl(course.sections[curSectionPos].lessons[curLessonPos + 1]._id);
    } else if (
      curSectionPos === course.sections.length - 1 &&
      curLessonPos === course.sections[curSectionPos].lessons.length - 1
    ) {
      setIsLastLesson(true);
      if (curLessonPos === 0) {
        setPrevUrl(
          course.sections[curSectionPos - 1].lessons[
            course.sections[curSectionPos - 1].lessons.length - 1
          ]._id
        );
      } else {
        setPrevUrl(
          course.sections[curSectionPos].lessons[curLessonPos - 1]._id
        );
      }
    } else if (curLessonPos === 0) {
      setPrevUrl(
        course.sections[curSectionPos - 1].lessons[
          course.sections[curSectionPos - 1].lessons.length - 1
        ]._id
      );
      setNextUrl(course.sections[curSectionPos].lessons[curLessonPos + 1]._id);
    } else if (
      curLessonPos ===
      course.sections[curSectionPos].lessons.length - 1
    ) {
      setPrevUrl(course.sections[curSectionPos].lessons[curLessonPos - 1]._id);
      setNextUrl(course.sections[curSectionPos + 1].lessons[0]._id);
    } else {
      setPrevUrl(course.sections[curSectionPos].lessons[curLessonPos - 1]._id);
      setNextUrl(course.sections[curSectionPos].lessons[curLessonPos + 1]._id);
    }

    return () => {
      setIsFirstLesson(false);
      setIsLastLesson(false);
      setPrevUrl("");
      setNextUrl("");
      setCurrentSectionPosition(0);
    };
  }, [lesson, course.sections]);

  useEffect(() => {
    video.current?.load();
  }, [lesson]);

  useEffect(() => {
    if (!user && !isLoading) {
      router.push(`/auth/login`);
    }
    if (user && !isLoading) {
      const ownCourses: string[] = user.ownCourses.map((course) => course._id);
      const boughtCourses: string[] = user.boughtCourses.map(
        (course) => course._id
      );

      if (
        !ownCourses.includes(course._id) &&
        !boughtCourses.includes(course._id)
      ) {
        router.push(`/courses/${course._id}`);
      } else setIsReady(true);
    }
  }, [router, user, isLoading, course._id]);

  if (!isReady) return <div>Loading</div>;

  return (
    <>
      <HeaderAlternate title={lesson.name} courseId={lesson.section.course} />
      <main className="container grid grid-cols-6 gap-[30px] mt-[30px]">
        <div className="col-span-4">
          <video ref={video} className="w-full rounded-lg mb-[41px]" controls>
            <source src={lesson.video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
        <div className="flex flex-col gap-[10px] col-span-2">
          {course.sections.map((section, index) => (
            <Accordion
              key={section._id}
              state={currentSectionPosition === index}
              header={
                <h1 className="text-head text-base-medium">{section.title}</h1>
              }
              content={
                <div className="p-[30px] flex flex-col gap-5">
                  {section.lessons.map((curLesson) => (
                    <Link
                      key={curLesson._id}
                      href={`/lessons/${curLesson._id}`}
                      className={`flex items-center justify-between group ${
                        curLesson._id === lesson._id
                          ? "pointer-events-none"
                          : ""
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
                        {curLesson.length.hour > 0 &&
                          `${curLesson.length.hour} цаг`}
                        {curLesson.length.minute > 0 &&
                          `${curLesson.length.minute} минут`}
                      </p>
                    </Link>
                  ))}
                </div>
              }
            />
          ))}
        </div>
      </main>
      <FooterAlternate />
    </>
  );
};

export default SingleLessonPage;
