import AdvantageSection from '@/components/Home/AdvantageSection';
import BestInstructorSection from '@/components/Home/BestInstructorSection';
import HeroSection from '@/components/Home/HeroSection';
import Partner from '@/components/Home/Partner';
import PopularCourses from '@/components/Home/PopularCourses';
import TopCategories from '@/components/Home/TopCategories';
import UsersCommentSection from '@/components/Home/UsersCommentSection';
import { ICourse, ICourseCategory } from '@/interfaces/courses';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { FC } from 'react';

interface HomeProps {
  categories: ICourseCategory[];
  courses: ICourse[];
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const [categoryRes, coursesRes] = await axios.all([
    axios.get('http://localhost:5000/api/courses/categories'),
    axios.get('http://localhost:5000/api/courses/'),
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
    <Partner />
    <TopCategories categories={categories} />
    <PopularCourses courses={courses} />
    <UsersCommentSection />
    <BestInstructorSection />
    <AdvantageSection />
  </>
);

export default Home;
