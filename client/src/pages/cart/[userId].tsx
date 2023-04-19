import { FC } from "react";
import { ICourseCategory } from "@/interfaces/courses";
import { GetServerSideProps } from "next";
import axios from "axios";
import Image from "next/image";

import Breadcrumbs from "@/components/global/Breadcrumbs";
import placeholder from "../../assets/placeholder.png";

import { RxCross2 } from "react-icons/rx";

interface CartPageProps {
  categories: ICourseCategory[];
}
export const getServerSideProps: GetServerSideProps<
  CartPageProps
> = async () => {
  const categoryRes = await axios.get(
    "http://localhost:5000/api/courses/categories"
  );
  return {
    props: {
      categories: categoryRes.data.body,
    },
  };
};

const CartPage: FC = () => (
  <div>
    <Breadcrumbs breadcrumbItems={[{ title: "Сагс", link: "/cart" }]} />
    <div className="container mb-[120px]">
      <div className="mx-[200px]">
        <div className="text-center mb-[90px]">
          <h1 className="font-[700] text-[40px] leading-[46px] text-head mb-1">
            Shop Cart
          </h1>
          <p className="text-text font-[400] text-[17px] leading-[36px]">
            We’re on a mission to deliver engaging, curated courses at a
            reasonable price.
          </p>
        </div>
        <div className="mb-[25px]">
          <table className="w-full table-auto">
            <thead className="bg-bg-3 w-full">
              <tr className="w-full text-[16px] leading-[19px] text-color-1 text-left">
                <th className="pl-[50px] pt-[28px] pb-[23px] w-[25%] font-[500]">
                  Product
                </th>
                <th className="text-center pr-[30px] font-[500]">Price</th>
                <th className="text-center font-[500] w-[25%]">Remove</th>
              </tr>
            </thead>

            <tbody className="w-full">
              <tr className="w-full border-b border-b-border-1">
                <td className="flex items-center gap-[29px] pl-[50px] py-[30px]">
                  <div className="rounded-lg overflow-hidden w-[100px] h-[100px]">
                    <Image
                      src={placeholder}
                      alt=""
                      width={100}
                      height={100}
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                  <p className="text-head text-base-medium">Next JS</p>
                </td>
                <td className="text-center pr-[30px] text-head">$298</td>
                <td className="pl-[45px] text-center">
                  <button className="text-icon">
                    <RxCross2 size={25} />
                  </button>
                </td>
              </tr>

              <tr className="w-full border-b border-b-border-1">
                <td className="flex items-center gap-[29px] pl-[50px] py-[30px]">
                  <div className="rounded-lg overflow-hidden w-[100px] h-[100px]">
                    <Image
                      src={placeholder}
                      alt=""
                      width={100}
                      height={100}
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                  <p className="text-head text-base-medium">Next JS</p>
                </td>
                <td className="text-center pr-[30px] text-head">$298</td>
                <td className="pl-[45px] text-center">
                  <button className="text-icon">
                    <RxCross2 size={25} />
                  </button>
                </td>
              </tr>

              <tr className="w-full border-b border-b-border-1">
                <td className="flex items-center gap-[29px] pl-[50px] py-[30px]">
                  <div className="rounded-lg overflow-hidden w-[100px] h-[100px]">
                    <Image
                      src={placeholder}
                      alt=""
                      width={100}
                      height={100}
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                  <p className="text-head text-base-medium">Next JS</p>
                </td>
                <td className="text-center pr-[30px] text-head">$298</td>
                <td className="pl-[45px] text-center">
                  <button className="text-icon">
                    <RxCross2 size={25} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mb-[119px]">
          <div className="relative flex items-center w-[370px] h-[60px] rounded-lg border border-[#DDDDDD] overflow-hidden focus-within:rounded-lg">
            <input
              type="text"
              placeholder="Coupon Code"
              className="w-full h-full py-[22px] pl-[24px] pr-[150px] focus:outline-none"
            />
            <button className=" absolute right-[24px] text-sm-medium text-color-1">
              Apply Coupon
            </button>
          </div>
          <button className="w-[196px] h-[61] bg-color-1/[.07] rounded-lg text-base-medium text-color-1">
            Update Cart
          </button>
        </div>
        <div className="w-full flex flex-col items-end">
          <div className="w-[370px] pt-[34px] px-[30px] rounded-lg border border-border-1 mb-[30px]">
            <h1 className="text-head font-[500] text-[20px] leading-[23px] mb-[16px] border-b pb-2">
              Cart Totals
            </h1>
            <div className="flex justify-between items-center mb-[13px]">
              <p className="font-[500] text-[15px] leading-[50px]">Total</p>
              <span className="font-[400] text-[15px] leading-[50px] text-text">
                ₮50.000
              </span>
            </div>
          </div>
          <button className="w-[370px] h-[60px] bg-color-1 rounded-lg text-white text-base-medium">
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default CartPage;
