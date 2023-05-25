import "swiper/css";

import Breadcrumbs from "@/components/global/Breadcrumbs";
import BestInstructorSection from "@/components/Home/BestInstructorSection";
import { GetStaticProps } from "next";
import Image from "next/image";

import rating from "../assets/instructor-1.svg";
import science from "../assets/instructor-2.svg";
import online from "../assets/instructor-3.svg";
import certificate from "../assets/instructor-4.svg";
import main from "../assets/instructor-5.svg";
import { useRouter } from "next/router";
import Tab, { TabHeaderItem } from "@/components/global/Tab";
import { axiosInstance } from "@/utils/axiosInstance";
import { NextPageWithLayout } from "./_app";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { IUser } from "@/interfaces/user";

interface BecomeInstructorPageProps {
  instructors: IUser[];
}

export const getStaticProps: GetStaticProps<
  BecomeInstructorPageProps
> = async () => {
  const instructorRes = await axiosInstance.get<{ body: IUser[] }>(
    `/api/instructors`
  );
  return {
    props: {
      instructors: instructorRes.data.body,
    },
  };
};

const BecomeInstructorPage: NextPageWithLayout<BecomeInstructorPageProps> = ({
  instructors,
}) => {
  const data =
    "Бид таны хичээлүүдийг таны зөвшөөрөлгүй https://intellisense.e-cpta.mn/ сайтаас өөр газар, өөр байдлаар ашиглахгүй. Та өөрийн видеонуудыг https://intellisense.e-cpta.mn/ сайтаас өөр газарт байрлуулах, хувилан зарах бүрэн эрхтэй. Таны видеонуудыг өөр хүмүүс ямар нэг байдлаар https://intellisense.e-cpta.mn/ сайтаас хуулбарлан авсан тохиолдолд бид хариуцлага хүлээхгүй болно. Учир нь ийм боломж үргэлж байдаг. Та дээрх нөхцлийг зөвшөөрсний үндсэн дээр багш болох боломжтой. ";

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

  const { user, isUserLoading, setUser } = useContext(AuthContext);
  const router = useRouter();

  const submitHandler = (): void => {
    if (!user && !isUserLoading) {
      router.push("/auth/login");
    }

    if (user && !isUserLoading) {
      axiosInstance.post(`/api/instructors/becomeInstructor`).then((res) => {
        if (res.status === 200) {
          setUser({ ...user, role: "Instructor" });
          router.push("/instructors/dashboard");
        }
      });
    }
  };

  return (
    <>
      <Breadcrumbs
        breadcrumbItems={[
          { title: "Багш, сургагчаар элсэх", link: "/become-instructor" },
        ]}
      />
      <div className="container px-10">
        <div className="flex flex-col text-center gap-1 mb-[60px]">
          <h1 className="font-[700] text-[40px] leading-[47px] pb-10 text-head">
            Багш, сургагчаар элсэх
          </h1>
          <p className="text-lg-regular text-text">
            Таны сургалтыг худалдаж авсан хүн бүрээс та 50%-70% цэвэр ашиг авах
            болно! Та хичээлээ оруулаад л боллоо.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-[50px] mb-[60px]">
          <div className="rounded-lg flex flex-col items-center lg:px-[34px] lg:py-[42px] hover:bg-[#FFFFFF] hover:shadow-shadow-4 cursor-pointer ">
            <Image src={rating} alt="" className="mb-5" />
            <h1 className="text-xl-medium text-head text-center mb-[9px]">
              Мэргэжилтнүүдтэй хамт суралц
            </h1>
            <p className="text-center text-text font-[400] text-[14px] leading-[24px]">
              Өөрийгөө хөгжүүлэх нь чиний зорилго болж, хөгжүүлэхийн тулд юу юу
              хийх вэ гэдэг нь төлөвлөгөө чинь болно.
            </p>
          </div>

          <div className="rounded-lg flex flex-col items-center px-[34px] py-[42px] hover:bg-[#FFFFFF] hover:shadow-shadow-4 cursor-pointer">
            <Image src={science} alt="" className="mb-5" />
            <h1 className="text-xl-medium text-head text-center mb-[9px]">
              Хүссэн бүхнээ сур
            </h1>
            <p className="text-center text-text font-[400] text-[14px] leading-[24px]">
              Ямар ч сэдвээр зааж болох бөгөөд Та хэдэн ч сургалт явуулж болно.
            </p>
          </div>

          <div className="rounded-lg flex flex-col items-center px-[34px] py-[42px] hover:bg-[#FFFFFF] hover:shadow-shadow-4 cursor-pointer">
            <Image src={online} alt="" className="mb-5" />
            <h1 className="text-xl-medium text-head text-center mb-[9px]">
              Багш нарыг дэмжих арга зам
            </h1>
            <p className="text-center text-text font-[400] text-[14px] leading-[24px]">
              Худалдан авалт бүрээс 50%-70% цэвэр ашиг
            </p>
          </div>

          <div className="rounded-lg flex flex-col items-center px-[34px] py-[42px] hover:bg-[#FFFFFF] hover:shadow-shadow-4 cursor-pointer">
            <Image src={certificate} alt="" className="mb-5" />
            <h1 className="text-xl-medium text-head text-center mb-[9px]">
              Дэлхийн стандарт
            </h1>
            <p className="text-center text-text font-[400] text-[14px] leading-[24px]">
              Олон улсын ISO/IEC 29110 стандарт нь бичил нэгжид (цаашид БН гэнэ)
              хэрэглэгдэнэ.
            </p>
          </div>
        </div>

        <div className="lg:px-[276px] lg:mb-[120px]">
          <Tab tabHeaders={tabHeaders} tabContents={tabContents} />
        </div>
      </div>
      <div className="bg-bg-1 w-screen">
        <div className="container flex-col lg:flex-row lg:items-center lg:justify-center pt-[120px] pb-24 lg:pb-[183px] flex gap-44 items-center">
          <div className="relative">
            <div className="md:ml-40 max-w-[600px] max-h-[600px] rounded-full overflow-hidden bg-color-1">
              <Image
                src={main}
                alt=""
                className="w-full aspect-square object-cover "
              />
            </div>
            <div className="absolute flex flex-col p-[40px] bg-white right-[-5px] lg:right-[-60px] bottom-[-70px] rounded-lg w-64 lg:w-[360px] gap-4 lg:gap-[30px] text-head shadow-shadow-4">
              <div className="bg-[#E8543E] rounded-[60px] text-white font-[500] leading-[13px] text-[11px] px-3 py-1 lg:px-[17px] lg:py-2 w-[80%] lg:w-[50%] text-center">
                ОНЦЛОХ БАГШ
              </div>
              <p className="font-[500] leading-[30px] text-[18px]">
                Nextjs, tailwindcss, typescript
              </p>
              <div>
                <p className="text-md-medium">Цогт Биндэръяа</p>
                <span className="text-sm-regular text-texts">
                  Програм хөгжүүлэгч
                </span>
              </div>
            </div>
          </div>
          <div className="w-[100%] lg:w-[50%] flex flex-col items-center lg:items-start lg:justify-start justify-center">
            <h1 className="lg:text-4xl-bold text-3xl-bold text-head text-center lg:text-left mb-4  lg:mb-[25px] w-[80%]">
              <span className="text-color-1">Яг Одоо </span> <br />
              Багш болцгооё
            </h1>
            <p className="text-md-regular text-center lg:text-left text-head mb-[30px]  w-[60%]">
              Танд бусадтай хуваалцах мэдлэг туршлага байгаа юу? өн заримдаа
              харьяа салбар, хэлтсийнхэнтэй харилцахгүй, мэдлэг болон мэдээллээ
              хуваалцахгүй байх үзэгдэл олон ажиглагддаг. Энэ нь мөн л
              байгууллагын эрүүл өрсөлдөөнд тооцогдохгүй. Үүнийг даршилсан
              сэтгэхүй/ гэж хэлж болно.
            </p>
            <button onClick={submitHandler} className=" btn-3 ">
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
