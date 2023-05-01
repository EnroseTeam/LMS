import { FC, useEffect, useState } from "react";
import Link from "next/link";

import { RxCross2 } from "react-icons/rx";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/router";

interface SearchBarProps {
  searchBarShow: boolean;
  setSearchBarShow: (state: boolean) => void;
}

const SearchBar: FC<SearchBarProps> = ({ searchBarShow, setSearchBarShow }) => {
  const router = useRouter();
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    if (router.query.qAll) {
      setInput(router.query.qAll as string);
    }

    return () => {
      setInput("");
    };
  }, [router.pathname]);

  const searchHandler = (): void => {
    setSearchBarShow(false);
    if (input !== "") {
      router.push({
        query: { qAll: input },
        pathname: "/search",
      });
    } else {
      delete router.query.qAll;
      router.push({
        query: router.query,
        pathname: "/search",
      });
    }
  };
  return (
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
            <label htmlFor="search">
              <FiSearch className="text-icon" size={25} />
            </label>
            <input
              id="search"
              type="text"
              placeholder="Та юу сурахыг хүсэж байна вэ?"
              className="w-full h-full py-[19px] focus:outline-none text-xl-medium placeholder:text-head"
              value={input}
              onChange={(e): void => {
                setInput(e.target.value);
              }}
              onKeyDown={(e): void => {
                if (e.key === "Enter") {
                  searchHandler();
                }
              }}
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

          <button
            onClick={searchHandler}
            className="text-text font-medium [text-15px] leading-[35px] hover:text-color-1 hover:underline"
          >
            PRESS ENTER TO SEE ALL SEARCH RESULTS
          </button>
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
};

export default SearchBar;
