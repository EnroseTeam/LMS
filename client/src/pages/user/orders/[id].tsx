import Breadcrumbs from "@/components/global/Breadcrumbs";
import { IUserOrder } from "@/interfaces/user";
import { NextPageWithLayout } from "@/pages/_app";
import { axiosInstance } from "@/utils/axiosInstance";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BsCheckLg } from "react-icons/bs";
import classNames from "classnames";
import { useRouter } from "next/router";
import { useAuthenticate } from "@/hooks/useAuthenticate";
import LoadingScreen from "@/utils/LoadingScreen";

interface SingleOrderPageProps {
  order: IUserOrder;
}

export const getServerSideProps: GetServerSideProps<SingleOrderPageProps> = async ({ params }) => {
  try {
    const res = await axiosInstance.get(`/api/users/orders/${params?.id}`);

    return {
      props: {
        order: res.data.body,
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};

const SingleOrderPage: NextPageWithLayout<SingleOrderPageProps> = ({ order }) => {
  const router = useRouter();
  const { user, isLoading } = useAuthenticate();
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
    }
    if (!isLoading && user) {
      const orders = user.orders.map((order) => order._id);
      if (!orders.includes(order._id)) {
        router.push("/user/orders");
      } else {
        setIsReady(true);
      }
    }
  }, [order, user, isLoading, router]);

  if (!isReady) return <LoadingScreen state={true} />;

  return (
    <div key={order._id}>
      <Breadcrumbs
        breadcrumbItems={[
          { title: "Хэрэглэгч", link: "/user/settings" },
          { title: "Захиалгууд", link: "/user/orders" },
          { title: `Захиалга #${order.orderNumber}`, link: `/user/order/${order._id}` },
        ]}
      />
      <div className="max-w-[1100px] mx-auto mb-[120px]">
        <h1 className="text-center text-head text-4x-bold mb-1">Захиалга #{order.orderNumber}</h1>
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

        <div
          className={classNames(
            "w-full border-2 border-dashed border-color-1 rounded-lg px-[60px] py-10",
            { "mb-[30px]": order.status === "Pending" },
            { "mb-[60px]": order.status === "Accepted" }
          )}
        >
          <div className="grid grid-cols-5 text-head text-md-regular mb-5">
            <span>Захиалгын дугаар</span>
            <span>Огноо</span>
            <span>Нийт үнэ</span>
            <span>Төлбөрийн төрөл</span>
            <span>Захиалгын төлөв</span>
          </div>

          <div className="grid grid-cols-5 text-color-1 text-md-medium">
            <span>#{order.orderNumber}</span>
            <span>{new Date(order.createdAt).toLocaleDateString("en-US")}</span>
            <span>₮{order.totalAmount}</span>
            <span>Банкны шилжүүлэг</span>
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
        </div>

        {order.status === "Pending" && (
          <div className="text-center text-text text-md-medium mb-[30px]">
            Хэрэв та төлбөрөө шилжүүлээгүй бол Голомт банкны 4605111981 дугаарт дансруу шилжүүлснээр
            таны захиалга баталгаажих болно.
          </div>
        )}

        <div className="bg-bg-1 border border-border-1 rounded-lg p-[60px]">
          <h2 className="mb-10 text-head text-xl font-medium leading-[23px]">Захиалгын мэдээлэл</h2>
          <div className="flex items-center justify-between pb-[15px] border-b border-b-border-1 text-head text-md-medium">
            <h5>Сургалт</h5>
            <h5>Үнэ</h5>
          </div>

          <div className="py-3 border-b border-b-border-1 flex flex-col gap-5 text-text text-md-regular">
            {order.courses.map((course) => (
              <div key={course._id} className="flex items-center justify-between">
                <Link className="hover:text-color-1 duration-300" href={`/courses/${course._id}`}>
                  {course.name}
                </Link>
                <span>₮{course.discountPrice > 0 ? course.discountPrice : course.price}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-head text-md-medium py-5">
            <h5>Нийт үнэ</h5>
            <span>₮{order.totalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrderPage;
