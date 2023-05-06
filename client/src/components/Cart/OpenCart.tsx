import { FC, Dispatch, SetStateAction, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import classNames from "classnames";
import { useRouter } from "next/router";

interface OpenCartProps {
  openCartShow: boolean;
  setOpenCartShow: Dispatch<SetStateAction<boolean>>;
}

const OpenCart: FC<OpenCartProps> = ({ openCartShow, setOpenCartShow }) => {
  const { cartItems, totalPrice, removeCartItem } = useCart();
  const router = useRouter();

  useEffect(() => {
    setOpenCartShow(false);
  }, [router]);

  return (
    <div
      className={classNames(
        "absolute -right-7 top-full mt-5 duration-300",
        {
          "opacity-100": openCartShow,
        },
        { "opacity-0 pointer-events-none": !openCartShow }
      )}
    >
      <div className="bg-white w-[10px] h-[10px] rotate-45 ml-[367px]" />
      <div className="bg-white  rounded-lg shadow-shadow-4 min-w-[410px] -mt-[6px] text-head">
        {cartItems.length > 0 && (
          <div className="flex flex-col gap-5 px-[30px] pt-[30px] mb-[30px]">
            {cartItems.map((item) => (
              <div key={item._id} className="grid grid-cols-3 gap-5 relative">
                <button
                  onClick={(): void => {
                    removeCartItem(item);
                  }}
                  className="text-md text-color-1 absolute top-0 right-0"
                >
                  <AiOutlineClose />
                </button>
                <div className="col-span-1 rounded-lg overflow-hidden">
                  <Image
                    src={item.picture}
                    alt={item.name}
                    width={160}
                    height={160}
                    className="w-full aspect-square object-cover"
                  />
                </div>

                <div className="col-span-2 self-center flex flex-col flex-1 gap-[10px]">
                  <Link
                    href={`/courses/${item._id}`}
                    className="text-head text-xl-medium leading-6 text-left hover:opacity-70 duration-300"
                  >
                    {item.name}
                  </Link>
                  <p className="flex items-center gap-[7px]">
                    {item.discountPrice > 0 && (
                      <span className="text-text line-through text-sm-medium">₮{item.price}</span>
                    )}

                    <span className="text-base-medium">
                      ₮{item.discountPrice > 0 ? item.discountPrice : item.price}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItems.length === 0 && (
          <p className="text-base-medium text-icon text-center p-[30px]">
            Таны сагсанд сургалт байхгүй байна.
          </p>
        )}
        <div className="pt-[20px] pb-[30px] px-[30px] border-t border-t-border-1">
          <div className="flex items-center justify-between text-xl-medium mb-[30px]">
            <h3>Нийт дүн:</h3>
            <p>₮{totalPrice}</p>
          </div>
          <div className="flex items-center gap-5 whitespace-nowrap">
            <Link href="/user/cart" className="btn-3 px-[35px] py-4">
              Сагс үзэх
            </Link>
            <Link href="/user/cart/checkout" className="btn-1 px-[35px] py-4">
              Худалдаж авах
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenCart;
