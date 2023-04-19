import { FC } from "react";
import { GetStaticPaths, GetStaticProps } from "next";

import FooterAlternate from "@/components/Lessons/FooterAlternate";
import HeaderAlternate from "@/components/Lessons/HeaderAlternate";
import axios from "axios";
import { ICourse, ICourseLesson } from "@/interfaces/courses";
import Accordion from "@/components/global/Accordion";
import Link from "next/link";

import { BsPlayFill } from "react-icons/bs";
import SinglePageDescriptionContent from "@/components/Courses/SinglePageDescriptionContent";
import Button from "@/components/global/Button";
import SinglePageReviewContent from "@/components/Courses/SinglePageReviewContent";

interface SingleLessonPageProps {
  lesson: ICourseLesson;
  course: ICourse;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get(`http://localhost:5000/api/courses/lessons/ids`);
  const paths = res.data.body.map((id: string) => ({ params: { id } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<SingleLessonPageProps> = async ({ params }) => {
  const res = await axios.get(`http://localhost:5000/api/courses/lessons/${params?.id}`);
  const courseRes = await axios.get(
    `http://localhost:5000/api/courses/${res.data.body.section.course}`
  );

  return {
    props: {
      lesson: res.data.body,
      course: courseRes.data.body,
    },
  };
};

const SingleLessonPage: FC<SingleLessonPageProps> = ({ lesson, course }) => (
  <>
    <HeaderAlternate title={lesson.name} courseId={lesson.section.course} />
    <div className="container grid grid-cols-4 gap-[30px] mt-[30px]">
      <div className="col-span-3">
        <video className="w-full rounded-lg mb-[41px]" controls>
          <source src={lesson.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <SinglePageDescriptionContent course={course} />
        <div className="w-full flex items-center justify-between mt-[36px] mb-[60px]">
          <Button className="bg-color-1 text-white">Өмнөх</Button>
          <Button className="border-2 border-color-1 text-color-1">Дараах</Button>
        </div>
        <SinglePageReviewContent reviews={course.reviews} avgRating={course.avgRating} />
      </div>
      <div className="flex flex-col gap-[10px]">
        {course.sections.map((section, index) => (
          <Accordion
            key={section._id}
            state={index === 0}
            header={<h1 className="text-head text-base-medium">{section.title}</h1>}
            content={
              <div className="p-[30px] flex flex-col gap-5">
                {section.lessons.map((lesson) => (
                  <Link
                    key={lesson._id}
                    href={`/lessons/${lesson._id}`}
                    className="flex items-center justify-between"
                  >
                    <span className="flex items-center gap-[10px] w-[50%]">
                      <div className="p-2 rounded-full bg-color-1/[.07] text-color-1">
                        <BsPlayFill size={12} />
                      </div>
                      <h3 className="text-text text-md-regular">{lesson.name}</h3>
                    </span>
                    <p className="text-text text-md-regular underline">{lesson.length}</p>
                  </Link>
                ))}
              </div>
            }
          />
        ))}
      </div>
    </div>
    <FooterAlternate />
  </>
);

export default SingleLessonPage;
