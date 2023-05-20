import DashboardLayout from "@/layouts/DashboardLayout";
import { ReactNode, useContext, useEffect, useState } from "react";
import useSwr from "swr";

import { HiMagnifyingGlass } from "react-icons/hi2";
import { BsChevronDown } from "react-icons/bs";
import InstructorReviewCard from "@/components/Instructors/Dashboard/Reviews/ReviewCard";
import { NextPageWithLayout } from "@/pages/_app";
import { fetcher } from "@/utils/fetcher";
import { ICourseReview } from "@/interfaces/courses";
import UserReviewSkeleton from "@/components/Skeletons/UserReviewSkeleton";
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";

const sortItems = [
  { title: "Шинэ", value: "dateDesc" },
  { title: "Хуучин", value: "dateAsc" },
  { title: "Үнэлгээ", value: "ratingDesc" },
];

const InstructorReviewPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [dropSort, setDropSort] = useState(false);

  const [reviews, setReviews] = useState<ICourseReview[]>([]);

  const { user } = useContext(AuthContext);

  const { data: instructorReviews, isLoading: reviewsLoading } = useSwr(
    `/api/courses/reviews/instructor`,
    fetcher<{ body: ICourseReview[] }>
  );

  const [search, setSearch] = useState<string>(router.query.q as string);

  useEffect(() => {
    if (!reviewsLoading && instructorReviews) {
      setReviews(instructorReviews.body);
    }
  }, [instructorReviews, reviewsLoading]);

  useEffect(() => {
    if (instructorReviews) {
      if (router.query.q) {
        setReviews(
          instructorReviews.body.filter(
            (review) =>
              review.user.fullName
                .toLowerCase()
                .includes((router.query.q as string).toLowerCase()) ||
              review.text?.toLowerCase().includes((router.query.q as string).toLowerCase()) ||
              review.title.toLowerCase().includes((router.query.q as string).toLowerCase())
          )
        );
      } else {
        setReviews(instructorReviews.body);
      }
    }
  }, [router, instructorReviews]);

  const searchHandler = (): void => {
    if (instructorReviews) {
      if (search) {
        router.push({
          query: { ...router.query, q: search },
        });
      } else {
        delete router.query.q;
        router.push({
          query: router.query,
        });
        setReviews(instructorReviews.body);
      }
    }
  };

  const sortHandler = (value: string): void => {
    if (instructorReviews) {
      if (value === "dateDesc") {
        const newReviews = [...instructorReviews.body];
        newReviews.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
        setReviews(newReviews);
      }

      if (value === "dateAsc") {
        const newReviews = [...instructorReviews.body];
        newReviews.sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));
        setReviews(newReviews);
      }
      if (value === "ratingDesc") {
        const newReviews = [...instructorReviews.body];
        newReviews.sort((a, b) => +b.rating - +a.rating);
        setReviews(newReviews);
      }
    }
  };

  const dropSortHandler = (): void => {
    setDropSort(!dropSort);
  };
  return (
    <>
      <h1 className="text-head text-3xl-bold mb-[9px]">Сэтгэгдэлүүд</h1>
      <p className="text-text text-md-regular mb-[60px]">Ирсэн сэтгэгдлүүд</p>
      <div className="w-full bg-white rounded-lg shadow-shadow-dashboard py-[20px]">
        <h2 className="text-head text-lg-medium px-[30px] pb-[19px] mb-[30px] border-b border-b-border-1">
          Бүх сэтгэгдлүүд
        </h2>
        <div className="px-[30px]">
          <div className="flex items-center justify-between mb-[30px]">
            <div className="w-1/4 border border-border-2 rounded-lg pl-[18px] flex items-center gap-5 text-text overflow-hidden focus-within:ring-2 focus-within:ring-color-1 duration-150">
              <label htmlFor="">
                <HiMagnifyingGlass size={20} />
              </label>
              <input
                value={search}
                onChange={(e): void => {
                  setSearch(e.target.value);
                }}
                onKeyDown={(e): void => {
                  if (e.key === "Enter") searchHandler();
                }}
                type="text"
                className="flex-1 py-[15px] h-full focus:outline-none placeholder:text-text text-sm-regular"
                placeholder="Хайх"
              />
            </div>
            <div className="flex gap-[22px]">
              <div className="relative">
                <button
                  onClick={dropSortHandler}
                  className="text-sm-regular text-text py-[17px] px-[15px] border border-border-2 rounded-lg flex items-center justify-between gap-[23px]"
                >
                  Эрэмбэ
                  <BsChevronDown
                    className={`duration-300 ${dropSort ? "rotate-[-180deg]" : "rotate-0"}`}
                  />
                </button>
                <div
                  className={`${
                    dropSort ? "opacity-100" : "opacity-0 pointer-events-none"
                  } absolute top-[60px] z-[10] bg-white border border-border-2 rounded-lg py-[17px] px-[15px] duration-300 shadow-sm w-full`}
                >
                  <div className="flex flex-col gap-3 text-sm-regular text-text">
                    {sortItems.map((item, index) => (
                      <button
                        onClick={(): void => {
                          sortHandler(item.value);
                        }}
                        className="text-left"
                        key={index}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[60px]">
            {reviewsLoading &&
              Array.from(Array(6)).map((val, index) => <UserReviewSkeleton key={index} />)}

            {!reviewsLoading &&
              reviews.length > 0 &&
              reviews.map((review) => (
                <InstructorReviewCard key={review._id} review={review} avatar={user?.avatar} />
              ))}
            {!reviewsLoading && reviews.length === 0 && <p>Танд ирсэн сэтгэгдэл байхгүй байна.</p>}
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
