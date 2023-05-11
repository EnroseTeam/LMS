import { FC, useState, useEffect, useCallback } from "react";
import RatingStar from "../global/RatingStar";
import ReviewCard from "../Reviews/ReviewCard";
import { ICourse, ICourseReview } from "@/interfaces/courses";
import ReviewForm from "../Reviews/ReviewForm";

interface SinglePageReviewContentProps {
  course: ICourse;
}

const SinglePageReviewContent: FC<SinglePageReviewContentProps> = ({ course }) => {
  const [intitalReviews, setInitialReviews] = useState<ICourseReview[]>(
    course.reviews.reverse().slice(0, 2)
  );
  const [ratingCount, setRatingCount] = useState<number[]>([0, 0, 0, 0, 0]);

  const findRatingCount = useCallback(() => {
    const newRatingCount: number[] = [];

    for (let i = 1; i <= 5; i++) {
      newRatingCount.push(0);
      course.reviews.map((review): void => {
        if (review.rating >= i - 0.5 && review.rating < i + 0.5) newRatingCount[i - 1]++;
      });
    }

    setRatingCount(newRatingCount.reverse());
  }, [course.reviews]);

  useEffect(() => {
    findRatingCount();
  }, [course.reviews, findRatingCount]);

  const afterSubmit = (review: ICourseReview): void => {
    setInitialReviews([review, ...intitalReviews]);
  };

  return (
    <div>
      <h1 className="text-head text-xl font-medium leading-[23px] mb-[30px]">Сурагчдын үнэлгээ</h1>
      <div className="flex flex-col sm:flex-row items-center gap-[10px] mb-[60px]">
        <div className="bg-bg-3 rounded-lg py-[50px] px-[94px] grid place-items-center w-full sm:w-fit">
          <h3 className="text-head text-[60px] font-medium leading-[70px] mb-2">
            {course.avgRating.toFixed(1)}
          </h3>
          <RatingStar count={5} rating={course.avgRating} />
          <p className="text-text text-md-regular mt-[10px]">Дундаж үнэлгээ</p>
        </div>

        <div className="bg-bg-3 rounded-lg py-[15px] px-[30px] flex-1 flex flex-col gap-0 text-right w-full sm:w-fit">
          {ratingCount.map((count, index) => {
            const percentage = ((count * 100) / course.reviews.length).toFixed(1);
            return (
              <div key={`rating-count-${index}`} className="flex items-center gap-4">
                <div className="flex-1 relative w-full h-[5px] rounded-[4px] bg-[#CCE0F8]">
                  <div
                    className={`absolute top-0 left-0 h-full rounded-[4px] bg-color-1`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <RatingStar count={5} rating={5 - index} gap={5} />
                <p className="text-head text-md-regular leading-[40px] w-[4ch]">{percentage}%</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mb-[59px]">
        <h2 className="text-head text-xl font-medium leading-[23px] mb-[30px]">Сэтгэгдлүүд</h2>
        <div className="flex flex-col gap-[30px] mb-[30px]">
          {intitalReviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>

        {course.reviews.length > 2 && (
          <div className="w-full text-center">
            <button
              onClick={(): void =>
                intitalReviews.length > 2
                  ? setInitialReviews(course.reviews.slice(0, 2))
                  : setInitialReviews(course.reviews)
              }
              className="underline text-color-1 text-md-medium mb-[60px] hover:text-color-1/70 duration-300"
            >
              {intitalReviews.length > 2 ? "Хураангуй" : "Дэлгэрэнгүй"}
            </button>
          </div>
        )}
      </div>
      <ReviewForm courseId={course._id} afterSubmit={afterSubmit} />
    </div>
  );
};
export default SinglePageReviewContent;
