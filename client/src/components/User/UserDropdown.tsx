import { IUser } from "@/interfaces/user";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, Dispatch, SetStateAction, useEffect } from "react";

interface UserDropDownProps {
  user: IUser;
  userDropdown: boolean;
  setUserDropdown: Dispatch<SetStateAction<boolean>>;
}

const UserDropdown: FC<UserDropDownProps> = ({ user, userDropdown, setUserDropdown }) => {
  const router = useRouter();

  useEffect(() => {
    setUserDropdown(false);
  }, [router]);

  return (
    <div
      className={`absolute top-10 right-0 text-head ${
        userDropdown ? "opacity-100" : "opacity-0 pointer-events-none"
      } duration-300`}
    >
      <div className="w-[10px] h-[10px] rotate-45 bg-white ml-[80%]" />
      <div className="bg-white p-[20px] rounded-lg shadow-shadow-4 max-content -mt-[5px]">
        <Link href="/user/profile" className="flex items-center gap-[10px] mb-6">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <Image
              src={user.avatar}
              width={120}
              height={120}
              alt={user.fullName}
              className="w-full aspect-square object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-base font-bold leading-[19px]">
              {user.lastName} <br /> {user.firstName}
            </h1>
            <p className="text-text text-xs-regular">{user.email}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-[15px] text-text text-md-regular">
          <li>
            <Link className="hover:text-text/70 duration-300" href="/user/courses">
              Миний сургалтууд
            </Link>
          </li>
          <li>
            <Link className="hover:text-text/70 duration-300" href="/">
              Миний сагс
            </Link>
          </li>
          {user.role.slug !== "student" && (
            <li>
              <Link className="hover:text-text/70 duration-300" href="/instructors/dashboard">
                Багшийн булан
              </Link>
            </li>
          )}
          {user.role.slug === "student" && (
            <li>
              <Link className="hover:text-text/70 duration-300" href="/become-instructor">
                Багш болох
              </Link>
            </li>
          )}
          <li>
            <Link className="hover:text-text/70 duration-300" href="/user/settings">
              Тохиргоо
            </Link>
          </li>
          <li>
            <Link className="hover:text-text/70 duration-300" href="/auth/logout">
              Гарах
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDropdown;
