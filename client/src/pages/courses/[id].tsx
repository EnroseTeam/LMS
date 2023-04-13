import axios from "axios";
import { GetServerSideProps } from "next";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  BsPersonWorkspace,
  BsClock,
  BsCollectionPlay,
  BsBarChart,
  BsTranslate,
  BsInfinity,
  BsInstagram,
  BsPlay,
} from "react-icons/bs";
import { HiOutlinePuzzle } from "react-icons/hi";
import { TfiMedall } from "react-icons/tfi";
import { ImFacebook, ImTwitter, ImLinkedin2 } from "react-icons/im";

import Breadcrumbs from "@/components/global/Breadcrumbs";
import Button from "@/components/global/Button";
import RatingStar from "@/components/global/RatingStar";
import { ICourse, ICourseCategory } from "@/interfaces/courses";

import placeholder from "@/assets/placeholder.png";
import shape from "@/assets/hero-shape.svg";

interface SingleCoursePageProps {
  categories: ICourseCategory[];
  course: ICourse;
}

export const getServerSideProps: GetServerSideProps<
  SingleCoursePageProps
> = async ({ params }) => {
  const [categoryRes, courseRes] = await axios.all([
    axios.get("http://localhost:5000/api/courses/categories"),
    axios.get(`http://localhost:5000/api/courses/${params?.id}`),
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
