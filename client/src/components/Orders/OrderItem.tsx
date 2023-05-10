import { IUserOrder } from "@/interfaces/user";
import Link from "next/link";
import { FC } from "react";
import { MdOutlineClass } from "react-icons/md";
import classNames from "classnames";

interface OrderItemProps {
  order: IUserOrder;
}

const OrderItem: FC<OrderItemProps> = ({ order }) => (
  <div className="grid grid-cols-7 gap-5 py-5 border-b border-b-border-1 text-text text-md-regular items-center">
    <Link href={`/user/orders/${order._id}`} className="hover:text-head duration-300">
      #{order.orderNumber}
    </Link>
    <span className="col-span-2 flex flex-col gap-4">
      {order.courses.map((course) => (
        <Link
          key={course._id}
          className="flex items-center gap-2 text-head text-base-medium hover:text-color-1 duration-300"
          href={`/courses/${course._id}`}
        >
          <MdOutlineClass />
          <span className="flex-1">{course.name}</span>
        </Link>
      ))}
    </span>

    <span>{new Date(order.createdAt).toLocaleDateString("en-US")}</span>

    <span>₮{order.totalAmount}</span>

    <span>Шилжүүлэг</span>

    <span
      className={classNames("flex items-center gap-2", {
        "text-color-4": order.status === "Pending",
        "text-color-6": order.status === "Accepted",
      })}
    >
      <div
        className={classNames("w-[10px] h-[10px] rounded-full", {
          "bg-color-4": order.status === "Pending",
          "bg-color-6": order.status === "Accepted",
        })}
      />
      {order.status === "Pending" && "Хүлээгдэж буй"}
      {order.status === "Accepted" && "Баталгаажсан"}
    </span>
  </div>
);

export default OrderItem;
