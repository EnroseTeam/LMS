import UserCloseAccountForm from "@/components/User/UserCloseAccountForm";
import UserPasswordForm from "@/components/User/UserPasswordForm";
import UserPersonalInfoForm from "@/components/User/UserPersonalInfoForm";
import UserSocialAccountForm from "@/components/User/UserSocialAccountForm";
import Tab from "@/components/global/Tab";
import { TabHeaderItem } from "@/components/global/Tab";
import { AuthContext } from "@/contexts/AuthContext";
import DashboardLayout from "@/layouts/DashboardLayout";
import { NextPageWithLayout } from "@/pages/_app";
import React, { ReactNode, useContext } from "react";

const InstructorSettings: NextPageWithLayout = () => {
  const { user } = useContext(AuthContext);

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

  const tabContents: ReactNode[] = [
    <UserPersonalInfoForm key={`user-personal-info`} user={user} />,
    <UserPasswordForm key={`user-password-form`} />,
    <UserSocialAccountForm key={`user-social-account-form`} user={user} />,
    <UserCloseAccountForm key={`user-close-account-form`} />,
  ];

  return (
    <>
      <h1 className="text-head text-3xl-bold mb-[9px]">Хэрэглэгчийн тохиргоо</h1>
      <p className="text-text text-md-regular mb-[60px]">
        Та энэ хэсэгт өөрийн хувийн мэдээлээ шинэчлэх боломжтой.
      </p>
      <div className="w-full rounded-2xl shadow-shadow-dashboard p-[30px] bg-white">
        {user && <Tab tabHeaders={tabHeaders} tabContents={tabContents} />}
      </div>
    </>
  );
};

export default InstructorSettings;
InstructorSettings.getLayout = function getLayout(page): ReactNode {
  return <DashboardLayout>{page}</DashboardLayout>;
};
