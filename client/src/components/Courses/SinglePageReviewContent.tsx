import { FC, useState, useEffect, useCallback } from 'react';
import RatingStar from '../global/RatingStar';
import ReviewCard from '../Reviews/ReviewCard';
import { ICourseReview } from '@/interfaces/courses';

interface SinglePageReviewContentProps {
  reviews: ICourseReview[];
}

const SinglePageReviewContent: FC<SinglePageReviewContentProps> = ({ reviews }) => {
  const [intitalReviews, setInitialReviews] = useState<ICourseReview[]>(reviews.slice(0, 2));
  const [avgRating, setAvgRating] = useState<number>(0);
  const [ratingCount, setRatingCount] = useState<number[]>([0, 0, 0, 0, 0]);

  const findAvgRating = useCallback(() => {
    let totalRating = 0;
    reviews.map((review): void => {
      totalRating += review.rating;
    });
    setAvgRating(totalRating / reviews.length);
  }, [reviews]);

  const findRatingCount = useCallback(() => {
    const newRatingCount: number[] = [];

    for (let i = 1; i <= 5; i++) {
      newRatingCount.push(0);
      reviews.map((review): void => {
        if (review.rating >= i - 0.5 && review.rating < i + 0.5) newRatingCount[i - 1]++;
      });
    }

    setRatingCount(newRatingCount.reverse());
  }, [reviews]);

  useEffect(() => {
    findAvgRating();
    findRatingCount();
  }, [reviews, findAvgRating, findRatingCount]);

  return (
    <div>
      <h1 className="text-head text-xl font-medium leading-[23px] mb-[30px]">Student Feedback</h1>
      <div className="flex items-center gap-[10px] mb-[60px]">
        <div className="bg-bg-3 rounded-lg py-[50px] px-[94px] grid place-items-center">
          <h3 className="text-head text-[60px] font-medium leading-[70px] mb-2">
            {avgRating.toFixed(1)}
          </h3>
          <RatingStar count={avgRating} />
          <p className="text-text text-md-regular mt-[10px]">Course Rating</p>
        </div>

        <div className="bg-bg-3 rounded-lg py-[15px] px-[30px] flex-1 flex flex-col gap-0 text-right">
          {ratingCount.map((count, index) => {
            const percentage = ((count * 100) / reviews.length).toFixed(1);
            return (
              <div key={`rating-count-${index}`} className="flex items-center gap-4">
                <div className="flex-1 relative w-full h-[5px] rounded-[4px] bg-[#CCE0F8]">
                  <div
                    className={`absolute top-0 left-0 h-full rounded-[4px] bg-color-1`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <RatingStar count={5 - index} />
                <p className="text-head text-md-regular leading-[40px] w-[4ch]">{percentage}%</p>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h2 className="text-head text-xl font-medium leading-[23px] mb-[30px]">Reviews</h2>
        <div className="flex flex-col gap-[30px] mb-[30px]">
          {intitalReviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>

        {reviews.length > 2 && (
          <div className="w-full text-center">
            <button
              onClick={(): void =>
                intitalReviews.length > 2
                  ? setInitialReviews(reviews.slice(0, 2))
                  : setInitialReviews(reviews)
              }
              className="underline text-color-1 text-md-medium mb-[60px] hover:text-color-1/70 duration-300"
            >
              {intitalReviews.length > 2 ? 'Hide reviews' : 'View all reviews'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default SinglePageReviewContent;
