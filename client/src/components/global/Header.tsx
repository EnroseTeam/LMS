import { FC, useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

import mainLogo from "@/assets/logo-main.svg";
import { RiMenu4Fill } from "react-icons/ri";
import { FiShoppingBag, FiSearch } from "react-icons/fi";
import { BiMenuAltRight } from "react-icons/bi";

import NavbarDropdownLarge from "./NavbarDropdownLarge";
import NavbarDroprown from "./NavbarDroprown";
import SearchBar from "../Search/SearchBar";
import OpenCart from "../Cart/OpenCart";
import UserDropdown from "../User/UserDropdown";
import { useAuthenticate } from "@/hooks/useAuthenticate";
import UserSkeleton from "@/utils/UserSkeleton";
import MobileMenu from "./MobileMenu";

const Header: FC = () => {
  const { user, isLoading } = useAuthenticate();

  const [isReady, setIsReady] = useState<boolean>(false);

  const [searchBarShow, setSearchBarShow] = useState<boolean>(false);
  const [openCartShow, setOpenCartShow] = useState<boolean>(false);
  const [userDropdown, setUserDropdown] = useState<boolean>(false);
  const [mobileMenuShow, setMobileMenuShow] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading) setIsReady(true);
  }, [isLoading]);

  const toggleUserDropdown = (): void => {
    setUserDropdown(!userDropdown);
  };

  const closeUserDropdown = (): void => {
    setUserDropdown(false);
  };

  const closeOpenCart = (): void => {
    setOpenCartShow(false);
  };

  const toggleOpenCart = (): void => {
    setOpenCartShow(!openCartShow);
  };

  const showSearchBar = (): void => {
    setSearchBarShow(true);
  };

  const openMobileMenu = (): void => {
    setMobileMenuShow(true);
  };

  const closeMobileMenu = (): void => {
    setMobileMenuShow(false);
  };

  return (
    <header className="w-full bg-head text-white sticky top-0 z-[9999]">
      <div className="container py-5 border-b border-b-white/[.15] flex items-center justify-between">
        <div className="flex items-center gap-7">
          <Link href="/">
            <Image src={mainLogo} alt="IntelliSense" />
          </Link>
          <div className="py-2 px-2 hover:bg-white/[.15] rounded-lg text-color-6 items-center gap-2 text-md-regular hover:text-color-6/70 duration-300 group relative cursor-pointer hidden lg:flex">
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
              <Link href="/courses">Сургалт</Link>
              <NavbarDroprown />
            </li>
            <li className="py-2 px-4 hover:text-color-6 hover:bg-white/[.15] rounded-lg duration-300 group relative">
              <Link href="/instructors">Багш, сургагч</Link>
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
            onClick={(): void => {
              closeOpenCart();
              closeUserDropdown();
              showSearchBar();
            }}
          >
            <FiSearch />
          </button>

          <div className="relative">
            <button
              onClick={(): void => {
                closeUserDropdown();
                toggleOpenCart();
              }}
              className="text-xl hover:text-white/70 duration-300 block"
            >
              <FiShoppingBag />
            </button>

            <OpenCart
              openCartShow={openCartShow}
              closeOpenCart={closeOpenCart}
            />
          </div>

          <button
            onClick={openMobileMenu}
            className="text-2xl hover:text-white/70 duration-300 lg:hidden"
          >
            <BiMenuAltRight />
          </button>

          {!isReady && <UserSkeleton />}

          {!user && isReady && (
            <>
              <Link
                href="/auth/login"
                className="text-white text-md-regular hover:text-white/70 duration-300 hidden lg:block"
              >
                Нэвтрэх
              </Link>
              <Link
                href="/auth/register"
                className="text-head bg-white rounded-lg border-2 border-transparent px-[34px] py-2 text-md-regular hover:border-white hover:text-white hover:bg-transparent duration-300 hidden lg:block"
              >
                Бүртгүүлэх
              </Link>
            </>
          )}

          {user && isReady && (
            <div className="relative hidden lg:block">
              <button
                onClick={(): void => {
                  closeOpenCart();
                  toggleUserDropdown();
                }}
                className="hover:text-white/70 duration-300 block"
              >
                {user.fullName}
              </button>
              <UserDropdown user={user} userDropdown={userDropdown} />
            </div>
          )}
        </div>
      </div>
      <SearchBar
        searchBarShow={searchBarShow}
        setSearchBarShow={setSearchBarShow}
      />
      <MobileMenu
        mobileMenuShow={mobileMenuShow}
        closeMobileMenu={closeMobileMenu}
      />
    </header>
  );
};

export default Header;
