import { FC } from 'react';

import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface RatingStarProps {
  count?: number;
  gap?: number;
  size?: number;
}

const RatingStar: FC<RatingStarProps> = ({ count = 0, gap = 10, size = 14 }) => {
  const maxStars = 5;

  return (
    <div className={`flex items-center gap-[${gap}px]`}>
      {Array.from(Array(Math.round(count)), (value, index) => (
        <AiFillStar size={size} key={`rating-star-${index}`} color="#E59819" />
      ))}
      {Array.from(Array(maxStars - Math.round(count)), (value, index) => (
        <AiOutlineStar size={size} key={`rating-star-empty-${index}`} color="#E59819" />
      ))}
    </div>
  );
};

export default RatingStar;
