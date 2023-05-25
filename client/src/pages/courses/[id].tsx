import { GetStaticPaths, GetStaticProps } from "next";
import { FC } from "react";

import { ICourse } from "@/interfaces/courses";
import SinglePageHeader from "@/components/Courses/SinglePageHeader";
import SinglePageContent from "@/components/Courses/SinglePageContent";
import { axiosInstance } from "@/utils/axiosInstance";

interface SingleCoursePageProps {
  course: ICourse;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axiosInstance.get("/api/courses/publishedIds");
  const paths = res.data.body.map((id: string) => ({ params: { id } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<SingleCoursePageProps> = async ({ params }) => {
  try {
    const res = await axiosInstance.get<{ message: string; body: ICourse }>(
      `/api/courses/${params?.id}`
    );

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

const SingleCoursePage: FC<SingleCoursePageProps> = ({ course }) => (
  <>
    <SinglePageHeader course={course} />
    <SinglePageContent course={course} />
  </>
);

export default SingleCoursePage;
