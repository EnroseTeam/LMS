import { useAuthenticate } from "@/hooks/useAuthenticate";
import { axiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { NextPageWithLayout } from "../_app";
import LoadingScreen from "@/utils/LoadingScreen";
import NoLayout from "@/layouts/NoLayout";
import { removeCookies } from "cookies-next";

const LogoutPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { setLoggedIn } = useAuthenticate();

  useEffect(() => {
    const logoutUser = async (): Promise<void> => {
      try {
        await axiosInstance.post(`/api/auth/logout`);

        removeCookies("connect.sid");
        setLoggedIn(false);
        localStorage.setItem("loggedIn", JSON.stringify(false));
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    };

    logoutUser();
  }, [router, setLoggedIn]);

  return <LoadingScreen state={true} />;
};

export default LogoutPage;

LogoutPage.getLayout = function getLayout(page): ReactNode {
  return <NoLayout>{page}</NoLayout>;
};
