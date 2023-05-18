import Image from "next/image";
import { FC, useState } from "react";

import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { HiOutlineBellAlert, HiOutlineCog8Tooth } from "react-icons/hi2";

import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";

import plcHolder from "@/assets/placeholder.png";
import Link from "next/link";

import classNames from "classnames";

const Header: FC = () => {
  const [userDropdownShow, setUserDropdownShow] = useState<boolean>(false);

  return (
    <header className="bg-white border-b border-b-border-1 py-3 px-10 flex items-center justify-between">
      <button className="text-color-1 p-3 bg-transparent rounded-full hover:bg-color-1/[.07] duration-300">
        <HiOutlineMenuAlt1 size={24} />
      </button>

      <div className="flex items-center gap-3">
        <button className="text-icon p-2 rounded-full bg-transparent hover:bg-color-1/[.07] duration-300">
          <HiOutlineBellAlert size={24} />
        </button>

        <button className="text-icon p-2 rounded-full bg-transparent hover:bg-color-1/[.07] duration-300">
          <HiOutlineCog8Tooth size={24} />
        </button>

        <div className="relative">
          <button
            onClick={(): void => {
              setUserDropdownShow(!userDropdownShow);
            }}
            className="block w-12 h-12 rounded-full overflow-hidden"
          >
            <Image
              src={plcHolder}
              alt="Placeholder"
              width={96}
              height={96}
              className="w-full h-full aspect-square object-cover"
            />
          </button>

          {/* User Drop Down */}
          <div
            className={classNames(
              "absolute top-full right-0 w-fit rounded-lg border border-border-1 shadow-shadow-dashboard bg-white mt-2 -mr-3 overflow-hidden duration-300 z-10",
              { "opacity-100": userDropdownShow },
              { "opacity-0 pointer-events-none": !userDropdownShow }
            )}
          >
            <div className="flex items-center gap-5 bg-[#f7f8fb] px-5 py-4 mb-4">
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <Image
                  src={plcHolder}
                  alt="Placeholder"
                  width={96}
                  height={96}
                  className="w-full h-full aspect-square object-cover"
                />
              </div>

              <div className="flex flex-col gap-1 flex-1 whitespace-nowrap">
                <h1 className="text-head text-base-medium">Javkhlant Altankhuyag</h1>
                <p className="text-icon text-sm-regular">Admin</p>
              </div>
            </div>

            <div className="flex flex-col gap-0 mb-4">
              <Link
                href={"/"}
                className="px-5 py-3 flex items-center gap-4 w-full hover:bg-color-1/[.07] duration-300"
              >
                <div className="rounded-lg text-white bg-[#ff9800] p-2">
                  <AiOutlineUser size={18} />
                </div>

                <div className="flex flex-col gap-1 items-start">
                  <h4 className="text-head text-md-medium">Хэрэглэгч</h4>
                  <span className="text-icon text-sm-regular">Хэрэглэгчийн тохиргоо</span>
                </div>
              </Link>

              <Link
                href={"/"}
                className="px-5 py-3 flex items-center gap-4 w-full hover:bg-color-1/[.07] duration-300"
              >
                <div className="rounded-lg text-white bg-[#ff9800] p-2">
                  <AiOutlineUser size={18} />
                </div>

                <div className="flex flex-col gap-1 items-start">
                  <h4 className="text-head text-md-medium">Хэрэглэгч</h4>
                  <span className="text-icon text-sm-regular">Хэрэглэгчийн тохиргоо</span>
                </div>
              </Link>

              <Link
                href={"/"}
                className="px-5 py-3 flex items-center gap-4 w-full hover:bg-color-1/[.07] duration-300"
              >
                <div className="rounded-lg text-white bg-[#ff9800] p-2">
                  <AiOutlineUser size={18} />
                </div>

                <div className="flex flex-col gap-1 items-start">
                  <h4 className="text-head text-md-medium">Хэрэглэгч</h4>
                  <span className="text-icon text-sm-regular">Хэрэглэгчийн тохиргоо</span>
                </div>
              </Link>

              <Link
                href={"/"}
                className="px-5 py-3 flex items-center gap-4 w-full hover:bg-color-1/[.07] duration-300"
              >
                <div className="rounded-lg text-white bg-[#ff9800] p-2">
                  <AiOutlineUser size={18} />
                </div>

                <div className="flex flex-col gap-1 items-start">
                  <h4 className="text-head text-md-medium">Хэрэглэгч</h4>
                  <span className="text-icon text-sm-regular">Хэрэглэгчийн тохиргоо</span>
                </div>
              </Link>
            </div>

            <div className="w-full px-5 mb-4">
              <Link
                href={"/"}
                className="btn-1 w-full py-[10px] text-sm-medium flex items-center gap-2 justify-center"
              >
                <MdOutlineLogout size={20} />
                <span>Гарах</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
