import { FC } from "react";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";

interface RatingStarProps {
  count?: number;
  rating?: number;
  gap?: number;
  size?: number;
}

const RatingStar: FC<RatingStarProps> = ({ rating = 0, count = 5, gap = 10, size = 14 }) => (
  <div className={`flex items-center gap-[${gap}px]`}>
    {Array.from(Array(Math.round(rating)), (value, index) => (
      <AiFillStar size={size} key={`rating-star-${index}`} color="#E59819" />
    ))}
    {Array.from(Array(count - Math.round(rating)), (value, index) => (
      <AiOutlineStar size={size} key={`rating-star-empty-${index}`} color="#E59819" />
    ))}
  </div>
);

export default RatingStar;
