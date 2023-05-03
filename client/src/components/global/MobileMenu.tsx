import { IUser } from "@/interfaces/user";
import Link from "next/link";
import { FC, useState, useEffect } from "react";
import { BsInstagram } from "react-icons/bs";
import { ImFacebook, ImLinkedin2, ImTwitter } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { HiChevronRight } from "react-icons/hi";
import { HeaderMenuItem } from "./Header";
import MobileMenuChildren from "./MobileMenuChildren";
import UserMobileMenu from "../User/UserMobileMenu";
import { useRouter } from "next/router";

interface MobileMenuProps {
  menuItems: HeaderMenuItem[];
  mobileMenuShow: boolean;
  closeMobileMenu: () => void;
  user: IUser | undefined;
  isReady: boolean;
}

const MobileMenu: FC<MobileMenuProps> = ({
  menuItems,
  mobileMenuShow,
  closeMobileMenu,
  user,
  isReady,
}) => {
  const router = useRouter();

  const [childrenStates, setChildrenStates] = useState<boolean[]>(
    menuItems.map(() => false)
  );
  const [userMenuShow, setUserMenuShow] = useState<boolean>(false);

  const closeAllChildren = (): void => {
    const newChildrenStates: boolean[] = childrenStates.map(() => false);
    setChildrenStates(newChildrenStates);
  };

  const showChildrenByIndex = (index: number): void => {
    const newChildrenStates: boolean[] = [...childrenStates];
    newChildrenStates[index] = true;
    setChildrenStates(newChildrenStates);
  };

  const closeChildrenByIndex = (index: number): void => {
    const newChildrenStates: boolean[] = [...childrenStates];
    newChildrenStates[index] = false;
    setChildrenStates(newChildrenStates);
  };

  const showUserMenu = (): void => {
    setUserMenuShow(true);
  };

  const closeUserMenu = (): void => {
    setUserMenuShow(false);
  };

  useEffect(() => {
    closeMobileMenu();
    closeAllChildren();
    closeUserMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <>
      <div
        className={`fixed top-0 bottom-0 min-h-screen min-w-[70vw] bg-white z-[999] text-head flex flex-col gap-5 duration-300 -left-full ${
          mobileMenuShow ? "left-0" : ""
        }`}
      >
        <div className="py-5 pl-5 border-b border-b-border-1 flex items-center gap-[30px] text-md-regular">
          {isReady && !user && (
            <>
              <Link
                className="hover:text-color-1 duration-300"
                href="/auth/login"
              >
                Нэвтрэх
              </Link>
              <Link
                className="hover:text-color-1 duration-300"
                href="/auth/register"
              >
                Бүртгүүлэх
              </Link>
            </>
          )}
          {isReady && user && (
            <>
              <button
                className={`hover:text-color-1 duration-300`}
                onClick={showUserMenu}
              >
                {user.fullName}
              </button>
              <UserMobileMenu
                user={user}
                userMenuShow={userMenuShow}
                closeUserMenu={closeUserMenu}
              />
            </>
          )}
        </div>

        <div className="flex flex-col gap-[5px] text-head text-base-medium px-5">
          {menuItems.map((menuItem, index) =>
            menuItem.children ? (
              <div
                key={`mobile-menu-item-${index}`}
                className="text-left p-5 rounded-lg hover:text-color-1 hover:bg-color-1/[.07] duration-300 flex items-center justify-between"
              >
                <Link href={menuItem.link}>{menuItem.title}</Link>
                <button
                  onClick={(): void => {
                    showChildrenByIndex(index);
                  }}
                >
                  <HiChevronRight size={18} />
                </button>
                <MobileMenuChildren
                  state={childrenStates[index]}
                  title={menuItem.title}
                  menuItemChildren={menuItem.children}
                  closeChildren={(): void => {
                    closeChildrenByIndex(index);
                  }}
                />
              </div>
            ) : (
              <Link
                href={menuItem.link}
                key={`mobile-menu-item-${index}`}
                className="text-left p-5 rounded-lg hover:text-color-1 hover:bg-color-1/[.07] duration-300"
              >
                {menuItem.title}
              </Link>
            )
          )}
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
        onClick={(): void => {
          closeMobileMenu();
          closeAllChildren();
          closeUserMenu();
        }}
        className={`fixed top-5 right-5 text-head p-[10px] text-2xl bg-white rounded-full opacity-0 pointer-events-none z-[999] ${
          mobileMenuShow ? "opacity-100 pointer-events-auto" : ""
        } duration-300`}
      >
        <IoMdClose />
      </button>
      <div
        onClick={(): void => {
          closeMobileMenu();
          closeAllChildren();
          closeUserMenu();
        }}
        className={`fixed top-0 bottom-0 right-0 left-0 min-w-screen min-h-screen bg-[#18181a]/70 opacity-0 pointer-events-none ${
          mobileMenuShow ? "opacity-100 pointer-events-auto" : ""
        } duration-300`}
      />
    </>
  );
};

export default MobileMenu;
