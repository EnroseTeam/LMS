import DashboardLayout from "@/layouts/DashboardLayout";
import { ReactNode, useState } from "react";

import { HiMagnifyingGlass } from "react-icons/hi2";
import { BsChevronDown } from "react-icons/bs";
import InstructorReviewCard from "@/components/Instructors/Dashboard/ReviewCard";
import { NextPageWithLayout } from "@/pages/_app";

const InstructorReviewPage: NextPageWithLayout = () => {
  const [dropSort, setDropSort] = useState(false);
  const [dropRate, setDropRate] = useState(false);

  const dropSortHandler = (): void => {
    setDropSort(!dropSort);
    setDropRate(!setDropSort);
  };
  const dropRateHandler = (): void => {
    setDropRate(!dropRate);
    setDropSort(!setDropRate);
  };
  return (
    <>
      <h1 className="text-head text-3xl-bold mb-[9px]">Сэтгэгдэлүүд</h1>
      <p className="text-text text-md-regular mb-[60px]">Ирсэн сэтгэгдлүүд</p>
      <div className="w-full bg-white rounded-lg shadow-shadow-dashboard py-[20px]">
        <h2 className="text-head text-lg-medium px-[30px] pb-[19px] mb-[30px] border-b border-b-border-1">
          Зураг болон бичлэг
        </h2>
        <div className="px-[30px]">
          <div className="flex items-center justify-between mb-[30px]">
            <div className="w-1/4 border border-border-2 rounded-lg pl-[18px] flex items-center gap-5 text-text overflow-hidden focus-within:ring-2 focus-within:ring-color-1 duration-150">
              <label htmlFor="">
                <HiMagnifyingGlass size={20} />
              </label>
              <input
                type="text"
                className="flex-1 py-[15px] h-full focus:outline-none placeholder:text-text text-sm-regular"
                placeholder="Хайх"
              />
            </div>
            <div className="flex gap-[22px]">
              <div className="relative">
                <button
                  onClick={dropRateHandler}
                  className="text-sm-regular text-text py-[17px] px-[15px] border border-border-2 rounded-lg flex items-center justify-between gap-[23px]"
                >
                  Үнэлгээ
                  <BsChevronDown
                    className={`duration-300 ${
                      dropRate ? "rotate-[-180deg]" : "rotate-0"
                    }`}
                  />
                </button>
                <div
                  className={`${
                    dropRate ? "opacity-100" : "opacity-0 pointer-events-none"
                  } absolute top-[60px] z-[10] border bg-white border-border-2 rounded-lg py-[17px] px-[15px] duration-300 shadow-sm w-full`}
                >
                  <ul className="flex flex-col gap-3 text-sm-regular text-text">
                    <li>hi</li>
                    <li>hello</li>
                  </ul>
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={dropSortHandler}
                  className="text-sm-regular text-text py-[17px] px-[15px] border border-border-2 rounded-lg flex items-center justify-between gap-[23px]"
                >
                  Эрэмбэ
                  <BsChevronDown
                    className={`duration-300 ${
                      dropSort ? "rotate-[-180deg]" : "rotate-0"
                    }`}
                  />
                </button>
                <div
                  className={`${
                    dropSort ? "opacity-100" : "opacity-0 pointer-events-none"
                  } absolute top-[60px] z-[10] bg-white border border-border-2 rounded-lg py-[17px] px-[15px] duration-300 shadow-sm w-full`}
                >
                  <ul className="flex flex-col gap-3 text-sm-regular text-text">
                    <li>hi</li>
                    <li>hello</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[60px]">
            <InstructorReviewCard />
            <InstructorReviewCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorReviewPage;

InstructorReviewPage.getLayout = function getLayout(page): ReactNode {
  return <DashboardLayout>{page}</DashboardLayout>;
};
