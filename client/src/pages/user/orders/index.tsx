import OrderItem from "@/components/Orders/OrderItem";
import UserOrderSkeleton from "@/components/Skeletons/UserOrderSkeleton";
import Breadcrumbs from "@/components/global/Breadcrumbs";
import Tab, { TabHeaderItem } from "@/components/global/Tab";
import { IUserOrder } from "@/interfaces/user";
import { NextPageWithLayout } from "@/pages/_app";
import { fetcher } from "@/utils/fetcher";
import { isAxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSwr from "swr";

const UserOrdersPage: NextPageWithLayout = () => {
  const router = useRouter();

  const {
    data: userOrders,
    isLoading: isOrdersLoading,
    error: userOrderError,
  } = useSwr(
    "/api/users/orders/user",
    fetcher<{ message: string; body: IUserOrder[] }>
  );

  const [allOrders, setAllOrders] = useState<IUserOrder[]>([]);
  const [acceptedOrders, setAcceptedOrders] = useState<IUserOrder[]>([]);
  const [pendingOrders, setPendingOrders] = useState<IUserOrder[]>([]);

  useEffect(() => {
    if (!isOrdersLoading && userOrderError) {
      if (isAxiosError(userOrderError)) {
        if (userOrderError.response?.status === 401)
          router.replace("/auth/login");
      } else {
        router.replace("/");
      }
    }

    if (!isOrdersLoading && userOrders) {
      setAllOrders(userOrders.body);
      setAcceptedOrders(
        userOrders.body.filter((order) => order.status === "Accepted")
      );
      setPendingOrders(
        userOrders.body.filter((order) => order.status === "Pending")
      );
    }
  }, [router, userOrders, isOrdersLoading, userOrderError]);

  const HeaderContent = (
    <div className="grid grid-cols-7 gap-5 pb-5 border-b border-b-border-1  text-head text-base-medium">
      <span>Захиалгын дугаар</span>
      <span className="col-span-2">Сургалтууд</span>
      <span>Огноо</span>
      <span>Нийт үнэ</span>
      <span>Төлбөрийн төрөл</span>
      <span>Захиалгын төлөв</span>
    </div>
  );

  const AllOrdersContent = (
    <div className="w-[1080px] xl:w-full">
      {HeaderContent}
      <div className="flex flex-col gap-5">
        {isOrdersLoading &&
          Array.from(Array(5)).map((val, index) => (
            <UserOrderSkeleton key={index} />
          ))}
        {!isOrdersLoading &&
          allOrders.length > 0 &&
          allOrders.map((order) => <OrderItem key={order._id} order={order} />)}
        {!isOrdersLoading && allOrders.length === 0 && (
          <p className="text-text text-center text-md-medium mt-5">
            Танд одоогоор захиалга байхгүй байна.
          </p>
        )}
      </div>
    </div>
  );

  const AcceptedOrdersContent = (
    <div className="w-[1080px] xl:w-full">
      {HeaderContent}
      <div className="flex flex-col gap-5 ">
        {acceptedOrders.length === 0 && (
          <p className="text-text text-start xl:text-center text-md-medium mt-5">
            Танд одоогоор захиалга байхгүй байна.
          </p>
        )}
        {acceptedOrders.length > 0 &&
          acceptedOrders.map((order) => (
            <OrderItem key={order._id} order={order} />
          ))}
      </div>
    </div>
  );

  const PendingOrdersContent = (
    <div className="w-[1080px] xl:w-full">
      {HeaderContent}
      <div className="flex flex-col gap-5 ">
        {pendingOrders.length === 0 && (
          <p className="text-text text-start xl:text-center text-md-medium mt-5">
            Танд одоогоор захиалга байхгүй байна.
          </p>
        )}
        {pendingOrders.length > 0 &&
          pendingOrders.map((order) => (
            <OrderItem key={order._id} order={order} />
          ))}
      </div>
    </div>
  );

  const tabHeaders: TabHeaderItem[] = [
    { name: "Бүгд", slug: "all" },
    { name: "Баталгаажсан", slug: "accepted" },
    { name: "Хүлээгдэж буй", slug: "pending" },
  ];

  const tabContents: JSX.Element[] = [
    AllOrdersContent,
    AcceptedOrdersContent,
    PendingOrdersContent,
  ];

  return (
    <>
      <Breadcrumbs
        breadcrumbItems={[
          { title: "Хэрэглэгч", link: "/user/settings" },
          { title: "Захиалгууд", link: "/user/orders" },
        ]}
      />
      <div className="container mb-[120px]">
        <h1 className="text-head text-3xl-bold text-center mb-[9px]">
          Миний захиалгууд
        </h1>
        <p className="text-text text-md-regular text-center mb-[60px]">
          Миний захиалсан сургалтуудын мэдээлэл.
        </p>
        <div className="w-full rounded-2xl shadow-shadow-dashboard p-[30px]">
          <Tab tabHeaders={tabHeaders} tabContents={tabContents} />
        </div>
      </div>
    </>
  );
};

export default UserOrdersPage;
