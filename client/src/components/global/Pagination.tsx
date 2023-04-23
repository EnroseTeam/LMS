import { useRouter } from "next/router";
import { FC, useState } from "react";

import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

interface PaginationProps {
  totalPage: number;
}

const Pagination: FC<PaginationProps> = ({ totalPage }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(Number(router.query.page) || 1);

  const navigateToPrev = (): void => {
    setCurrentPage(currentPage - 1);
    router.push({
      query: { ...router.query, page: currentPage - 1 },
    });
  };

  const navigateToNext = (): void => {
    setCurrentPage(currentPage + 1);
    router.push({
      query: { ...router.query, page: currentPage + 1 },
    });
  };

  const navigateToPage = (page: number): void => {
    setCurrentPage(page);
    router.push({
      query: { ...router.query, page },
    });
  };

  return (
    <div className="w-full grid place-items-center">
      <div className="flex items-center gap-10">
        {/* Prev Button */}
        <button
          onClick={navigateToPrev}
          disabled={currentPage === 1}
          className="w-[45px] h-[45px] bg-color-1 rounded-full text-white grid place-items-center hover:bg-color-1/70 duration-300 disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          <BiChevronLeft size={22} />
        </button>

        <nav className="text-head text-sm-medium">
          <div className="flex items-center gap-7 [&>button]:py-1">
            {/* First Page */}
            <button
              onClick={(): void => {
                navigateToPage(1);
              }}
              disabled={currentPage === 1}
              className={`hover:text-head/70 duration-300 ${
                currentPage === 1 ? "text-color-1 border-b-2 border-b-color-1" : ""
              }`}
            >
              1
            </button>

            {/* First Dots */}
            {totalPage > currentPage && currentPage - 1 >= 3 && (
              <span className="select-none">...</span>
            )}

            {totalPage > currentPage && currentPage === totalPage && (
              <button
                onClick={(): void => {
                  navigateToPage(currentPage - 2);
                }}
                className={`hover:text-head/70 duration-300 `}
              >
                {currentPage - 2}
              </button>
            )}

            {/* Prev Page */}
            {totalPage > currentPage && currentPage - 1 > 1 && (
              <button
                onClick={(): void => {
                  navigateToPage(currentPage - 1);
                }}
                className={`hover:text-head/70 duration-300 `}
              >
                {currentPage - 1}
              </button>
            )}

            {/* Current Page */}
            {totalPage > currentPage && currentPage !== 1 && currentPage !== totalPage && (
              <button disabled className="text-color-1 border-b-2 border-b-color-1">
                {currentPage}
              </button>
            )}

            {/* Next Page */}
            {totalPage > currentPage && totalPage - currentPage > 1 && (
              <button
                onClick={(): void => {
                  navigateToPage(currentPage + 1);
                }}
                className={`hover:text-head/70 duration-300 `}
              >
                {currentPage + 1}
              </button>
            )}

            {totalPage > currentPage && totalPage - currentPage > 2 && currentPage === 1 && (
              <button
                onClick={(): void => {
                  navigateToPage(currentPage + 2);
                }}
                className={`hover:text-head/70 duration-300 `}
              >
                {currentPage + 2}
              </button>
            )}

            {/* Last Dots */}
            {totalPage > currentPage && totalPage - currentPage >= 3 && (
              <span className="select-none">...</span>
            )}

            {/* Last Page */}
            {totalPage > currentPage && (
              <button
                onClick={(): void => {
                  navigateToPage(totalPage);
                }}
                disabled={currentPage === totalPage}
                className={`hover:text-head/70 duration-300 ${
                  currentPage === totalPage ? "text-color-1 border-b-2 border-b-color-1" : ""
                }`}
              >
                {totalPage}
              </button>
            )}
          </div>
        </nav>

        {/* Next Button */}
        <button
          onClick={navigateToNext}
          disabled={currentPage === totalPage}
          className="w-[45px] h-[45px] bg-color-1 rounded-full text-white grid place-items-center hover:bg-color-1/70 duration-300 disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          <BiChevronRight size={22} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
