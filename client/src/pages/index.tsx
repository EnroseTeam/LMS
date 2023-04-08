
import HeroSection from '@/components/Home/HeroSection';
import Head from 'next/head';
import { FC } from 'react';

const Home: FC = () => {
  return (
    <>
      <Head>
        <title key="title">Home Page | IntelliSense</title>
      </Head>
      <HeroSection />
    </>
  );
};

export default Home;
