import Link from "next/link";
import React, { FC } from "react";
import { HeaderMenuItem } from "./Header";

interface NavbarDropDownProps {
  headerMenuChildren: HeaderMenuItem[];
}

const NavbarDroprown: FC<NavbarDropDownProps> = ({ headerMenuChildren }) => (
  <div className="absolute top-full pt-2 left-0 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto duration-300">
    <div className="px-7">
      <div className="w-[10px] h-[10px] bg-white rotate-45 " />
    </div>
    <div className="bg-white max-content pl-[30px] pr-[76px] py-6 rounded-lg shadow-shadow-4 -mt-[5px] ">
      <ul className="whitespace-nowrap text-head text-md-regular leading-[35px]">
        {headerMenuChildren.map((children, index) => (
          <li key={`header-menu-children-${index}`}>
            <Link
              className="hover:text-color-1 hover:underline duration-300"
              href={children.link}
            >
              {children.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default NavbarDroprown;
