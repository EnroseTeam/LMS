import Breadcrumbs from "@/components/global/Breadcrumbs";
import Image from "next/image";

import big from "../assets/about-2.svg";
import about2 from "../assets/about-1.svg";
import about3 from "../assets/about-3.svg";
import AdvantageSection from "@/components/Home/AdvantageSection";
import UsersCommentSection from "@/components/Home/UsersCommentSection";
import { IUser } from "@/interfaces/user";
import { GetStaticProps } from "next";
import BestInstructorSection from "@/components/Home/BestInstructorSection";
import PartnerSection from "@/components/Home/PartnerSection";
import { axiosInstance } from "@/utils/axiosInstance";
import { NextPageWithLayout } from "./_app";
import axios from "axios";
import { ICourseReview } from "@/interfaces/courses";
import Link from "next/link";

interface AboutUsPageProps {
  instructors: IUser[];
  testimonials: ICourseReview[];
}

export const getStaticProps: GetStaticProps<AboutUsPageProps> = async () => {
  const [instructorRes, testimonialsRes] = await axios.all([
    axiosInstance.get("/api/instructors"),
    axiosInstance.get("/api/courses/reviews/testimonials"),
  ]);
  return {
    props: {
      instructors: instructorRes.data.body,
      testimonials: testimonialsRes.data.body,
    },
  };
};

const AboutUsPage: NextPageWithLayout<AboutUsPageProps> = ({ instructors, testimonials }) => (
  <>
    <Breadcrumbs breadcrumbItems={[{ title: "Бидний тухай", link: "/about-us" }]} />
    <div className="container mb-16 lg:mb-[120px]">
      <h1 className="font-[700] text-[40px] leading-[47px] text-head text-center mb-1">
        Бидний тухай
      </h1>
      <p className="text-lg-regular px-8 lg:px-0 mb-14 text-text text-center lg:mb-[86px]">
        Стандарт хангасан, боломжийн үнэтэй сургалтуудыг зөвхөн манайхаас авах боломжтой
      </p>
      <div className="grid grid-cols-1 xl:grid-cols-2 place-items-center text-center xl:text-left gap-[50px] xl:gap-[100px]">
        <div className="flex gap-[30px] items-center">
          <div className="relative pl-[10px]">
            <div className="max-w-[300px] max-h-[400px] rounded-[16px] overflow-hidden">
              <Image src={big} alt="" className="w-full h-full bg-color-1" />
              <div className="absolute bg-white -top-[50px] -right-[50px] max-w-[100px] max-h-[100px] rotate-45" />
            </div>
          </div>
          <div className="flex flex-col gap-[30px]">
            <div className="relative">
              <div className="max-w-[200px] max-h-[200px] rounded-[16px] overflow-hidden">
                <Image src={about2} alt="" className="bg-color-1 w-full h-full" />
                <div className="absolute bg-white -top-[50px] -right-0 max-w-[90px] max-h-[90px] rotate-45" />
              </div>
            </div>
            <div className="relative">
              <div className="max-w-[255px] max-h-[250px] rounded-[16px] overflow-hidden">
                <Image src={about3} alt="" className="bg-color-1 w-full h-full" />
                <div className="absolute bg-white -top-[50px] -right-[50px] max-w-[95px] max-h-[95px] rotate-45" />
              </div>
            </div>
          </div>
        </div>
        <div className="px-8 mt-6 lg:mt-0 lg:px-0">
          <h1 className="font-[700] leading-[40px] text-[30px] text-head mb-[30px]">
            Тавтай морилно уу. Онлайнаар өөрийн чадвараа IntelliSense-тэй хамт дээшлүүлээрэй.
          </h1>
          <p className="text-md-regular text-head mb-[28px]">
            Манайд байгаа топ сургалтуудаас суралцах боломжтой.
          </p>
          <p className="text-md-regular text-text mb-[30px] w-full xl:w-[85%]">
            Neque convallis a cras semper auctor. Libero id faucibus nisl tincidunt egetnvallis a
            cras semper auctonvallis a cras semper aucto. Neque convallis a cras semper auctor.
            Liberoe convallis a cras semper atincidunt egetnval
          </p>
          <Link href="/courses" className="btn-1 block w-fit">
            Суралцаж эхлэх
          </Link>
        </div>
      </div>
    </div>
    <AdvantageSection />
    <UsersCommentSection testimonials={testimonials} />
    <BestInstructorSection instructors={instructors} />
    <PartnerSection />
  </>
);

export default AboutUsPage;
