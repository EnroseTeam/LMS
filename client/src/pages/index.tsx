import HeroSection from '@/components/Home/HeroSection';
import { Partner } from '@/components/Home/Partner';
import TopCategories from '@/components/Home/TopCategories';
import { ICourseCategory } from '@/interfaces/courses';
import axios from 'axios';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { FC } from 'react';

interface HomeProps {
  categories: ICourseCategory[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
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
      <title key="title">Home Page | IntelliSense</title>
    </Head>
    <HeroSection />
    <Partner />
    <TopCategories categories={categories} />
  </>
);

export default Home;
