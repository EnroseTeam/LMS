import { FC } from 'react';
import { HiOutlineArrowUpRight } from 'react-icons/hi2';

interface ArrowButtonProps {
  children: string;
  className?: string;
}

const ArrowButton: FC<ArrowButtonProps> = ({ children, className }) => (
  <button
    className={`flex items-center gap-[13px] rounded-lg text-md-medium px-[29px] pt-[17px] pb-[13px] ${className}`}
  >
    <span>{children}</span>
    <HiOutlineArrowUpRight size={20} />
  </button>
);

export default ArrowButton;
