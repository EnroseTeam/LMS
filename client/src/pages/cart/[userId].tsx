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
    <div className="container">
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

      <div className="flex justify-between">
        <div>
          <input type="text" />
        </div>
        <div>hi</div>
      </div>
    </div>
  </div>
);

export default CartPage;
