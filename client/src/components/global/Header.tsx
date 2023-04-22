import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import mainLogo from "@/assets/logo-main.svg";
import { RiMenu4Fill } from "react-icons/ri";
import { FiShoppingBag, FiSearch } from "react-icons/fi";
import NavbarDroprown from "./NavbarDroprown";

const links = [
  { name: "Home" },
  {
    name: "Courses",
    submenu: true,
    sublinks: [
      {
        Head: "Courses",
        sublinks: [
          { name: "Menu1", link: "/" },
          { name: "Menu2", link: "/" },
          { name: "Menu3", link: "/" },
          { name: "Menu4", link: "/" },
          { name: "Menu5", link: "/" },
        ],
      },
      {
        Head: "Courses2",
        sublinks: [
          { name: "Menu1", link: "/" },
          { name: "Menu2", link: "/" },
          { name: "Menu3", link: "/" },
          { name: "Menu4", link: "/" },
          { name: "Menu5", link: "/" },
        ],
      },
    ],
  },
  { name: "Blog" },
  { name: "Contact" },
];

const Header: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full bg-head text-white sticky top-0 z-[50]">
        <div className="container py-5 border-b border-b-white/[.15] flex items-center justify-between">
          <div className="flex items-center gap-7">
            <Link href="/">
              <Image src={mainLogo} alt="IntelliSense" />
            </Link>
            <button className="text-color-6 flex items-center gap-2 text-md-regular hover:text-color-6/70 duration-300">
              <RiMenu4Fill size={24} />
              <span>Explore</span>
            </button>
          </div>

          <nav className="">
            <ul className="flex items-center gap-10 text-md-regular">
              {links.map((link, index) => (
                <li
                  key={`navbar-menu-item-${index}`}
                  className="hover:text-white/70 duration-300 group"
                >
                  {link.name}
                  {link.submenu && <NavbarDroprown links={link.sublinks} />}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-7">
            <button className="text-xl hover:opacity-70 duration-300">
              <FiSearch />
            </button>
            <button className="text-xl hover:opacity-70 duration-300">
              <FiShoppingBag />
            </button>

            <button className="text-white text-md-regular hover:text-white/70 duration-300">
              Log In
            </button>

            <button className="text-head bg-white rounded-lg px-[34px] py-2 text-md-regular hover:bg-white/70 duration-300">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
