import { AuthContext } from "@/contexts/AuthContext";
import { DashboardSidebarContext } from "@/contexts/DashboardSidebarContext";
import DashboardLayout from "@/layouts/DashboardLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { ReactNode, useContext } from "react";

import { AiOutlineTags, AiOutlinePlayCircle, AiOutlineComment } from "react-icons/ai";
import { SlGraduation } from "react-icons/sl";
import { BsFileEarmarkText, BsClock, BsBarChart } from "react-icons/bs";

import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";

import plcHolder from "@/assets/placeholder.png";

const InstructorDashboardPage: NextPageWithLayout = () => {
  const { user } = useContext(AuthContext);

  const { sidebarShow } = useContext(DashboardSidebarContext);

  return (
    <>
      <h1 className="text-head text-3xl-bold mb-[9px]">Хянах Самбар</h1>
      <p className="text-text text-md-regular mb-[60px]">Таны сургалтуудын талаарх мэдээлэл</p>
      <div
        className={classNames(
          "grid gap-[30px] mb-[30px] grid-cols-1 sm:grid-cols-2",
          { "lg:grid-cols-2": sidebarShow },
          { "lg:grid-cols-4": !sidebarShow }
        )}
      >
        <div className="bg-white rounded-2xl shadow-shadow-dashboard py-[35px] px-[30px] flex items-center justify-between  hover:bg-color-1 duration-300 group">
          <div className="space-y-[14px]">
            <h4 className="text-text text-md-medium group-hover:text-white duration-300">
              Нийт худалдаа
            </h4>
            <h1 className="text-head text-2xl-bold group-hover:text-white duration-300">
              ₮120,000
            </h1>
          </div>

          <div className="text-color-1 group-hover:text-white duration-300">
            <AiOutlineTags size={40} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-shadow-dashboard py-[35px] px-[30px] flex items-center justify-between  hover:bg-color-1 duration-300 group">
          <div className="space-y-[14px]">
            <h4 className="text-text text-md-medium group-hover:text-white duration-300">
              Нийт сургалтууд
            </h4>
            <h1 className="text-head text-2xl-bold group-hover:text-white duration-300">100</h1>
          </div>

          <div className="text-color-1 group-hover:text-white duration-300">
            <AiOutlinePlayCircle size={40} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-shadow-dashboard py-[35px] px-[30px] flex items-center justify-between  hover:bg-color-1 duration-300 group">
          <div className="space-y-[14px]">
            <h4 className="text-text text-md-medium group-hover:text-white duration-300">
              Нийт сурагчид
            </h4>
            <h1 className="text-head text-2xl-bold group-hover:text-white duration-300">1500</h1>
          </div>

          <div className="text-color-1 group-hover:text-white duration-300">
            <SlGraduation size={40} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-shadow-dashboard py-[35px] px-[30px] flex items-center justify-between  hover:bg-color-1 duration-300 group">
          <div className="space-y-[14px]">
            <h4 className="text-text text-md-medium group-hover:text-white duration-300">
              Нийт сэтгэгдлүүд
            </h4>
            <h1 className="text-head text-2xl-bold group-hover:text-white duration-300">3000</h1>
          </div>

          <div className="text-color-1 group-hover:text-white duration-300">
            <AiOutlineComment size={40} />
          </div>
        </div>
      </div>

      <div
        className={classNames(
          "grid gap-[30px] grid-cols-1",
          { "lg:grid-cols-1 xl:grid-cols-2": sidebarShow },
          { "lg:grid-cols-2 xl:grid-cols-3": !sidebarShow }
        )}
      >
        <div className="bg-white shadow-shadow-dashboard rounded-2xl">
          <div className="border-b border-border-1 px-[30px] py-5 flex items-center justify-between">
            <h1 className="text-head text-lg-medium">Сүүлд нэмэгдсэн сургалтууд</h1>
            <Link
              className="underline text-color-1 text-sm-medium hover:text-color-1/70 duration-300"
              href={"/instructors/dashboard/my-courses"}
            >
              Бүгдийг харах
            </Link>
          </div>

          <div className="p-[30px] space-y-5">
            <div className="pb-5 border-b border-border-1 grid grid-cols-5 gap-[15px]">
              <Link href={"/"} className="rounded-lg overflow-hidden relative group w-full block">
                <Image
                  src={plcHolder}
                  alt="Placeholder"
                  className="w-full h-full object-cover aspect-[1.13/1]"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 w-full group-hover:bg-color-2/50 duration-300" />
              </Link>

              <div className="col-span-4 space-y-[15px]">
                <h2 className="text-head text-md-medium">
                  Complete Python Bootcamp From Zero to Hero in Python
                </h2>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsFileEarmarkText size={16} />
                    <span>6 хичээл</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsClock size={16} />
                    <span>2 цаг 30 минут</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsBarChart size={16} />
                    <span>Анхан шат</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pb-5 border-b border-border-1 grid grid-cols-5 gap-[15px]">
              <Link href={"/"} className="rounded-lg overflow-hidden relative group w-full block">
                <Image
                  src={plcHolder}
                  alt="Placeholder"
                  className="w-full h-full object-cover aspect-[1.13/1]"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 w-full group-hover:bg-color-2/50 duration-300" />
              </Link>

              <div className="col-span-4 space-y-[15px]">
                <h2 className="text-head text-md-medium">
                  Complete Python Bootcamp From Zero to Hero in Python
                </h2>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsFileEarmarkText size={16} />
                    <span>6 хичээл</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsClock size={16} />
                    <span>2 цаг 30 минут</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsBarChart size={16} />
                    <span>Анхан шат</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pb-5 border-b border-border-1 grid grid-cols-5 gap-[15px]">
              <Link href={"/"} className="rounded-lg overflow-hidden relative group w-full block">
                <Image
                  src={plcHolder}
                  alt="Placeholder"
                  className="w-full h-full object-cover aspect-[1.13/1]"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 w-full group-hover:bg-color-2/50 duration-300" />
              </Link>

              <div className="col-span-4 space-y-[15px]">
                <h2 className="text-head text-md-medium">
                  Complete Python Bootcamp From Zero to Hero in Python
                </h2>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsFileEarmarkText size={16} />
                    <span>6 хичээл</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsClock size={16} />
                    <span>2 цаг 30 минут</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsBarChart size={16} />
                    <span>Анхан шат</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pb-5 grid grid-cols-5 gap-[15px]">
              <Link href={"/"} className="rounded-lg overflow-hidden relative group w-full block">
                <Image
                  src={plcHolder}
                  alt="Placeholder"
                  className="w-full h-full object-cover aspect-[1.13/1]"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 w-full group-hover:bg-color-2/50 duration-300" />
              </Link>

              <div className="col-span-4 space-y-[15px]">
                <h2 className="text-head text-md-medium">
                  Complete Python Bootcamp From Zero to Hero in Python
                </h2>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsFileEarmarkText size={16} />
                    <span>6 хичээл</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsClock size={16} />
                    <span>2 цаг 30 минут</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsBarChart size={16} />
                    <span>Анхан шат</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-shadow-dashboard rounded-2xl">
          <div className="border-b border-border-1 px-[30px] py-5 flex items-center justify-between">
            <h1 className="text-head text-lg-medium">Шинэ сэтгэгдлүүд</h1>
            <Link
              className="underline text-color-1 text-sm-medium hover:text-color-1/70 duration-300"
              href={"/instructors/dashboard/my-courses"}
            >
              Бүгдийг харах
            </Link>
          </div>

          <div className="p-[30px] space-y-5">
            <div className="pb-5 border-b border-border-1 grid grid-cols-5 gap-[15px]">
              <Link href={"/"} className="rounded-lg overflow-hidden relative group w-full block">
                <Image
                  src={plcHolder}
                  alt="Placeholder"
                  className="w-full h-full object-cover aspect-[1.13/1]"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 w-full group-hover:bg-color-2/50 duration-300" />
              </Link>

              <div className="col-span-4 space-y-[15px]">
                <h2 className="text-head text-md-medium">
                  Complete Python Bootcamp From Zero to Hero in Python
                </h2>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsFileEarmarkText size={16} />
                    <span>6 хичээл</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsClock size={16} />
                    <span>2 цаг 30 минут</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsBarChart size={16} />
                    <span>Анхан шат</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pb-5 border-b border-border-1 grid grid-cols-5 gap-[15px]">
              <Link href={"/"} className="rounded-lg overflow-hidden relative group w-full block">
                <Image
                  src={plcHolder}
                  alt="Placeholder"
                  className="w-full h-full object-cover aspect-[1.13/1]"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 w-full group-hover:bg-color-2/50 duration-300" />
              </Link>

              <div className="col-span-4 space-y-[15px]">
                <h2 className="text-head text-md-medium">
                  Complete Python Bootcamp From Zero to Hero in Python
                </h2>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsFileEarmarkText size={16} />
                    <span>6 хичээл</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsClock size={16} />
                    <span>2 цаг 30 минут</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsBarChart size={16} />
                    <span>Анхан шат</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pb-5 border-b border-border-1 grid grid-cols-5 gap-[15px]">
              <Link href={"/"} className="rounded-lg overflow-hidden relative group w-full block">
                <Image
                  src={plcHolder}
                  alt="Placeholder"
                  className="w-full h-full object-cover aspect-[1.13/1]"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 w-full group-hover:bg-color-2/50 duration-300" />
              </Link>

              <div className="col-span-4 space-y-[15px]">
                <h2 className="text-head text-md-medium">
                  Complete Python Bootcamp From Zero to Hero in Python
                </h2>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsFileEarmarkText size={16} />
                    <span>6 хичээл</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsClock size={16} />
                    <span>2 цаг 30 минут</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsBarChart size={16} />
                    <span>Анхан шат</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pb-5 grid grid-cols-5 gap-[15px]">
              <Link href={"/"} className="rounded-lg overflow-hidden relative group w-full block">
                <Image
                  src={plcHolder}
                  alt="Placeholder"
                  className="w-full h-full object-cover aspect-[1.13/1]"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 w-full group-hover:bg-color-2/50 duration-300" />
              </Link>

              <div className="col-span-4 space-y-[15px]">
                <h2 className="text-head text-md-medium">
                  Complete Python Bootcamp From Zero to Hero in Python
                </h2>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsFileEarmarkText size={16} />
                    <span>6 хичээл</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsClock size={16} />
                    <span>2 цаг 30 минут</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsBarChart size={16} />
                    <span>Анхан шат</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-shadow-dashboard rounded-2xl">
          <div className="border-b border-border-1 px-[30px] py-5 flex items-center justify-between">
            <h1 className="text-head text-lg-medium">Мэдэгдэл</h1>
            <Link
              className="underline text-color-1 text-sm-medium hover:text-color-1/70 duration-300"
              href={"/instructors/dashboard/my-courses"}
            >
              Бүгдийг харах
            </Link>
          </div>

          <div className="p-[30px] space-y-5">
            <div className="pb-5 border-b border-border-1 grid grid-cols-5 gap-[15px]">
              <Link href={"/"} className="rounded-lg overflow-hidden relative group w-full block">
                <Image
                  src={plcHolder}
                  alt="Placeholder"
                  className="w-full h-full object-cover aspect-[1.13/1]"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 w-full group-hover:bg-color-2/50 duration-300" />
              </Link>

              <div className="col-span-4 space-y-[15px]">
                <h2 className="text-head text-md-medium">
                  Complete Python Bootcamp From Zero to Hero in Python
                </h2>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsFileEarmarkText size={16} />
                    <span>6 хичээл</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsClock size={16} />
                    <span>2 цаг 30 минут</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsBarChart size={16} />
                    <span>Анхан шат</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pb-5 border-b border-border-1 grid grid-cols-5 gap-[15px]">
              <Link href={"/"} className="rounded-lg overflow-hidden relative group w-full block">
                <Image
                  src={plcHolder}
                  alt="Placeholder"
                  className="w-full h-full object-cover aspect-[1.13/1]"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 w-full group-hover:bg-color-2/50 duration-300" />
              </Link>

              <div className="col-span-4 space-y-[15px]">
                <h2 className="text-head text-md-medium">
                  Complete Python Bootcamp From Zero to Hero in Python
                </h2>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsFileEarmarkText size={16} />
                    <span>6 хичээл</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsClock size={16} />
                    <span>2 цаг 30 минут</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsBarChart size={16} />
                    <span>Анхан шат</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pb-5 border-b border-border-1 grid grid-cols-5 gap-[15px]">
              <Link href={"/"} className="rounded-lg overflow-hidden relative group w-full block">
                <Image
                  src={plcHolder}
                  alt="Placeholder"
                  className="w-full h-full object-cover aspect-[1.13/1]"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 w-full group-hover:bg-color-2/50 duration-300" />
              </Link>

              <div className="col-span-4 space-y-[15px]">
                <h2 className="text-head text-md-medium">
                  Complete Python Bootcamp From Zero to Hero in Python
                </h2>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsFileEarmarkText size={16} />
                    <span>6 хичээл</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsClock size={16} />
                    <span>2 цаг 30 минут</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsBarChart size={16} />
                    <span>Анхан шат</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pb-5 grid grid-cols-5 gap-[15px]">
              <Link href={"/"} className="rounded-lg overflow-hidden relative group w-full block">
                <Image
                  src={plcHolder}
                  alt="Placeholder"
                  className="w-full h-full object-cover aspect-[1.13/1]"
                />
                <div className="absolute top-0 left-0 right-0 bottom-0 w-full group-hover:bg-color-2/50 duration-300" />
              </Link>

              <div className="col-span-4 space-y-[15px]">
                <h2 className="text-head text-md-medium">
                  Complete Python Bootcamp From Zero to Hero in Python
                </h2>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsFileEarmarkText size={16} />
                    <span>6 хичээл</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsClock size={16} />
                    <span>2 цаг 30 минут</span>
                  </div>

                  <div className="flex items-center gap-1 text-text text-sm-regular">
                    <BsBarChart size={16} />
                    <span>Анхан шат</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorDashboardPage;

InstructorDashboardPage.getLayout = function getLayout(page): ReactNode {
  return <DashboardLayout>{page}</DashboardLayout>;
};
