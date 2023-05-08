import OrderItem from "@/components/Orders/OrderItem";
import Breadcrumbs from "@/components/global/Breadcrumbs";
import Tab, { TabHeaderItem } from "@/components/global/Tab";
import { useAuthenticate } from "@/hooks/useAuthenticate";
import { IUserOrder } from "@/interfaces/user";
import LoadingScreen from "@/utils/LoadingScreen";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

const UserOrdersPage: FC = () => {
  const router = useRouter();
  const { user, isLoading } = useAuthenticate();
  const [isReady, setIsReady] = useState<boolean>(false);

  const [allOrders, setAllOrders] = useState<IUserOrder[]>([]);
  const [acceptedOrders, setAcceptedOrders] = useState<IUserOrder[]>([]);
  const [pendingOrders, setPendingOrders] = useState<IUserOrder[]>([]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
    }
    if (!isLoading && user) {
      setAllOrders(user.orders);
      setAcceptedOrders(user.orders.filter((order) => order.status === "Accepted"));
      setPendingOrders(user.orders.filter((order) => order.status === "Pending"));
      setIsReady(true);
    }
  }, [user, isLoading, router]);

  const HeaderContent = (
    <div className="grid grid-cols-7 gap-5 pb-5 border-b border-b-border-1 -mt-[20px] text-head text-base-medium">
      <span>Захиалгын дугаар</span>
      <span className="col-span-2">Сургалтууд</span>
      <span>Огноо</span>
      <span>Нийт үнэ</span>
      <span>Төлбөрийн төрөл</span>
      <span>Захиалгын төлөв</span>
    </div>
  );

  const AllOrdersContent = (
    <>
      {HeaderContent}
      <div className="flex flex-col gap-5 ">
        {allOrders.length === 0 && (
          <p className="text-text text-center text-md-medium mt-5">
            Танд одоогоор захиалга байхгүй байна.
          </p>
        )}
        {allOrders.length > 0 &&
          allOrders.map((order) => <OrderItem key={order._id} order={order} />)}
      </div>
    </>
  );

  const AcceptedOrdersContent = (
    <>
      {HeaderContent}
      <div className="flex flex-col gap-5 ">
        {acceptedOrders.length === 0 && (
          <p className="text-text text-center text-md-medium mt-5">
            Танд одоогоор захиалга байхгүй байна.
          </p>
        )}
        {acceptedOrders.length > 0 &&
          acceptedOrders.map((order) => <OrderItem key={order._id} order={order} />)}
      </div>
    </>
  );

  const PendingOrdersContent = (
    <>
      {HeaderContent}
      <div className="flex flex-col gap-5 ">
        {pendingOrders.length === 0 && (
          <p className="text-text text-center text-md-medium mt-5">
            Танд одоогоор захиалга байхгүй байна.
          </p>
        )}
        {pendingOrders.length > 0 &&
          pendingOrders.map((order) => <OrderItem key={order._id} order={order} />)}
      </div>
    </>
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

  if (!isReady) return <LoadingScreen state={true} />;

  return (
    <>
      <Breadcrumbs
        breadcrumbItems={[
          { title: "Хэрэглэгч", link: "/user/settings" },
          { title: "Захиалгууд", link: "/user/orders" },
        ]}
      />
      <div className="container mb-[120px]">
        <h1 className="text-head text-3xl-bold mb-[9px]">Миний захиалгууд</h1>
        <p className="text-text text-md-regular mb-[60px]">
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
