import Image from "next/image";

import Breadcrumbs from "@/components/global/Breadcrumbs";

import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { NextPageWithLayout } from "@/pages/_app";

const CartPage: NextPageWithLayout = () => {
  const { cartItems, removeCartItem, totalPrice } = useCart();

  return (
    <div>
      <Breadcrumbs
        breadcrumbItems={[
          { title: "Хэрэглэгч", link: "/user/settings" },
          { title: "Сагс", link: "/cart" },
        ]}
      />
      <div className="container mb-[120px]">
        <div className="mx-auto xl:mx-[200px]">
          <div className="text-center mb-12">
            <h1 className="font-[700] text-[40px] leading-[46px] text-head mb-1">
              Сагс
            </h1>
            <p className="text-text font-[400] text-[17px] leading-[36px]">
              Таны сагс
            </p>
          </div>
          <div className="mb-[25px] overflow-x-auto">
            {/* Header */}
            <div className="w-full px-[30px] py-6 rounded-lg bg-bg-3 grid grid-cols-4 text-color-1 text-base-medium">
              <h1 className="col-span-2">Сургалт</h1>
              <h1 className="text-center">Үнэ</h1>
              <h1 className="text-right">Устгах</h1>
            </div>
            {/* Body */}
            {cartItems.length > 0 && (
              <div className="flex flex-col">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="p-[30px] border-b border-b-border-1 grid grid-cols-4"
                  >
                    <div className="col-span-2 grid grid-cols-5 gap-[30px] items-center">
                      <Link
                        href={`/courses/${item._id}`}
                        className="col-span-2 rounded-lg overflow-hidden group relative"
                      >
                        <Image
                          src={item.picture}
                          alt={item.name}
                          width={200}
                          height={200}
                          className="w-full aspect-square object-cover group-hover:scale-110 duration-300"
                        />

                        <div className="w-full h-full absolute top-0 left-0 right-0 group-hover:bg-head/50 duration-300" />
                      </Link>
                      <Link
                        className="col-span-3 text-head text-base-medium hover:text-head/70 duration-300"
                        href={`/courses/${item._id}`}
                      >
                        {item.name}
                      </Link>
                    </div>

                    <p className="self-center text-center text-text text-base-medium">
                      ₮
                      {item.discountPrice > 0 ? item.discountPrice : item.price}
                      {item.discountPrice > 0 && (
                        <span className="ml-3 line-through text-sm">
                          ₮{item.price}
                        </span>
                      )}
                    </p>

                    <div className="text-right self-center">
                      <button
                        onClick={(): void => {
                          removeCartItem(item);
                        }}
                        className="text-lg text-[#1A3454] hover:text-[#1a3454]/60 duration-300"
                      >
                        <RxCross2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {cartItems.length === 0 && (
              <p className="my-20 text-center text-icon text-md-medium">
                Таны сагсанд сургалт байхгүй байна.
              </p>
            )}
          </div>

          <div className="flex justify-between mb-[20px] lg:mb-[80px]">
            <Link href={"/courses"} className="btn-4">
              Сагс шинэчлэх
            </Link>
          </div>
          <div className="w-full flex flex-col sm:items-start md:items-end">
            <div className="  sm:w-[400px] pt-[34px] px-[30px] rounded-lg border border-border-1 mb-[30px]">
              <h1 className="text-head font-[500] text-[20px] leading-[23px] mb-[16px] border-b pb-2">
                Нийт үнэ
              </h1>
              <div className="flex justify-between items-center mb-[13px]">
                <p className="font-[500] text-[15px] leading-[50px]">Үнэ</p>
                <span className="font-[400] text-[15px] leading-[50px] text-text">
                  ₮{totalPrice}
                </span>
              </div>
            </div>
            <Link
              href={"/user/cart/checkout"}
              className="btn-1 sm:w-2/5 text-center"
            >
              Худалдаж авах
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
