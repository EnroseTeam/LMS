import AdvantageSection from '@/components/Home/AdvantageSection';
import BestInstructorSection from '@/components/Home/BestInstructorSection';
import HeroSection from '@/components/Home/HeroSection';
import Partner from '@/components/Home/Partner';
import PopularCourses from '@/components/Home/PopularCourses';
import TopCategories from '@/components/Home/TopCategories';
import UsersCommentSection from '@/components/Home/UsersCommentSection';
import { ICourseCategory } from '@/interfaces/courses';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { FC } from 'react';

interface HomeProps {
  categories: ICourseCategory[];
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const res = await axios.get('http://localhost:5000/api/courses/categories');
  return {
    props: {
      categories: res.data.body,
    },
  };
};

const Home: FC<HomeProps> = ({ categories }) => (
  <>
    <Head>
      <title key="title">Нүүр хуудас | IntelliSense</title>
    </Head>
    <HeroSection />
    <Partner />
    <TopCategories categories={categories} />
    <PopularCourses />
    <UsersCommentSection />
    <BestInstructorSection />
    <AdvantageSection />
  </>
);

export default Home;
