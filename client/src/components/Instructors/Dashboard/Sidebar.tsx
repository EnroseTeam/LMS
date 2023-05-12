import Link from "next/link";
import { FC } from "react";

import { FaRegCompass } from "react-icons/fa";
import { AiOutlinePlayCircle, AiOutlineVideoCameraAdd, AiOutlineComment } from "react-icons/ai";
import { BsChatLeftText } from "react-icons/bs";
import { HiOutlineCog8Tooth } from "react-icons/hi2";
import { RiShutDownLine } from "react-icons/ri";
import { useRouter } from "next/router";

const SidebarItems = [
  { title: "Хянах самбар", link: "/instructors/dashboard", Icon: FaRegCompass },
  {
    title: "Миний сургалтууд",
    link: "/instructors/dashboard/my-courses",
    Icon: AiOutlinePlayCircle,
  },
  {
    title: "Мессеж",
    link: "/instructors/dashboard/messages",
    Icon: BsChatLeftText,
  },
  {
    title: "Сургалт нэмэх",
    link: "/instructors/dashboard/my-courses/create-course",
    Icon: AiOutlineVideoCameraAdd,
  },
  {
    title: "Сэтгэгдлүүд",
    link: "/instructors/dashboard/reviews",
    Icon: AiOutlineComment,
  },
  {
    title: "Тохиргоо",
    link: "/instructors/dashboard/settings",
    Icon: HiOutlineCog8Tooth,
  },
  {
    title: "Гарах",
    link: "/auth/logout",
    Icon: RiShutDownLine,
  },
];

interface InstructorSidebarProps {
  sidebarShow: boolean;
}

const InstructorSidebar: FC<InstructorSidebarProps> = ({ sidebarShow }) => {
  const router = useRouter();

  return (
    <div
      className={`bg-white pt-[50px] duration-300 ${
        sidebarShow ? "px-[30px] max-w-[300px] min-w-[300px]" : "px-0 max-w-0"
      } duration-300`}
    >
      <div
        className={` flex flex-col gap-[5px] text-text whitespace-nowrap text-lg-medium ${
          sidebarShow ? "opacity-100" : "opacity-0"
        } duration-100`}
      >
        {SidebarItems.map((item, index) => (
          <Link
            key={`sidebar-item-${index}`}
            href={item.link}
            className={`px-5 py-4 flex items-center gap-[15px] rounded-2xl hover:bg-color-2 hover:text-white duration-150 ${
              router.pathname === item.link ? "text-white bg-color-2" : ""
            }`}
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
