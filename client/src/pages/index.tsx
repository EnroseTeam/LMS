import axios from "axios";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { FC } from "react";

import { ICourse, ICourseCategory } from "@/interfaces/courses";
import ResourcesNewsSection from "@/components/Home/ResourcesNewsSection";
import AdvantageSection from "@/components/Home/AdvantageSection";
import BestInstructorSection from "@/components/Home/BestInstructorSection";
import HeroSection from "@/components/Home/HeroSection";
import PartnerSection from "@/components/Home/PartnerSection";
import PopularCoursesSection from "@/components/Home/PopularCoursesSection";
import TopCategoriesSection from "@/components/Home/TopCategoriesSection";
import UsersCommentSection from "@/components/Home/UsersCommentSection";

interface HomeProps {
  categories: ICourseCategory[];
  courses: ICourse[];
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({ query }) => {
  const { category = "" } = query;
  const [categoryRes, coursesRes] = await axios.all([
    axios.get("http://localhost:5000/api/courses/categories"),
    axios.get(`http://localhost:5000/api/courses?category=${category}`),
  ]);

  return {
    props: {
      categories: categoryRes.data.body,
      courses: coursesRes.data.body,
    },
  };
};

const Home: FC<HomeProps> = ({ categories, courses }) => (
  <>
    <Head>
      <title key="title">Нүүр хуудас | IntelliSense</title>
    </Head>
    <HeroSection />
    <PartnerSection />
    <TopCategoriesSection categories={categories} />
    <PopularCoursesSection courses={courses} categories={categories} />
    <UsersCommentSection />
    <BestInstructorSection />
    <AdvantageSection />
    <ResourcesNewsSection />
  </>
);

export default Home;
