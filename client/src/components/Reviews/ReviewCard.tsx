import Image from "next/image";
import { FC } from "react";
import RatingStar from "../global/RatingStar";

import { ICourseReview } from "@/interfaces/courses";

interface ReviewCardProps {
  review: ICourseReview;
}

const ReviewCard: FC<ReviewCardProps> = ({ review }) => (
  <div className="flex items-start gap-5 pb-[58px] border-b border-b-border-1">
    <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
      <Image
        alt="Review"
        src={review.user.avatar}
        width={60}
        height={60}
        className="object-cover w-full aspect-square"
      />
    </div>

    <div className="flex-1">
      <div className="flex items-center gap-[5px] mb-[10px]">
        <h2 className="text-head text-lg-medium">{review.user.firstName}</h2>
        <span className="text-text text-xs-regular mt-[3px]">
          {new Date(review.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </span>
      </div>
      <div className="flex items-center gap-[10px]">
        <p className="text-[#E59819] text-sm-medium mt-[2px]">
          {review.rating.toFixed(1)}
        </p>
        <RatingStar gap={5} count={5} rating={review.rating} size={12} />
      </div>
      <h1 className="text-head text-lg-medium mb-[9px] mt-[15px]">
        {review.title}
      </h1>
      <p className="text-text text-md-regular">{review.text}</p>
    </div>
  </div>
);

export default ReviewCard;
