import { FC, useState, useEffect, useContext } from "react";
import useSWR from "swr";

import Image from "next/image";
import Link from "next/link";

import mainLogo from "@/assets/logo-main.svg";
import { RiMenu4Fill } from "react-icons/ri";
import { FiShoppingBag, FiSearch } from "react-icons/fi";
import { BiMenuAltRight } from "react-icons/bi";
import { HiChevronDown } from "react-icons/hi";

import NavbarDropdownLarge from "./NavbarDropdownLarge";
import NavbarDroprown from "./NavbarDroprown";
import SearchBar from "../Search/SearchBar";
import OpenCart from "../Cart/OpenCart";
import UserDropdown from "../User/UserDropdown";
// import UserSkeleton from "@/components/Skeletons/UserSkeleton";
import MobileMenu from "./MobileMenu";
import { fetcher } from "@/utils/fetcher";
import { ICourse, ICourseCategory } from "@/interfaces/courses";
import { AuthContext } from "@/contexts/AuthContext";

export interface HeaderMenuItem {
  title: string;
  link: string;
  children?: HeaderMenuItem[];
}

const Header: FC = () => {
  const { data: categories, isLoading: categoriesLoading } = useSWR(
    "/api/courses/categories",
    fetcher<{ message: string; body: ICourseCategory[] }>
  );

  const { data: courses } = useSWR(
    categories &&
      `/api/courses?category=${categories.body.map((category) => category.slug).join(",")}`,
    fetcher<{ body: ICourse[] }>
  );

  const { user, loggedIn } = useContext(AuthContext);

  const [searchBarShow, setSearchBarShow] = useState<boolean>(false);
  const [openCartShow, setOpenCartShow] = useState<boolean>(false);
  const [userDropdown, setUserDropdown] = useState<boolean>(false);
  const [mobileMenuShow, setMobileMenuShow] = useState<boolean>(false);

  const [headerCategories, setHeaderCategories] = useState<HeaderMenuItem[]>([]);

  const HeaderMenuItems: HeaderMenuItem[] = [
    { title: "Нүүр хуудас", link: "/" },
    {
      title: "Сургалт",
      link: "/courses",
      children: headerCategories,
    },
    { title: "Багш, сургагч", link: "/instructors" },
    { title: "Мэдээ", link: "/blogs" },
    { title: "Бидний тухай", link: "/about-us" },
  ];

  useEffect(() => {
    if (!categoriesLoading && categories) {
      setHeaderCategories(
        categories.body.map((category) => ({
          title: category.name,
          link: `/courses?category=${category.slug}`,
        }))
      );
    }
  }, [categories, categoriesLoading]);

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
    <header className="w-full bg-head text-white sticky top-0 z-[999]">
      <div className="container py-5 border-b border-b-white/[.15] flex items-center justify-between">
        <div className="flex items-center gap-7">
          <Link href="/">
            <Image src={mainLogo} alt="IntelliSense" />
          </Link>
          <div className="py-2 px-2 hover:bg-white/[.15] rounded-lg text-color-6 items-center gap-2 text-md-regular hover:text-color-6/70 duration-300 group relative cursor-pointer hidden xl:flex">
            <RiMenu4Fill size={24} />
            <span>Ангилалууд</span>
            {categories && courses && (
              <NavbarDropdownLarge categories={categories.body} courses={courses.body} />
            )}
          </div>
        </div>
        <nav className="hidden xl:block">
          <ul className="flex items-center gap-1 text-md-regular">
            {HeaderMenuItems.map((menuItem, index) => (
              <li
                key={`header-menu-${index}`}
                className="py-2 px-4 hover:text-color-6 hover:bg-white/[.15] rounded-lg duration-300 group relative"
              >
                <Link className="flex items-center gap-1" href={menuItem.link}>
                  {menuItem.title}
                  {menuItem.children && <HiChevronDown size={18} />}
                </Link>
                {menuItem.children && <NavbarDroprown headerMenuChildren={menuItem.children} />}
              </li>
            ))}
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

            <OpenCart openCartShow={openCartShow} setOpenCartShow={setOpenCartShow} />
          </div>

          <button
            onClick={openMobileMenu}
            className="text-2xl hover:text-white/70 duration-300 xl:hidden"
          >
            <BiMenuAltRight />
          </button>

          {!loggedIn && (
            <>
              <Link
                href="/auth/login"
                className="text-white text-md-regular hover:text-white/70 duration-300 hidden xl:block"
              >
                Нэвтрэх
              </Link>
              <Link
                href="/auth/register"
                className="text-head bg-white rounded-lg border-2 border-transparent px-[34px] py-2 text-md-regular hover:border-white hover:text-white hover:bg-transparent duration-300 hidden xl:block"
              >
                Бүртгүүлэх
              </Link>
            </>
          )}

          {user && loggedIn && (
            <div className="relative hidden xl:block">
              <button
                onClick={(): void => {
                  closeOpenCart();
                  toggleUserDropdown();
                }}
                className="hover:text-white/70 duration-300 block"
              >
                {user.fullName}
              </button>
              <UserDropdown
                user={user}
                userDropdown={userDropdown}
                setUserDropdown={setUserDropdown}
              />
            </div>
          )}
        </div>
      </div>
      <SearchBar searchBarShow={searchBarShow} setSearchBarShow={setSearchBarShow} />
      <MobileMenu
        menuItems={HeaderMenuItems}
        mobileMenuShow={mobileMenuShow}
        closeMobileMenu={closeMobileMenu}
        user={user}
        isReady={loggedIn}
      />
    </header>
  );
};

export default Header;
