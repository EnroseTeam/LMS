import "swiper/css";

import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { FC } from "react";

import { ICourse, ICourseCategory } from "@/interfaces/courses";
import NewsSection from "@/components/Home/NewsSection";
import AdvantageSection from "@/components/Home/AdvantageSection";
import BestInstructorSection from "@/components/Home/BestInstructorSection";
import HeroSection from "@/components/Home/HeroSection";
import PartnerSection from "@/components/Home/PartnerSection";
import PopularCoursesSection from "@/components/Home/PopularCoursesSection";
import TopCategoriesSection from "@/components/Home/TopCategoriesSection";
import UsersCommentSection from "@/components/Home/UsersCommentSection";
import { IUser } from "@/interfaces/user";
import { axiosInstance } from "@/utils/axiosInstance";

interface HomeProps {
  categories: ICourseCategory[];
  courses: ICourse[];
  instructors: IUser[];
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({
  query,
}) => {
  const { category = "" } = query;
  const [categoryRes, coursesRes, instructorRes] = await axios.all([
    axiosInstance.get("/api/courses/categories"),
    axiosInstance.get(`/api/courses?category=${category}`),
    axiosInstance.get("/api/users/instructors"),
  ]);

  return {
    props: {
      categories: categoryRes.data.body,
      courses: coursesRes.data.body,
      instructors: instructorRes.data.body,
    },
  };
};

const Home: FC<HomeProps> = ({ categories, courses, instructors }) => (
  <>
    <Head>
      <title key="title">Нүүр хуудас | IntelliSense</title>
    </Head>
    <HeroSection />
    <PartnerSection />
    <TopCategoriesSection categories={categories} />
    <PopularCoursesSection courses={courses} categories={categories} />
    <UsersCommentSection />
    <BestInstructorSection instructors={instructors} />
    <AdvantageSection />
    <NewsSection />
  </>
);

export default Home;
