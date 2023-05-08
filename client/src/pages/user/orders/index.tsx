import OrderItem from "@/components/Orders/OrderItem";
import Breadcrumbs from "@/components/global/Breadcrumbs";
import Tab, { TabHeaderItem } from "@/components/global/Tab";
import { useAuthenticate } from "@/hooks/useAuthenticate";
import LoadingScreen from "@/utils/LoadingScreen";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

const UserOrdersPage: FC = () => {
  const router = useRouter();
  const { user, isLoading } = useAuthenticate();
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
    }
    if (!isLoading && user) {
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
        <OrderItem />
      </div>
    </>
  );

  const AcceptedOrdersContent = (
    <>
      {HeaderContent}
      <div className="flex flex-col gap-5 ">
        <OrderItem />
      </div>
    </>
  );

  const PendingOrdersContent = (
    <>
      {HeaderContent}
      <div className="flex flex-col gap-5 ">
        <OrderItem />
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
