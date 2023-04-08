import { FC } from 'react';

interface ButtonProps {
  className?: string;
  children: string;
}

const Button: FC<ButtonProps> = ({ className, children }) => (
  <button className={`text-base-medium px-[55px] py-[21px] rounded-lg ${className}`}>
    {children}
  </button>
);
export default Button;
