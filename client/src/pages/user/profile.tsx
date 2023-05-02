import UserCloseAccountForm from "@/components/User/UserCloseAccountForm";
import UserPasswordForm from "@/components/User/UserPasswordForm";
import UserPersonalInfoForm from "@/components/User/UserPersonalInfoForm";
import UserSocialAccountForm from "@/components/User/UserSocialAccountForm";
import Breadcrumbs from "@/components/global/Breadcrumbs";
import Tab, { TabHeaderItem } from "@/components/global/Tab";
import { useAuthenticate } from "@/hooks/useAuthenticate";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

const ProfilePage: FC = () => {
  const { user, isLoading } = useAuthenticate();
  const [isReady, setIsReady] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
    }
    if (!isLoading && user) {
      setIsReady(true);
    }
  }, [user, isLoading, router]);

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

  if (!isReady) return <div>Loading</div>;

  return (
    <>
      <Breadcrumbs
        breadcrumbItems={[
          { title: "Хэрэглэгчийн булан", link: "/user/profile" },
        ]}
      />
      <div className="container mb-[120px] mt-[90px]">
        <h1 className="text-head text-3xl-bold mb-[9px]">Хэрэглэгчийн булан</h1>
        <p className="text-text text-md-regular mb-[60px]">
          Та өөрийн мэдээлээ солих боломжтой.
        </p>
        <div className="w-full rounded-2xl shadow-shadow-dashboard p-[30px]">
          <Tab tabHeaders={tabHeaders} tabContents={tabContents} />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
