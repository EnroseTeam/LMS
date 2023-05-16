import UserCloseAccountForm from "@/components/User/UserCloseAccountForm";
import UserPasswordForm from "@/components/User/UserPasswordForm";
import UserPersonalInfoForm from "@/components/User/UserPersonalInfoForm";
import UserSocialAccountForm from "@/components/User/UserSocialAccountForm";
import Breadcrumbs from "@/components/global/Breadcrumbs";
import Tab, { TabHeaderItem } from "@/components/global/Tab";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { NextPageWithLayout } from "../_app";
import TabSkeleton from "@/components/Skeletons/TabSkeleton";
import { AuthContext } from "@/contexts/AuthContext";

const SettingsPage: NextPageWithLayout = () => {
  const { user, isUserLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, isUserLoading, router]);

  const tabHeaders: TabHeaderItem[] = [
    {
      name: "Хувийн мэдээлэл",
      slug: "personal-info",
    },
    {
      name: "Нууц үг",
      slug: "password",
    },
    {
      name: "Сошиал хаягууд",
      slug: "social-accounts",
    },
    {
      name: "Хаяг устгах",
      slug: "close-account",
    },
  ];

  const tabContents: JSX.Element[] = [
    <UserPersonalInfoForm key={`user-personal-info`} user={user} />,
    <UserPasswordForm key={`user-password-form`} />,
    <UserSocialAccountForm key={`user-social-account-form`} user={user} />,
    <UserCloseAccountForm key={`user-close-account-form`} />,
  ];

  return (
    <>
      <Breadcrumbs breadcrumbItems={[{ title: "Хэрэглэгчийн тохиргоо", link: "/user/settings" }]} />
      <div className="container mb-[120px] mt-[90px]">
        <h1 className="text-head text-3xl-bold mb-[9px]">Хэрэглэгчийн тохиргоо</h1>
        <p className="text-text text-md-regular mb-[60px]">Та өөрийн мэдээлээ солих боломжтой.</p>
        <div className="w-full rounded-2xl shadow-shadow-dashboard p-[30px]">
          {isUserLoading && <TabSkeleton />}
          {user && !isUserLoading && <Tab tabHeaders={tabHeaders} tabContents={tabContents} />}
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
