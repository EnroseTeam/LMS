import { useAuthenticate } from "@/hooks/useAuthenticate";
import { FC } from "react";

import { HiMagnifyingGlass } from "react-icons/hi2";
import { HiChevronDown } from "react-icons/hi";

const InstructorCoursesPage: FC = () => {
  const { user } = useAuthenticate();

  return (
    <>
      <h1 className="text-head text-3xl-bold mb-[9px]">Миний сургалтууд</h1>
      <p className="text-text text-md-regular mb-[60px]">
        Миний үүсгэсэн сургалтууд
      </p>
      <div className="w-full rounded-2xl bg-white shadow-shadow dashboard p-[30px]">
        <div className="grid grid-cols-2 mb-[30px]">
          <div className="w-1/2 border border-border-2 rounded-lg pl-[18px] flex items-center gap-5 text-text overflow-hidden focus-within:ring-2 focus-within:ring-color-1 duration-150">
            <label className="text-xl" htmlFor="search">
              <HiMagnifyingGlass />
            </label>
            <input
              type="text"
              className="flex-1 py-[15px] h-full focus:outline-none placeholder:text-text text-sm-regular"
              placeholder="Хайх"
            />
          </div>

          <div className="flex items-center justify-end text-text text-sm-regular gap-5">
            <div className="relative">
              <button className="flex items-center gap-5 py-4 px-[18px] border border-border-1 rounded-lg overflow-hidden">
                Ангилал
                <HiChevronDown size={18} />
              </button>
            </div>
            <div className="relative">
              <button className="flex items-center gap-5 py-4 px-[18px] border border-border-1 rounded-lg overflow-hidden">
                Үнэлгээ
                <HiChevronDown size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 mb-[30px]"></div>
      </div>
    </>
  );
};

export default InstructorCoursesPage;
