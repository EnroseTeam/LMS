import axios from "axios";
import { GetServerSideProps } from "next";
import { FC } from "react";

import { ICourse, ICourseCategory } from "@/interfaces/courses";
import SinglePageHeader from "@/components/Courses/SinglePageHeader";
import SinglePageContent from "@/components/Courses/SinglePageContent";

interface SingleCoursePageProps {
  categories: ICourseCategory[];
  course: ICourse;
}

export const getServerSideProps: GetServerSideProps<SingleCoursePageProps> = async ({ params }) => {
  const [categoryRes, courseRes] = await axios.all([
    axios.get("/api/courses/categories"),
    axios.get(`/api/courses/${params?.id}`),
  ]);
  return {
    props: {
      categories: categoryRes.data.body,
      course: courseRes.data.body,
    },
  };
};

const SingleCoursePage: FC<SingleCoursePageProps> = ({ course }) => (
  <>
    <SinglePageHeader course={course} />
    <SinglePageContent course={course} />
  </>
);

export default SingleCoursePage;
