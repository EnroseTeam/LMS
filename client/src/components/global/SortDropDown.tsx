import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";

import { BsChevronDown } from "react-icons/bs";

const SortDropDown: FC = () => {
  const router = useRouter();
  const [dropSort, setDropSort] = useState(false);
  const dropSortHandler = (): void => {
    setDropSort(!dropSort);
  };

  const sortItems = [
    { title: "Эрэлттэй", slug: "popular" },
    { title: "Шинэ", slug: "newest" },
    { title: "А-Я", slug: "nameAsc" },
    { title: "Я-А", slug: "nameDesc" },
  ];

  const [sort, setSort] = useState(sortItems[0]);

  useEffect(() => {
    if (router.query.sort) {
      sortItems.map((item) => item.slug === router.query.sort && setSort(item));
    }
  }, [router.query]);

  return (
    <div className="relative">
      <button
        onClick={dropSortHandler}
        className="bg-bg-4 whitespace-nowrap rounded-lg py-4 px-[15px] flex items-center justify-between text-text text-sm-regular w-[25ch]"
      >
        Эрэмбэ: {sort.title}
        <BsChevronDown className={`duration-300 ${dropSort ? "rotate-[-180deg]" : "rotate-0"}`} />
      </button>
      <div
        className={`${
          dropSort ? "opacity-100" : "opacity-0 pointer-events-none"
        } absolute top-[60px] z-[10] bg-bg-4 rounded-lg py-[22px] pl-[30px] pr-[50px] duration-300 shadow-lg w-full`}
      >
        <ul className="flex flex-col font-[400] text-[15px] leading-[35px] text-head ">
          {sortItems.map((item, index) => (
            <li
              onClick={(): void => {
                router.push({
                  query: { ...router.query, sort: item.slug },
                });
                setSort(item);
              }}
              key={`sort-item-${index}`}
              className="hover:text-color-1 whitespace-nowrap cursor-pointer hover:underline "
            >
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SortDropDown;
