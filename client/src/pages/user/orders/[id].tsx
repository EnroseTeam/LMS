import Breadcrumbs from "@/components/global/Breadcrumbs";
import { NextPageWithLayout } from "@/pages/_app";
import Link from "next/link";
import React from "react";
import { BsCheckLg } from "react-icons/bs";

const SingleOrderPage: NextPageWithLayout = () => (
  <>
    <Breadcrumbs
      breadcrumbItems={[
        { title: "Хэрэглэгч", link: "/user/settings" },
        { title: "Захиалгууд", link: "/user/orders" },
        { title: "Захиалга #123", link: "/user/order/123" },
      ]}
    />
    <div className="max-w-[1100px] mx-auto mb-[120px]">
      <h1 className="text-center text-head text-4x-bold mb-1">Захиалга #123</h1>
      <p className="text-text text-lg-regular mb-[90px] text-center">
        We’re on a mission to deliver engaging, curated courses at a reasonable price.
      </p>

      <div className="flex flex-col gap-5 items-center mb-[70px]">
        <div className="bg-color-1 p-4 rounded-full overflow-hidden text-white text-5xl">
          <BsCheckLg />
        </div>
        <h2 className="text-head text-3xl-bold">Таны захиалга амжилттай.</h2>
        <p className="text-text text-md-regular">Баярлалаа. Таны захиалгыг бид хүлээж авлаа.</p>
      </div>

      <div className="w-full border-2 border-dashed border-color-1 rounded-lg px-[60px] py-10 mb-[60px]">
        <div className="grid grid-cols-5 text-head text-md-regular mb-5">
          <span>Захиалгын дугаар</span>
          <span>Огноо</span>
          <span>Нийт үнэ</span>
          <span>Төлбөрийн төрөл</span>
          <span>Захиалгын төлөв</span>
        </div>

        <div className="grid grid-cols-5 text-color-1 text-md-medium">
          <span>#123</span>
          <span>07/27/2023</span>
          <span>₮45000</span>
          <span>Банкны шилжүүлэг</span>
          <span className="flex items-center gap-2 text-color-4">
            <div className="w-[10px] h-[10px] rounded-full bg-color-4" />
            Хүлээгдэж буй
          </span>
        </div>
      </div>

      <div className="bg-bg-1 border border-border-1 rounded-lg p-[60px]">
        <h2 className="mb-10 text-head text-xl font-medium leading-[23px]">Захиалгын мэдээлэл</h2>
        <div className="flex items-center justify-between pb-[15px] border-b border-b-border-1 text-head text-md-medium">
          <h5>Сургалт</h5>
          <h5>Үнэ</h5>
        </div>

        <div className="py-3 border-b border-b-border-1 flex flex-col gap-5 text-text text-md-regular">
          <div className="flex items-center justify-between">
            <Link className="hover:text-color-1 duration-300" href={`/courses/`}>
              NextJS
            </Link>
            <span>₮45000</span>
          </div>

          <div className="flex items-center justify-between">
            <Link className="hover:text-color-1 duration-300" href={`/courses/`}>
              NextJS
            </Link>
            <span>₮45000</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-head text-md-medium py-5">
          <h5>Нийт үнэ</h5>
          <span>₮45000</span>
        </div>
      </div>
    </div>
  </>
);

export default SingleOrderPage;
