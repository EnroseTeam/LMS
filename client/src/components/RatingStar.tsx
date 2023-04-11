import { FC } from 'react';

interface RatingStarProps {
  className?: string;
}

const RatingStar: FC<RatingStarProps> = ({ className }) => (
  <svg
    width="10"
    height="11"
    viewBox="0 0 10 11"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4.46355 1.24776L3.24299 3.83338L0.512158 4.24935C0.0224388 4.32355 -0.173823 4.95434 0.181317 5.31562L2.15701 7.32709L1.68973 10.1685C1.60561 10.6821 2.12337 11.0669 2.55701 10.8267L5 9.48503L7.44299 10.8267C7.87663 11.0649 8.39439 10.6821 8.31028 10.1685L7.84299 7.32709L9.81868 5.31562C10.1738 4.95434 9.97756 4.32355 9.48784 4.24935L6.75701 3.83338L5.53645 1.24776C5.31776 0.786883 4.68411 0.781024 4.46355 1.24776Z" />
  </svg>
);

export default RatingStar;
