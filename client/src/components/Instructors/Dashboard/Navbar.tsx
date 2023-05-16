import { FC, useContext } from "react";
import { RiMenu4Fill } from "react-icons/ri";
import { BiBell, BiMessageSquareDetail } from "react-icons/bi";

import logoDark from "@/assets/logo-dark.svg";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthContext";
import { DashboardSidebarContext } from "@/contexts/DashboardSidebarContext";

const InstructorNavbar: FC = () => {
  const { user } = useContext(AuthContext);
  const { setSidebarShow, sidebarShow } = useContext(DashboardSidebarContext);

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
        <nav>
          <ul className="flex items-center gap-10 text-head text-md-regular">
            <li>
              <Link href={"#"}>All Pages</Link>
            </li>
            <li>
              <Link href={"#"}>My Courses</Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-[10px]">
          <button className="text-xl text-icon p-[15px] rounded-2xl hover:bg-bg-1 hover:text-color-1 duration-300">
            <BiMessageSquareDetail />
          </button>
          <button className="text-xl text-icon p-[15px] rounded-2xl hover:bg-bg-1 hover:text-color-1 duration-300">
            <BiBell />
          </button>
        </div>

        <button className="w-[50px] h-[50px] overflow-hidden rounded-2xl">
          <Image
            alt="User"
            src={user.avatar}
            width={100}
            height={100}
            className="w-full aspect-square object-cover"
          />
        </button>
      </div>
    </header>
  );
};

export default InstructorNavbar;
