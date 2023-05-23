import { axiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect } from "react";
import { NextPageWithLayout } from "../_app";
import NoLayout from "@/layouts/NoLayout";
import { AuthContext } from "@/contexts/AuthContext";

const LogoutPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { setIsLoggedIn, setUser } = useContext(AuthContext);

  useEffect(() => {
    const logoutUser = async (): Promise<void> => {
      try {
        await axiosInstance.post(`/api/auth/logout`);

        setIsLoggedIn(false);
        setUser(undefined);

        setTimeout(() => {
          router.push("/");
        }, 400);
      } catch (error) {
        console.log(error);
      }
    };

    logoutUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default LogoutPage;

LogoutPage.getLayout = function getLayout(page): ReactNode {
  return <NoLayout>{page}</NoLayout>;
};
