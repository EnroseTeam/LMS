import Link from "next/link";
import { FC } from "react";
import { BsInstagram } from "react-icons/bs";
import { ImFacebook, ImLinkedin2, ImTwitter } from "react-icons/im";
import { IoMdClose } from "react-icons/io";

interface MobileMenuProps {
  mobileMenuShow: boolean;
  closeMobileMenu: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({
  mobileMenuShow,
  closeMobileMenu,
}) => (
  <>
    <div
      className={`fixed top-0 bottom-0 h-screen w-[70vw] bg-white z-[999] text-head flex flex-col gap-5 duration-300 -left-full ${
        mobileMenuShow ? "left-0" : ""
      }`}
    >
      <div className="py-5 pl-5 border-b border-b-border-1 flex items-center gap-[30px] text-md-regular">
        <Link className="hover:text-color-1 duration-300" href="/auth/login">
          Нэвтрэх
        </Link>
        <Link className="hover:text-color-1 duration-300" href="/auth/register">
          Бүртгүүлэх
        </Link>
      </div>

      <div className="flex-1 px-5">
        <ul className="flex flex-col gap-[5px] text-head text-base-medium">
          <li className="p-5 rounded-lg hover:text-color-1 hover:bg-color-1/[.07] duration-300">
            Нүүр хуудас
          </li>
          <li className="p-5 rounded-lg hover:text-color-1 hover:bg-color-1/[.07] duration-300">
            Нүүр хуудас
          </li>
          <li className="p-5 rounded-lg hover:text-color-1 hover:bg-color-1/[.07] duration-300">
            Нүүр хуудас
          </li>
          <li className="p-5 rounded-lg hover:text-color-1 hover:bg-color-1/[.07] duration-300">
            Нүүр хуудас
          </li>
          <li className="p-5 rounded-lg hover:text-color-1 hover:bg-color-1/[.07] duration-300">
            Нүүр хуудас
          </li>
        </ul>
      </div>

      <div className="py-5 pl-5 pr-[75px] border-t border-t-border-1">
        <h4 className="text-lg-medium mb-2">Утасны дугаар</h4>
        <h3 className="text-color-1 text-lg-medium mb-[10px]">88916562</h3>
        <p className="text-text text-md-regular mb-[10px]">
          329 Queensberry Street, North Melbourne VIC 3051, Australia.
          <br />
          hi@educrat.com
        </p>
        <div className="flex items-center gap-4 text-sm text-text">
          <Link
            className="p-3 rounded-full hover:text-color-1 hover:bg-bg-color duration-300"
            href="https://facebook.com"
            target="_blank"
          >
            <ImFacebook />
          </Link>
          <Link
            className="p-3 rounded-full hover:text-color-1 hover:bg-bg-color duration-300"
            href="https://twitter.com"
            target="_blank"
          >
            <ImTwitter />
          </Link>
          <Link
            className="p-3 rounded-full hover:text-color-1 hover:bg-bg-color duration-300"
            href="https://instagram.com"
            target="_blank"
          >
            <BsInstagram />
          </Link>
          <Link
            className="p-3 rounded-full hover:text-color-1 hover:bg-bg-color duration-300"
            href="https://linkedin.com"
            target="_blank"
          >
            <ImLinkedin2 />
          </Link>
        </div>
      </div>
    </div>
    <button
      onClick={closeMobileMenu}
      className={`fixed top-5 right-5 text-head p-[10px] text-2xl bg-white rounded-full opacity-0 pointer-events-none z-[999] ${
        mobileMenuShow ? "opacity-100 pointer-events-auto" : ""
      } duration-300`}
    >
      <IoMdClose />
    </button>
    <div
      onClick={closeMobileMenu}
      className={`fixed top-0 bottom-0 right-0 left-0 w-screen h-screen bg-[#18181a]/70 opacity-0 pointer-events-none ${
        mobileMenuShow ? "opacity-100 pointer-events-auto" : ""
      } duration-300`}
    />
  </>
);

export default MobileMenu;
