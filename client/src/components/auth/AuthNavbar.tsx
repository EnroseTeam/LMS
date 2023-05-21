import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import useSWR from "swr";

// import mainLogo from "@/assets/logo-main.svg";
import darkLogo from "@/assets/logo-dark.svg";
import { useRouter } from "next/router";
import MobileMenu from "../global/MobileMenu";
import { fetcher } from "@/utils/fetcher";
import { ICourseCategory } from "@/interfaces/courses";
import { BiMenuAltLeft } from "react-icons/bi";

export interface HeaderMenuItem {
  title: string;
  link: string;
  children?: HeaderMenuItem[];
}

const AuthNavbar: FC = () => {
  const { data: categories, isLoading: categoriesLoading } = useSWR(
    "/api/courses/categories",
    fetcher<{ message: string; body: ICourseCategory[] }>
  );

  // const { user, isLoggedIn, isUserLoading } = useContext(AuthContext);

  const router = useRouter();
  const [headerCategories, setHeaderCategories] = useState<HeaderMenuItem[]>(
    []
  );
  const [mobileMenuShow, setMobileMenuShow] = useState<boolean>(false);

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
    { title: "Холбогдох", link: "/contact-us" },
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

  const openMobileMenu = (): void => {
    setMobileMenuShow(true);
  };

  const closeMobileMenu = (): void => {
    setMobileMenuShow(false);
  };

  return (
    <>
      <header className="flex items-center lg:items-stretch justify-between lg:grid lg:grid-cols-5 xl:grid-cols-3 z-[999] bg-bg-5 xl:bg-transparent py-5 px-10 lg:px-0 xl:py-0">
        <button
          onClick={openMobileMenu}
          className="lg:hidden text-head hover:text-icon duration-300"
        >
          <BiMenuAltLeft size={24} />
        </button>

        <div className="hidden sm:block lg:col-span-1 bg-bg-5 xl:bg-head pt-0 xl:pt-5">
          <Link
            href="/"
            className="block w-full lg:w-2/3 xl:w-[200px] ml-0 lg:ml-[60px]"
          >
            <Image
              src={darkLogo}
              width={135}
              height={50}
              className="w-full aspect-[2.7/1] object-contain"
              alt="Main Logo"
            />
          </Link>
        </div>

        <nav className="flex items-center justify-end gap-[45px] lg:col-span-4 xl:col-span-2 bg-bg-5">
          <ul className="hidden lg:flex items-center gap-3 text-md-regular text-head ">
            <li className="py-2 px-4 hover:text-head/70 duration-300">
              <Link href="/">Нүүр хуудас</Link>
            </li>
            <li className="py-2 px-4 hover:text-head/70 duration-300">
              <Link href="/">Сургалт</Link>
            </li>
            <li className="py-2 px-4 hover:text-head/70 duration-300">
              <Link href="/">Багш, сургагч</Link>
            </li>
            <li className="py-2 px-4 hover:text-head/70 duration-300">
              <Link href="/">Мэдээ</Link>
            </li>
            <li className="py-2 px-4 hover:text-head/70 duration-300">
              <Link href="/">Бидний тухай</Link>
            </li>
          </ul>

          {router.pathname === "/auth/register" && (
            <Link
              className="text-md-regular py-3 px-[34px] rounded-[60px] btn-3 mr-0 lg:mr-[60px]"
              href="/auth/login"
            >
              Нэвтрэх
            </Link>
          )}
          {router.pathname === "/auth/login" && (
            <Link
              className="text-md-regular py-3 px-[34px] rounded-[60px] btn-3 mr-0 lg:mr-[60px]"
              href="/auth/register"
            >
              Бүртгүүлэх
            </Link>
          )}
        </nav>
      </header>
      <MobileMenu
        menuItems={HeaderMenuItems}
        mobileMenuShow={mobileMenuShow}
        closeMobileMenu={closeMobileMenu}
      />
    </>
  );
};
export default AuthNavbar;
