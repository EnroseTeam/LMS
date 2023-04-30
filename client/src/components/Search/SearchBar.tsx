import { FC } from "react";
import Link from "next/link";

import { RxCross2 } from "react-icons/rx";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  searchBarShow: boolean;
  setSearchBarShow: (state: boolean) => void;
}

const SearchBar: FC<SearchBarProps> = ({ searchBarShow, setSearchBarShow }) => (
  <>
    <div
      className={`${
        searchBarShow
          ? "opacity-100 top-0"
          : "opacity-0 pointer-events-none top-[-100%]"
      } fixed w-screen bg-white text-head duration-150 z-[9999]`}
    >
      <div className="max-w-[1390px] mx-auto mt-[100px] mb-[97px]">
        <div className="relative flex gap-4 justify-between items-center border-b mb-[51px]">
          <FiSearch className="text-icon" size={25} />
          <input
            type="text"
            placeholder="Та юу сурахыг хүсэж байна вэ?"
            className="w-full h-full py-[19px] focus:outline-none text-xl-medium placeholder:text-head"
          />
          <button
            className="absolute right-0 text-icon p-3 rounded-full bg-color-1/[.07]"
            onClick={(): void => {
              setSearchBarShow(false);
            }}
          >
            <RxCross2 size={16} />
          </button>
        </div>
        <h1 className="text-lg-medium mb-5">Яг одоо эрэлттэй</h1>
        <ul className="mb-[30px] max-content">
          <li className="text-[15px] font-normal leading-[35px] hover:font-medium hover:text-color-1 hover:underline">
            <Link href="#">
              The Ultimate Drawing Course - Beginner to Advanced
            </Link>
          </li>
          <li className="text-[15px] font-normal leading-[35px] hover:font-medium hover:text-color-1 hover:underline">
            <Link href="#">
              The Ultimate Drawing Course - Beginner to Advanced
            </Link>
          </li>
          <li className="text-[15px] font-normal leading-[35px] hover:font-medium hover:text-color-1 hover:underline">
            <Link href="#">
              The Ultimate Drawing Course - Beginner to Advanced
            </Link>
          </li>
          <li className="text-[15px] font-normal leading-[35px] hover:font-medium hover:text-color-1 hover:underline">
            <Link href="#">
              The Ultimate Drawing Course - Beginner to Advanced
            </Link>
          </li>
          <li className="text-[15px] font-normal leading-[35px] hover:font-medium hover:text-color-1 hover:underline">
            <Link href="#">
              The Ultimate Drawing Course - Beginner to Advanced
            </Link>
          </li>
        </ul>

        <Link
          href="#"
          className="text-text font-medium [text-15px] leading-[35px] hover:text-color-1 hover:underline"
        >
          PRESS ENTER TO SEE ALL SEARCH RESULTS
        </Link>
      </div>
    </div>
    <div
      className={`${
        searchBarShow ? "opacity-50" : "opacity-0 pointer-events-none"
      } fixed w-screen h-screen bg-black top-0 left-0 right-0 bottom-0 duration-150`}
      onClick={(): void => {
        setSearchBarShow(false);
      }}
    />
  </>
);

export default SearchBar;
