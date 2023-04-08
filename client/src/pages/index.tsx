import HeroSection from "@/components/Home/HeroSection";
import { Partner } from "@/components/Home/Partner";
import Head from "next/head";
import { FC } from "react";

const Home: FC = () => (
  <>
    <Head>
      <title key="title">Home Page | IntelliSense</title>
    </Head>
    <HeroSection />
    <Partner />
  </>
);

export default Home;
