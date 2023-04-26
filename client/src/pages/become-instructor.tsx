import { FC, useState } from "react";
import Breadcrumbs from "@/components/global/Breadcrumbs";
import BestInstructorSection from "@/components/Home/BestInstructorSection";
import { IUser } from "@/interfaces/user";
import { GetServerSideProps } from "next";
import axios from "axios";
import Image from "next/image";

import rating from "../assets/instructor-1.svg";
import science from "../assets/instructor-2.svg";
import online from "../assets/instructor-3.svg";
import certificate from "../assets/instructor-4.svg";
import main from "../assets/instructor-5.svg";

interface BecomeInstructorPageProps {
  instructors: IUser[];
}

export const getServerSideProps: GetServerSideProps<
  BecomeInstructorPageProps
> = async () => {
  const instructorRes = await axios.get(
    `http://localhost:5000/api/users/instructors`
  );
  return {
    props: {
      instructors: instructorRes.data.body,
    },
  };
};

const BecomeInstructorPage: FC<BecomeInstructorPageProps> = ({
  instructors,
}) => {
  const data =
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.";

  const tabOne = (
    <div className="text-text text-md-regular">
      <div className="[&>p]:mb-4" dangerouslySetInnerHTML={{ __html: data }} />
    </div>
  );

  const tabs: string[] = [
    "Багш, сургагчаар элсэх",
    "Дүрэм, шаардлага",
    "Эхлэх",
  ];

  const tabContents: JSX.Element[] = [tabOne];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <>
      <Breadcrumbs
        breadcrumbItems={[
          { title: "Багш, сургагчаар элсэх", link: "/become-instructor" },
        ]}
      />
      <div className="container">
        <div className="flex flex-col text-center gap-1 mb-[60px]">
          <h1 className="font-[700] text-[40px] leading-[47px] text-head">
            Багш, сургагчаар элсэх
          </h1>
          <p className="text-lg-regular text-text">
            We’re on a mission to deliver engaging, curated courses at a
            reasonable price.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-[50px] mb-[60px]">
          <div className="rounded-lg flex flex-col items-center px-[34px] py-[42px] hover:bg-[#FFFFFF] hover:shadow-shadow-4 cursor-pointer ">
            <Image src={rating} alt="" className="mb-5" />
            <h1 className="text-xl-medium text-head text-center mb-[9px]">
              Мэргэжилтнүүдтэй хамт суралц
            </h1>
            <p className="text-center text-text font-[400] text-[14px] leading-[24px]">
              Grursus mal suada faci lisis that ipsum ameti consecte.
            </p>
          </div>

          <div className="rounded-lg flex flex-col items-center px-[34px] py-[42px] hover:bg-[#FFFFFF] hover:shadow-shadow-4 cursor-pointer">
            <Image src={science} alt="" className="mb-5" />
            <h1 className="text-xl-medium text-head text-center mb-[9px]">
              Хүссэн бүхнээ сур
            </h1>
            <p className="text-center text-text font-[400] text-[14px] leading-[24px]">
              Grursus mal suada faci lisis that ipsum ameti consecte.
            </p>
          </div>

          <div className="rounded-lg flex flex-col items-center px-[34px] py-[42px] hover:bg-[#FFFFFF] hover:shadow-shadow-4 cursor-pointer">
            <Image src={online} alt="" className="mb-5" />
            <h1 className="text-xl-medium text-head text-center mb-[9px]">
              Уян хатан суралцах
            </h1>
            <p className="text-center text-text font-[400] text-[14px] leading-[24px]">
              Grursus mal suada faci lisis that ipsum ameti consecte.
            </p>
          </div>

          <div className="rounded-lg flex flex-col items-center px-[34px] py-[42px] hover:bg-[#FFFFFF] hover:shadow-shadow-4 cursor-pointer">
            <Image src={certificate} alt="" className="mb-5" />
            <h1 className="text-xl-medium text-head text-center mb-[9px]">
              Дэлхийн стандарт
            </h1>
            <p className="text-center text-text font-[400] text-[14px] leading-[24px]">
              Grursus mal suada faci lisis that ipsum ameti consecte.
            </p>
          </div>
        </div>

        <div className="px-[276px] mb-[120px]">
          <div>
            <div className="flex gap-[30px] border-b mb-[60px]">
              {tabs.map((tab, index) => (
                <button
                  key={`become-instructor-tab-${index}`}
                  onClick={(): void => setActiveTab(tab)}
                  className={`py-4 border-b border-b-border-1 hover:text-color-1 hover:text-md-medium hover:leading-[26px] transition-all duration-300 ${
                    activeTab === tab
                      ? "border-b-2 border-b-color-1 text-color-1 text-md-medium"
                      : "text-md-regular leading-[26px]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="mb-[120px]">
              {tabContents.map(
                (tabContent, index) => activeTab === tabs[index] && tabContent
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-bg-1 w-screen">
        <div className="container pt-[120px] pb-[183px] flex gap-[140px] items-center">
          <div className="relative">
            <div className="w-[600px] h-[600px] rounded-full overflow-hidden bg-color-1">
              <Image
                src={main}
                alt=""
                className="w-full aspect-square object-cover "
              />
            </div>
            <div className="absolute flex flex-col p-[40px] bg-white right-[10px] bottom-0">
              <div className="">FEATURED TEACHER</div>
            </div>
          </div>
          <div className="w-[50%]">
            <h1 className="text-4xl-bold text-head mb-[25px] w-[80%]">
              Become an Instructor <span className="text-color-1">Today</span>
            </h1>
            <p className="text-md-regular text-head mb-[30px]  w-[60%]">
              Use the list below to bring attention to your product’s key
              differentiator.
            </p>
            <button className="bg-color-2 rounded-lg py-[21px] px-[55px] text-[#FFFFFF] text-base-medium">
              Join Our Team{" "}
            </button>
          </div>
        </div>
      </div>
      <BestInstructorSection instructors={instructors} />
    </>
  );
};
export default BecomeInstructorPage;
