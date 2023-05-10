import Breadcrumbs from "@/components/global/Breadcrumbs";
import Image from "next/image";

import big from "../assets/about-2.svg";
import about2 from "../assets/about-1.svg";
import about3 from "../assets/about-3.svg";
import AdvantageSection from "@/components/Home/AdvantageSection";
import UsersCommentSection from "@/components/Home/UsersCommentSection";
import { IInstructor } from "@/interfaces/user";
import { GetStaticProps } from "next";
import BestInstructorSection from "@/components/Home/BestInstructorSection";
import PartnerSection from "@/components/Home/PartnerSection";
import { axiosInstance } from "@/utils/axiosInstance";
import { NextPageWithLayout } from "./_app";

interface AboutUsPageProps {
  instructors: IInstructor[];
}

export const getStaticProps: GetStaticProps<AboutUsPageProps> = async () => {
  const res = await axiosInstance.get("/api/instructors");
  return {
    props: {
      instructors: res.data.body,
    },
  };
};

const AboutUsPage: NextPageWithLayout<AboutUsPageProps> = ({ instructors }) => (
  <>
    <Breadcrumbs breadcrumbItems={[{ title: "Бидний тухай", link: "/about-us" }]} />
    <div className="container mb-[120px]">
      <h1 className="font-[700] text-[40px] leading-[47px] text-head text-center mb-1">
        Бидний тухай
      </h1>
      <p className="text-lg-regular text-text text-center mb-[86px]">
        We’re on a mission to deliver engaging, curated courses at a reasonable price.
      </p>
      <div className="flex flex-cols-2 gap-[172px] items-center pr-[120px]">
        <div className="flex gap-[30px] items-center">
          <div className="relative">
            <div className="w-[300px] h-[400px] rounded-[16px] overflow-hidden">
              <Image src={big} alt="" className="w-full h-full bg-color-1" />
              <div className="absolute bg-white -top-[50px] -right-[50px] w-[100px] h-[100px] rotate-45" />
            </div>
          </div>
          <div className="flex flex-col gap-[30px]">
            <div className="relative">
              <div className="w-[200px] h-[200px] rounded-[16px] overflow-hidden">
                <Image src={about2} alt="" className="bg-color-1 w-full h-full" />
                <div className="absolute bg-white -top-[50px] -right-0 w-[90px] h-[90px] rotate-45" />
              </div>
            </div>
            <div className="relative">
              <div className="w-[255px] h-[250px] rounded-[16px] overflow-hidden">
                <Image src={about3} alt="" className="bg-color-1 w-full h-full" />
                <div className="absolute bg-white -top-[50px] -right-[50px] w-[95px] h-[95px] rotate-45" />
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <h1 className="font-[700] leading-[50px] text-[30px] text-head mb-[30px]">
            Welcome to Educrat Enhance your skills with best Online courses
          </h1>
          <p className="text-md-regular text-head mb-[28px]">
            You can start and finish one of these popular courses in under a day – for free! Check
            out the list below.. Take the course for free
          </p>
          <p className="text-md-regular text-text mb-[30px] w-[85%]">
            Neque convallis a cras semper auctor. Libero id faucibus nisl tincidunt egetnvallis a
            cras semper auctonvallis a cras semper aucto. Neque convallis a cras semper auctor.
            Liberoe convallis a cras semper atincidunt egetnval
          </p>
          <button className="btn-1">Start Learning For Free</button>
        </div>
      </div>
    </div>
    <AdvantageSection />
    <UsersCommentSection />
    <BestInstructorSection instructors={instructors} />
    <PartnerSection />
  </>
);

export default AboutUsPage;
