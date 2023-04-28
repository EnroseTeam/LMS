import { FC } from "react";
import Breadcrumbs from "@/components/global/Breadcrumbs";
import Image from "next/image";

import big from "../assets/about-2.svg";

const AboutUsPage: FC = () => (
  <>
    <Breadcrumbs
      breadcrumbItems={[{ title: "Бидний тухай", link: "/about-us" }]}
    />
    <div className="container mb-[120px]">
      <h1 className="font-[700] text-[40px] leading-[47px] text-head text-center mb-1">
        Бидний тухай
      </h1>
      <p className="text-lg-regular text-text text-center mb-[86px]">
        We’re on a mission to deliver engaging, curated courses at a reasonable
        price.
      </p>
      <div className="flex flex-cols-2 gap-[172px]">
        <div className="flex">
          <div className="w-[300px] h-[400px] rounded-[16px] overflow-hidden relative">
            <Image src={big} alt="" className="w-full h-full bg-bg-5" />
            <div className="absolute bg-white -top-[50px] -right-[50px] w-[100px] h-[100px] rotate-45" />
          </div>
          <div></div>
        </div>
        <div className="flex flex-col">
          <h1 className="font-[700] leading-[50px] text-[30px] text-head mb-[30px]">
            Welcome to Educrat Enhance your skills with best Online courses
          </h1>
          <p className="text-md-regular text-head mb-[28px]">
            Welcome to Educrat Enhance your skills with best Online courses
          </p>
          <p className="text-md-regular text-text mb-[30px]">
            Neque convallis a cras semper auctor. Libero id faucibus nisl
            tincidunt egetnvallis a cras semper auctonvallis a cras semper
            aucto. Neque convallis a cras semper auctor. Liberoe convallis a
            cras semper atincidunt egetnval
          </p>
        </div>
      </div>
    </div>
  </>
);

export default AboutUsPage;
