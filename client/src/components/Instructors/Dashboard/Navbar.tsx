import { FC, useContext, useState } from "react";
import { RiMenu4Fill } from "react-icons/ri";
import { BiBell, BiMessageSquareDetail } from "react-icons/bi";

import logoDark from "@/assets/logo-dark.svg";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthContext";
import { DashboardSidebarContext } from "@/contexts/DashboardSidebarContext";
import { IconType } from "react-icons";

import classNames from "classnames";

interface InstructorNavbarProps {
  MenuItems: { title: string; link: string; Icon: IconType }[];
}

const InstructorNavbar: FC<InstructorNavbarProps> = ({ MenuItems }) => {
  const { user } = useContext(AuthContext);
  const { setSidebarShow, sidebarShow } = useContext(DashboardSidebarContext);

  const [userMenuShow, setUserMenuShow] = useState<boolean>(false);

  if (!user) return <></>;

  return (
    <header className="bg-white py-5 px-[30px] flex items-center justify-between">
      <div className="flex items-center gap-[14px]">
        <button
          onClick={(): void => {
            setSidebarShow(!sidebarShow);
          }}
          className="text-head text-xl p-4 hover:bg-bg-1 rounded-full duration-300 "
        >
          <RiMenu4Fill />
        </button>
        <Link href="/instructors/dashboard" className="w-[171px] h-[50px]">
          <Image
            src={logoDark}
            width={171}
            height={50}
            alt="Logo"
            className="w-full aspect-auto object-cover"
          />
        </Link>
      </div>

      <div className="flex items-center gap-[30px]">
        <div className="flex items-center gap-[10px]">
          <button className="text-xl text-icon p-[15px] rounded-2xl hover:bg-bg-1 hover:text-color-1 duration-300">
            <BiMessageSquareDetail />
          </button>
          <button className="text-xl text-icon p-[15px] rounded-2xl hover:bg-bg-1 hover:text-color-1 duration-300">
            <BiBell />
          </button>
        </div>

        <div className="relative">
          <button
            onClick={(): void => {
              setUserMenuShow(!userMenuShow);
            }}
            className="block w-[50px] h-[50px] overflow-hidden rounded-2xl relative group/picture"
          >
            <Image
              alt="User"
              src={user.avatar}
              width={100}
              height={100}
              className="w-full aspect-square object-cover"
            />

            <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full group-hover/picture:bg-color-2/30 duration-300" />
          </button>

          <div
            className={classNames(
              "absolute top-full right-0 mt-2",
              { block: userMenuShow },
              { hidden: !userMenuShow }
            )}
          >
            <div className="absolute right-5 w-[10px] h-[10px] bg-white border-t border-l border-border-2 rotate-45" />
            <div className="flex flex-col gap-0 bg-white border border-border-2 shadow-shadow-4 rounded-lg px-[30px] py-6 w-fit mt-[5px]">
              {MenuItems.map((item, index) => (
                <Link
                  className="whitespace-nowrap flex items-center gap-[15px] text-text text-lg-medium px-5 py-4 rounded-2xl hover:bg-color-2 hover:text-white duration-300"
                  key={`user-menu-item-${index}`}
                  href={item.link}
                >
                  <item.Icon size={20} />
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default InstructorNavbar;
