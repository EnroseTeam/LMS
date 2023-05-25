import { IUser } from "@/interfaces/user";
import Link from "next/link";
import { FC } from "react";
import { HiChevronLeft } from "react-icons/hi";
import classNames from "classnames";

interface UserMobileMenuProps {
  user: IUser;
  userMenuShow: boolean;
  closeUserMenu: () => void;
}

const UserMobileMenu: FC<UserMobileMenuProps> = ({ user, userMenuShow, closeUserMenu }) => (
  <div
    className={classNames(
      "fixed top-0 bottom-0 min-h-screen w-[70vw] bg-white z-[1000] text-head duration-300 p-5",
      { "left-0": userMenuShow },
      { "-left-full": !userMenuShow }
    )}
  >
    <button
      onClick={closeUserMenu}
      className="text-base-medium w-full text-left p-5 rounded-lg text-color-1 bg-color-1/[.07] duration-300 flex items-center gap-3 mb-5"
    >
      <HiChevronLeft size={18} />
      {user.fullName}
    </button>
    <div className="flex flex-col gap-5 text-md-regular pl-5">
      <Link className="hover:text-color-1 duration-300" href={"/user/courses"}>
        Миний сургалтууд
      </Link>
      <Link className="hover:text-color-1 duration-300" href={"/user/cart"}>
        Миний сагс
      </Link>
      <Link className="hover:text-color-1 duration-300" href={"/user/orders"}>
        Захиалгууд
      </Link>
      {(user.role === "Admin" || user.role === "Instructor") && (
        <Link className="hover:text-color-1 duration-300" href={"/instructors/dashboard"}>
          Багшийн булан
        </Link>
      )}
      {user.role === "Student" && (
        <Link className="hover:text-color-1 duration-300" href={"/become-instructor"}>
          Багш болох
        </Link>
      )}
      <Link className="hover:text-color-1 duration-300" href={"/user/settings"}>
        Тохиргоо
      </Link>
      <Link className="hover:text-color-1 duration-300" href={"/auth/logout"}>
        Гарах
      </Link>
    </div>
  </div>
);

export default UserMobileMenu;
