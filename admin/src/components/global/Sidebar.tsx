import { Dispatch, FC, SetStateAction } from "react";

import logo from "@/assets/logo-main.svg";
import Image from "next/image";
import Link from "next/link";

import { BsArrowLeft } from "react-icons/bs";
import classNames from "classnames";
import SidebarMenuItem, { MenuItemType } from "./SidebarMenuItem";

import { RxDashboard } from "react-icons/rx";
import { MdOutlinePlayLesson, MdLogout } from "react-icons/md";
import { HiOutlineNewspaper } from "react-icons/hi";

interface SidebarProps {
  sidebarShow: boolean;
  setSidebarShow: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: FC<SidebarProps> = ({ sidebarShow, setSidebarShow }) => {
  const MenuItems: MenuItemType[] = [
    { name: "Хянах самбар", link: "/", Icon: RxDashboard },
    {
      name: "Сургалт",
      link: "/courses",
      Icon: MdOutlinePlayLesson,
      child: [
        { name: "Хүсэлтүүд", link: "/courses/requests" },
        { name: "Ангилалууд", link: "/courses/categories" },
      ],
    },
    { name: "Мэдээ", link: "/blogs", Icon: HiOutlineNewspaper },
    { name: "Гарах", link: "/auth/logout", Icon: MdLogout },
  ];

  return (
    <>
      <aside
        className={classNames(
          "absolute left-0 top-0 z-99999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-200 ease-linear dark:bg-boxdark lg:static lg:translate-x-0",
          { "-translate-x-full": !sidebarShow },
          { "translate-x-0": sidebarShow }
        )}
      >
        {/* SIDEBAR HEADER */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          <Link href="/">
            <Image src={logo} alt="Logo" />
          </Link>
          <button
            onClick={(): void => {
              setSidebarShow(false);
            }}
            className="block lg:hidden"
          >
            <BsArrowLeft size={24} className="text-current hover:text-white duration-150" />
          </button>
        </div>
        {/* SIDEBAR HEADER */}
        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* Sidebar Menu */}
          <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
            {/* Menu Group */}
            <ul className="mb-6 flex flex-col gap-3">
              {/* Menu Item Dashboard */}
              {MenuItems.map((item, index) => (
                <SidebarMenuItem key={index} menuItem={item} />
              ))}
            </ul>
          </nav>
          {/* Sidebar Menu */}
        </div>
      </aside>

      <div
        onClick={(): void => {
          setSidebarShow(false);
        }}
        className={classNames(
          "fixed top-0 left-0 right-0 bottom-0 min-w-screen min-h-screen lg:hidden bg-black-2/40 z-9999 duration-200",
          { "opacity-100": sidebarShow },
          { "opacity-0 pointer-events-none": !sidebarShow }
        )}
      />
    </>
  );
};

export default Sidebar;
