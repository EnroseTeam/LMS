import Link from "next/link";
import { FC, useContext } from "react";

import { useRouter } from "next/router";
import { DashboardSidebarContext } from "@/contexts/DashboardSidebarContext";
import classNames from "classnames";
import { IconType } from "react-icons";

interface InstructorSidebarProps {
  MenuItems: { title: string; link: string; Icon: IconType }[];
}

const InstructorSidebar: FC<InstructorSidebarProps> = ({ MenuItems: SidebarItems }) => {
  const router = useRouter();
  const { sidebarShow } = useContext(DashboardSidebarContext);

  return (
    <div
      className={classNames(
        "bg-white pt-[50px] duration-300",
        {
          "px-[30px] max-w-[300px] min-w-[300px]": sidebarShow,
        },
        { "px-0 max-w-0 pointer-events-none": !sidebarShow }
      )}
    >
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
  );
};

export default InstructorSidebar;
