import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import mainLogo from "@/assets/logo-main.svg";
import { useRouter } from "next/router";

const AuthNavbar: FC = () => {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between fixed top-5 left-0 right-0 mx-[60px] z-[999]">
      <Link href="/">
        <Image
          src={mainLogo}
          width={135}
          height={50}
          className="w-full aspect-auto object-contain"
          alt="Main Logo"
        />
      </Link>

      <nav className="flex items-center gap-[45px]">
        <ul className="flex items-center gap-3 text-md-regular text-head">
          <li className="py-2 px-4 hover:text-head/70 duration-300">
            <Link href="/">Нүүр хуудас</Link>
          </li>
          <li className="py-2 px-4 hover:text-head/70 duration-300">
            <Link href="/">Сургалт</Link>
          </li>
          <li className="py-2 px-4 hover:text-head/70 duration-300">
            <Link href="/">Багш, сургагч</Link>
          </li>
          <li className="py-2 px-4 hover:text-head/70 duration-300">
            <Link href="/">Мэдээ</Link>
          </li>
          <li className="py-2 px-4 hover:text-head/70 duration-300">
            <Link href="/">Бидний тухай</Link>
          </li>
        </ul>

        {router.pathname === "/auth/register" && (
          <Link
            className="text-md-regular text-white py-3 px-[34px] bg-head rounded-[60px] border border-transparent hover:bg-transparent hover:text-head  hover:border-head duration-300"
            href="/auth/login"
          >
            Нэвтрэх
          </Link>
        )}
        {router.pathname === "/auth/login" && (
          <Link
            className="text-md-regular text-white py-3 px-[34px] bg-head rounded-[60px] border border-transparent hover:bg-transparent hover:text-head  hover:border-head duration-300"
            href="/auth/register"
          >
            Бүртгүүлэх
          </Link>
        )}
      </nav>
    </header>
  );
};
export default AuthNavbar;
