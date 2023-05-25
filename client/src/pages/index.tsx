import "swiper/css";

import axios from "axios";
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import { ICourse, ICourseCategory, ICourseReview } from "@/interfaces/courses";
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
import { IBlog } from "@/interfaces/blogs";

interface HomeProps {
  categories: ICourseCategory[];
  courses: ICourse[];
  instructors: IUser[];
  blogs: IBlog[];
  testimonials: ICourseReview[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const [categoryRes, coursesRes, instructorRes, blogRes, testimonialRes] = await axios.all([
    axiosInstance.get("/api/courses/categories"),
    axiosInstance.get(`/api/courses`),
    axiosInstance.get("/api/instructors"),
    axiosInstance.get("/api/blogs?pageSize=5"),
    axiosInstance.get("/api/courses/reviews/testimonials"),
  ]);

  return {
    props: {
      categories: categoryRes.data.body,
      courses: coursesRes.data.body,
      instructors: instructorRes.data.body,
      blogs: blogRes.data.body,
      testimonials: testimonialRes.data.body,
    },
  };
};

const Home: NextPage<HomeProps> = ({ categories, courses, instructors, blogs, testimonials }) => (
  <>
    <Head>
      <title key="title">Нүүр хуудас | IntelliSense</title>
    </Head>
    <HeroSection />
    <PartnerSection />
    <TopCategoriesSection categories={categories} />
    <PopularCoursesSection courses={courses} categories={categories} />
    <UsersCommentSection testimonials={testimonials} />
    <BestInstructorSection instructors={instructors} />
    <AdvantageSection />
    <NewsSection blogs={blogs} />
  </>
);

export default Home;
