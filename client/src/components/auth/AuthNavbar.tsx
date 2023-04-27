import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import mainLogo from "@/assets/logo-main.svg";
import { useRouter } from "next/router";

const AuthNavbar: FC = () => {
  const router = useRouter();

  return (
    <header className="grid grid-cols-3 z-[999]">
      <div className="col-span-1 bg-head pt-5">
        <Link href="/" className="block w-[200px] ml-[60px]">
          <Image
            src={mainLogo}
            width={135}
            height={50}
            className="w-full aspect-auto object-contain"
            alt="Main Logo"
          />
        </Link>
      </div>

      <nav className="flex items-center justify-end gap-[45px] col-span-2 bg-bg-5">
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
            className="text-md-regular py-3 px-[34px] rounded-[60px] btn-3 mr-[60px]"
            href="/auth/login"
          >
            Нэвтрэх
          </Link>
        )}
        {router.pathname === "/auth/login" && (
          <Link
            className="text-md-regular py-3 px-[34px] rounded-[60px] btn-3 mr-[60px]"
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
