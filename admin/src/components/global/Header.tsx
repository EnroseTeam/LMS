import Image from "next/image";
import { FC, useState } from "react";
import classNames from "classnames";

import plcHolder from "@/assets/placeholder.png";
import logo from "@/assets/logo-icon.svg";

import { HiMagnifyingGlass, HiOutlineBell, HiOutlineCog6Tooth } from "react-icons/hi2";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FiChevronDown, FiUser } from "react-icons/fi";
import { MdOutlineContacts, MdLogout } from "react-icons/md";
import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";

const Header: FC = () => {
  const [userDropdownShow, setUserDropdownShow] = useState<boolean>(false);
  const [notificationDropdownShow, setNotificationDropdownShow] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between py-4 px-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* Hamburger Toggle BTN */}
          <button className="z-99999 block rounded-lg border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden">
            <HiOutlineMenuAlt2 size={20} />
          </button>
          {/* Hamburger Toggle BTN */}
          <Link href="/" className="block flex-shrink-0 lg:hidden">
            <Image src={logo} alt="logo" />
          </Link>
        </div>

        {/* Search */}
        <div className="hidden sm:block">
          <form
            onSubmit={(e): void => {
              e.preventDefault();
            }}
          >
            <div className="relative">
              <button className="absolute top-1/2 left-0 -translate-y-1/2">
                <HiMagnifyingGlass
                  size={22}
                  className="text-body hover:text-primary dark:text-bodydark dark:hover:text-primary"
                />
              </button>
              <input
                type="text"
                placeholder="Хайх..."
                className="w-full bg-transparent pr-4 pl-9 focus:outline-none"
              />
            </div>
          </form>
        </div>

        {/* Right Items */}
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <li>
              <ThemeSwitcher />
            </li>
            {/* Notification Menu Area */}
            <li className="relative">
              <button
                onClick={(): void => {
                  setNotificationDropdownShow(!notificationDropdownShow);
                }}
                className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
              >
                <span className="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 grid place-items-center">
                  <span className="z-2 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75" />
                </span>

                <HiOutlineBell size={18} className="text-current duration-300 ease-in-out" />
              </button>
              {/* Notification Dropdown Start */}
              <div
                className={classNames(
                  "absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 duration-150",
                  { "opacity-100": notificationDropdownShow },
                  { "opacity-0 pointer-events-none": !notificationDropdownShow }
                )}
              >
                <div className="px-4.5 py-3">
                  <h5 className="text-sm font-medium text-bodydark2">Notification</h5>
                </div>
                <ul className="flex h-auto flex-col overflow-y-auto">
                  <li>
                    <a
                      className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                      href="#"
                    >
                      <p className="text-sm">
                        <span className="text-black dark:text-white">
                          Edit your information in a swipe
                        </span>
                        Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                        mollit anim.
                      </p>
                      <p className="text-xs">12 May, 2025</p>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                      href="#"
                    >
                      <p className="text-sm">
                        <span className="text-black dark:text-white">
                          It is a long established fact
                        </span>
                        that a reader will be distracted by the readable.
                      </p>
                      <p className="text-xs">24 Feb, 2025</p>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                      href="#"
                    >
                      <p className="text-sm">
                        <span className="text-black dark:text-white">
                          There are many variations
                        </span>
                        of passages of Lorem Ipsum available, but the majority have suffered
                      </p>
                      <p className="text-xs">04 Jan, 2025</p>
                    </a>
                  </li>
                  <li>
                    <a
                      className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                      href="#"
                    >
                      <p className="text-sm">
                        <span className="text-black dark:text-white">
                          There are many variations
                        </span>
                        of passages of Lorem Ipsum available, but the majority have suffered
                      </p>
                      <p className="text-xs">01 Dec, 2024</p>
                    </a>
                  </li>
                </ul>
              </div>
              {/* Dropdown End */}
            </li>
            {/* Notification Menu Area */}
          </ul>
          {/* User Area */}
          <div className="relative">
            <div className="flex items-center gap-4">
              <span className="hidden text-right lg:block">
                <span className="block text-sm font-medium text-black dark:text-white">
                  Thomas Anree
                </span>
                <span className="block text-xs font-medium">UX Designer</span>
              </span>
              <button
                onClick={(): void => {
                  setUserDropdownShow(!userDropdownShow);
                }}
                className="flex items-center gap-2"
              >
                <span className="h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={plcHolder}
                    alt="User"
                    width={96}
                    height={96}
                    className="w-full h-full aspect-square object-cover"
                  />
                </span>
                <FiChevronDown
                  size={20}
                  className={classNames("hidden text-current sm:block duration-200", {
                    "-rotate-180": userDropdownShow,
                  })}
                />
              </button>
            </div>
            {/* Dropdown Start */}
            <div
              className={classNames(
                "absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark duration-150",
                { "opacity-100": userDropdownShow },
                { "opacity-0 pointer-events-none": !userDropdownShow }
              )}
            >
              <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark ">
                <li>
                  <a
                    href="profile.html"
                    className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                  >
                    <FiUser size={24} className="text-current" />
                    My Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                  >
                    <MdOutlineContacts size={24} className="text-current" />
                    My Contacts
                  </a>
                </li>
                <li>
                  <a
                    href="settings.html"
                    className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                  >
                    <HiOutlineCog6Tooth size={24} className="text-current" />
                    Account Settings
                  </a>
                </li>
              </ul>
              <button className="flex items-center gap-3.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
                <MdLogout size={24} className="text-current" />
                Log Out
              </button>
            </div>
            {/* Dropdown End */}
          </div>
          {/* User Area */}
        </div>
      </div>
    </header>
  );
};

export default Header;
