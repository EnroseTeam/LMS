import Link from "next/link";
import { FC } from "react";
import { MdOutlineClass } from "react-icons/md";

const OrderItem: FC = () => (
  <div className="grid grid-cols-7 gap-5 py-5 border-b border-b-border-1 text-text text-md-regular items-center">
    <Link href={"/"} className="hover:text-head duration-300">
      #123456789
    </Link>
    <span className="col-span-2 flex flex-col gap-4">
      <Link
        className="flex items-center gap-2 text-head text-base-medium hover:text-color-1 duration-300"
        href={"/"}
      >
        <MdOutlineClass />
        <span className="flex-1">NextJS анхан шатны сургалт</span>
      </Link>
      <Link
        className="flex items-center gap-2 text-head text-base-medium hover:text-color-1 duration-300"
        href={"/"}
      >
        <MdOutlineClass />
        <span className="flex-1">
          NextJS анхан шатны сургалт ба вэб сайт хийж үзэх болно гэдэг итгэлтэй байна.
        </span>
      </Link>
    </span>
    <span>05/07/2023</span>
    <span>₮150,000</span>
    <span>Шилжүүлэг</span>
    <span className="flex items-center gap-2 text-color-4">
      <div className="w-[10px] h-[10px] rounded-full bg-color-4" />
      Хүлээгдэж буй
    </span>
  </div>
);

export default OrderItem;
