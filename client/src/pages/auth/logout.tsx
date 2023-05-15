import { useAuthenticate } from "@/hooks/useAuthenticate";
import { axiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { NextPageWithLayout } from "../_app";
import NoLayout from "@/layouts/NoLayout";

const LogoutPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { setLoggedIn } = useAuthenticate();

  useEffect(() => {
    const logoutUser = async (): Promise<void> => {
      try {
        const res = await axiosInstance.post(`/api/auth/logout`);

        if (res.status === 200) {
          setLoggedIn(false);
          localStorage.setItem("loggedIn", JSON.stringify(false));

          setTimeout(() => {
            router.push("/");
          }, 400);
        }
      } catch (error) {
        console.log(error);
      }
    };

    logoutUser();
  }, []);

  return <></>;
};

export default LogoutPage;

LogoutPage.getLayout = function getLayout(page): ReactNode {
  return <NoLayout>{page}</NoLayout>;
};
