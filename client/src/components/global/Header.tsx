import { FC, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import mainLogo from "@/assets/logo-main.svg";
import { RiMenu4Fill } from "react-icons/ri";
import { FiShoppingBag, FiSearch } from "react-icons/fi";

import NavbarDropdownLarge from "./NavbarDropdownLarge";
import NavbarDroprown from "./NavbarDroprown";
import SearchBar from "../Search/SearchBar";

const Header: FC = () => {
  const [searchBarShow, setSearchBarShow] = useState<boolean>(false);

  const showSearchBar = (): void => {
    setSearchBarShow(true);
  };

  return (
    <div className="w-full bg-head text-white sticky top-0 z-[50]">
      <div className="container py-5 border-b border-b-white/[.15] flex items-center justify-between">
        <div className="flex items-center gap-7">
          <Link href="/">
            <Image src={mainLogo} alt="IntelliSense" />
          </Link>
          <div className="py-2 px-2 hover:bg-white/[.15] rounded-lg text-color-6 flex items-center gap-2 text-md-regular hover:text-color-6/70 duration-300 group relative cursor-pointer">
          <RiMenu4Fill size={24} />
          <span>Explore</span>
          <NavbarDropdownLarge />
        </div>
        </div>
         <nav className="hidden lg:block">
        <ul className="flex items-center gap-1 text-md-regular">
          <li className="py-2 px-4 hover:text-color-6 hover:bg-white/[.15] rounded-lg duration-300 group relative">
            <Link href="/">Нүүр хуудас</Link>
            <NavbarDroprown />
          </li>
          <li className="py-2 px-4 hover:text-color-6 hover:bg-white/[.15] rounded-lg duration-300 group relative">
            <Link href="/">Сургалт</Link>
            <NavbarDroprown />
          </li>
          <li className="py-2 px-4 hover:text-color-6 hover:bg-white/[.15] rounded-lg duration-300 group relative">
            <Link href="/">Багш, сургагч</Link>
            <NavbarDroprown />
          </li>
          <li className="py-2 px-4 hover:text-color-6 hover:bg-white/[.15] rounded-lg duration-300 group relative">
            <Link href="/">Мэдээ</Link>
            <NavbarDroprown />
          </li>
          <li className="py-2 px-4 hover:text-color-6 hover:bg-white/[.15] rounded-lg duration-300 group relative">
            <Link href="/">Бидний тухай</Link>
            <NavbarDroprown />
          </li>
        </ul>
      </nav>
        <div className="flex items-center gap-7">
          <button
            className="text-xl hover:opacity-70 duration-300"
            onClick={showSearchBar}
          >
            <FiSearch />
          </button>
          <button className="text-xl hover:opacity-70 duration-300">
            <FiShoppingBag />
          </button>
            <Link
          href="/auth/login"
          className="text-white text-md-regular hover:text-white/70 duration-300"
        >
          Нэвтрэх
        </Link>
        <Link
          href="/auth/register"
          className="text-head bg-white rounded-lg px-[34px] py-2 text-md-regular hover:bg-white/70 duration-300"
        >
          Бүртгүүлэх
        </Link>
        </div>

      </div>
      <SearchBar
        searchBarShow={searchBarShow}
        setSearchBarShow={setSearchBarShow}
      />
    </div>
  );
};

export default Header;
