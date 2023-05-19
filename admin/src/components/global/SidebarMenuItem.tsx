import Link from "next/link";
import React, { FC, useState } from "react";
import { IconType } from "react-icons";
import classNames from "classnames";

import { FiChevronDown } from "react-icons/fi";
import { useRouter } from "next/router";

export interface MenuItemType {
  name: string;
  link?: string;
  Icon?: IconType;
  child?: MenuItemType[];
}

interface SidebarMenuItemProps {
  menuItem: MenuItemType;
}

const SidebarMenuItem: FC<SidebarMenuItemProps> = ({ menuItem }) => {
  const [showChild, setShowChild] = useState<boolean>(false);
  const router = useRouter();

  return (
    <li>
      <button
        onClick={(): void => {
          if (menuItem.child) {
            setShowChild(!showChild);
          }

          if (menuItem.link && !menuItem.child) {
            router.push(menuItem.link);
          }
        }}
        className="w-full group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4"
      >
        {menuItem.Icon && <menuItem.Icon size={20} className="text-current" />}
        {menuItem.name}
        {menuItem.child && (
          <FiChevronDown
            size={20}
            className={classNames(
              "absolute right-4 top-1/2 -translate-y-1/2 text-current duration-300",
              {
                "-rotate-180": showChild,
              }
            )}
          />
        )}
      </button>
      {/* Dropdown Menu Start */}
      {menuItem.child && (
        <div
          className={classNames("overflow-hidden", { block: showChild }, { hidden: !showChild })}
        >
          <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
            {menuItem.child.map((child, index) => (
              <li key={index}>
                <Link
                  className="group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white"
                  href={child.link || "#"}
                >
                  {child.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Dropdown Menu End */}
    </li>
  );
};

export default SidebarMenuItem;
