import Link from "next/link";
import { FC, useContext } from "react";

import { useRouter } from "next/router";
import { DashboardSidebarContext } from "@/contexts/DashboardSidebarContext";
import classNames from "classnames";
import { IconType } from "react-icons";

import logoDark from "@/assets/logo-dark.svg";
import Image from "next/image";

import { GrFormClose } from "react-icons/gr";

interface InstructorSidebarProps {
  MenuItems: { title: string; link: string; Icon: IconType }[];
}

const InstructorSidebar: FC<InstructorSidebarProps> = ({ MenuItems: SidebarItems }) => {
  const router = useRouter();
  const { sidebarShow, setSidebarShow } = useContext(DashboardSidebarContext);

  return (
    <>
      <div
        className={classNames(
          "bg-white pt-0 duration-300 fixed top-0 lg:static h-screen lg:h-auto lg:pt-[50px] z-50",
          {
            "px-[30px] max-w-[300px] min-w-[300px]": sidebarShow,
          },
          { "px-0 max-w-0 pointer-events-none": !sidebarShow }
        )}
      >
        <Link
          href="/instructors/dashboard"
          className={classNames(
            "block w-[171px] lg:hidden duration-100",
            { "opacity-100": sidebarShow },
            { "opacity-0 pointer-events-none": !sidebarShow }
          )}
        >
          <Image
            src={logoDark}
            width={171}
            height={50}
            alt="Logo"
            className="w-full aspect-[3.42/1] object-contain my-7"
          />
        </Link>

        <div
          className={classNames(
            "flex flex-col gap-[5px] text-text whitespace-nowrap text-lg-medium duration-100",
            { "opacity-100": sidebarShow },
            { "opacity-0": !sidebarShow }
          )}
        >
          {SidebarItems.map((item, index) => (
            <Link
              key={`sidebar-item-${index}`}
              href={item.link}
              className={classNames(
                "px-5 py-4 flex items-center gap-[15px] rounded-2xl hover:bg-color-2 hover:text-white duration-150",
                { "text-white bg-color-2": router.pathname === item.link }
              )}
            >
              <item.Icon size={22} />
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      <button
        onClick={(): void => {
          setSidebarShow(false);
        }}
        className={classNames(
          "fixed top-5 right-5 p-3 rounded-full bg-white z-[50] lg:hidden duration-300",
          { "opacity-100": sidebarShow },
          { "opacity-0 pointer-events-none": !sidebarShow }
        )}
      >
        <GrFormClose size={28} />
      </button>

      <div
        onClick={(): void => {
          setSidebarShow(false);
        }}
        className={classNames(
          "fixed top-0 left-0 right-0 bottom-0 min-w-screen min-h-screen bg-black/25 z-40 lg:hidden duration-300",
          { "opacity-100": sidebarShow },
          { "opacity-0 pointer-events-none": !sidebarShow }
        )}
      />
    </>
  );
};

export default InstructorSidebar;
