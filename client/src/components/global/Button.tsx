import { FC } from "react";

interface ButtonProps {
  className?: string;
  type?: "button" | "submit" | "reset";
  children: string;
}

const Button: FC<ButtonProps> = ({ className, children, type = "button" }) => (
  <button type={type} className={`text-md-medium px-[40px] py-[20px] rounded-lg ${className}`}>
    {children}
  </button>
);
export default Button;
