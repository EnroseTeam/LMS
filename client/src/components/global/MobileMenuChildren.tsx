import { FC } from "react";
import { HeaderMenuItem } from "./Header";

import { HiChevronLeft } from "react-icons/hi";
import Link from "next/link";

interface MobileMenuChildrenProps {
  menuItemChildren: HeaderMenuItem[];
  title: string;
  state: boolean;
  closeChildren: () => void;
}

const MobileMenuChildren: FC<MobileMenuChildrenProps> = ({
  menuItemChildren,
  title,
  state,
  closeChildren,
}) => (
  <div
    className={`fixed top-0 bottom-0 min-h-screen min-w-[70vw] bg-white z-[1000] text-head duration-300 p-5 ${
      state ? "left-0" : "-left-full"
    }`}
  >
    <button
      onClick={(): void => {
        closeChildren();
      }}
      className="text-base-medium w-full text-left p-5 rounded-lg text-color-1 bg-color-1/[.07] duration-300 flex items-center gap-3 mb-5"
    >
      <HiChevronLeft size={18} />
      {title}
    </button>
    <div className="flex flex-col gap-5 text-md-regular pl-5">
      {menuItemChildren.map((children, index) => (
        <Link
          className="hover:text-color-1 duration-300"
          key={`mobile-menu-children-${index}`}
          href={children.link}
        >
          {children.title}
        </Link>
      ))}
    </div>
  </div>
);

export default MobileMenuChildren;
