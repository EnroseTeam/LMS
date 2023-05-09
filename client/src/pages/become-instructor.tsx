import Breadcrumbs from "@/components/global/Breadcrumbs";
import BestInstructorSection from "@/components/Home/BestInstructorSection";
import { IUser } from "@/interfaces/user";
import { GetStaticProps } from "next";
import Image from "next/image";

import rating from "../assets/instructor-1.svg";
import science from "../assets/instructor-2.svg";
import online from "../assets/instructor-3.svg";
import certificate from "../assets/instructor-4.svg";
import main from "../assets/instructor-5.svg";
import { useAuthenticate } from "@/hooks/useAuthenticate";
import { useRouter } from "next/router";
import Tab, { TabHeaderItem } from "@/components/global/Tab";
import { axiosInstance } from "@/utils/axiosInstance";
import { NextPageWithLayout } from "./_app";

interface BecomeInstructorPageProps {
  instructors: IUser[];
}

export const getStaticProps: GetStaticProps<BecomeInstructorPageProps> = async () => {
  const instructorRes = await axiosInstance.get(`/api/users/instructors`);
  return {
    props: {
      instructors: instructorRes.data.body,
    },
  };
};

const BecomeInstructorPage: NextPageWithLayout<BecomeInstructorPageProps> = ({ instructors }) => {
  const data =
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.";

  const tabOne = (
    <div className="text-text text-md-regular">
      <div className="[&>p]:mb-4" dangerouslySetInnerHTML={{ __html: data }} />
    </div>
  );

  const tabHeaders: TabHeaderItem[] = [
    { name: "Багш, сургагчаар элсэх", slug: "become-instructor" },
    { name: "Дүрэм, шаардлага", slug: "rules" },
    { name: "Эхлэх", slug: "start" },
  ];

  const tabContents: JSX.Element[] = [tabOne];

  const { user, isLoading, mutate } = useAuthenticate();
  const router = useRouter();

  const submitHandler = (): void => {
    if (!user && !isLoading) {
      router.push("/auth/login");
    }

    if (user && !isLoading) {
      axiosInstance.post(`/api/users/becomeInstructor`).then((res) => {
        if (res.status === 200) {
          mutate({ ...user, role: { ...user.role, slug: "instructor" } });
          router.push("/instructors/dashboard");
        }
      });
    }
  };

  return (
    <>
      <Breadcrumbs
        breadcrumbItems={[{ title: "Багш, сургагчаар элсэх", link: "/become-instructor" }]}
      />
      <div className="container">
        <div className="flex flex-col text-center gap-1 mb-[60px]">
          <h1 className="font-[700] text-[40px] leading-[47px] text-head">
            Багш, сургагчаар элсэх
          </h1>
          <p className="text-lg-regular text-text">
            We’re on a mission to deliver engaging, curated courses at a reasonable price.
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
            <h1 className="text-xl-medium text-head text-center mb-[9px]">Хүссэн бүхнээ сур</h1>
            <p className="text-center text-text font-[400] text-[14px] leading-[24px]">
              Grursus mal suada faci lisis that ipsum ameti consecte.
            </p>
          </div>

          <div className="rounded-lg flex flex-col items-center px-[34px] py-[42px] hover:bg-[#FFFFFF] hover:shadow-shadow-4 cursor-pointer">
            <Image src={online} alt="" className="mb-5" />
            <h1 className="text-xl-medium text-head text-center mb-[9px]">
              Багш нарыг дэмжих арга зам
            </h1>
            <p className="text-center text-text font-[400] text-[14px] leading-[24px]">
              Grursus mal suada faci lisis that ipsum ameti consecte.
            </p>
          </div>

          <div className="rounded-lg flex flex-col items-center px-[34px] py-[42px] hover:bg-[#FFFFFF] hover:shadow-shadow-4 cursor-pointer">
            <Image src={certificate} alt="" className="mb-5" />
            <h1 className="text-xl-medium text-head text-center mb-[9px]">Дэлхийн стандарт</h1>
            <p className="text-center text-text font-[400] text-[14px] leading-[24px]">
              Grursus mal suada faci lisis that ipsum ameti consecte.
            </p>
          </div>
        </div>

        <div className="px-[276px] mb-[120px]">
          <Tab tabHeaders={tabHeaders} tabContents={tabContents} />
        </div>
      </div>
      <div className="bg-bg-1 w-screen">
        <div className="container pt-[120px] pb-[183px] flex gap-[174px] items-center">
          <div className="relative">
            <div className="w-[600px] h-[600px] rounded-full overflow-hidden bg-color-1">
              <Image src={main} alt="" className="w-full aspect-square object-cover " />
            </div>
            <div className="absolute flex flex-col p-[40px] bg-white right-[-60px] bottom-[-70px] rounded-lg w-[360px] gap-[30px] text-head shadow-shadow-4">
              <div className="bg-[#E8543E] rounded-[60px] text-white font-[500] leading-[13px] text-[11px] px-[17px] py-[8px] w-[50%] text-center">
                ОНЦЛОХ БАГШ
              </div>
              <p className="font-[500] leading-[30px] text-[18px]">
                “Teaching on Intellisense platform has been an amazing experience”
              </p>
              <div>
                <p className="text-md-medium">Ali Tufan</p>
                <span className="text-sm-regular text-texts">Designer, Apple Inc</span>
              </div>
            </div>
          </div>
          <div className="w-[50%]">
            <h1 className="text-4xl-bold text-head mb-[25px] w-[80%]">
              <span className="text-color-1">Яг Одоо </span> <br />
              Багш болцгооё
            </h1>
            <p className="text-md-regular text-head mb-[30px]  w-[60%]">
              Use the list below to bring attention to your product’s key differentiator.
            </p>
            <button onClick={submitHandler} className="btn-3">
              Манай Багт Нэгдээрэй
            </button>
          </div>
        </div>
      </div>
      <BestInstructorSection instructors={instructors} />
    </>
  );
};
export default BecomeInstructorPage;
