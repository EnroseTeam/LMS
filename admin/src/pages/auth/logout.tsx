import React, { ReactNode, useContext, useEffect } from "react";
import { NextPageWithLayout } from "../_app";
import NoLayout from "@/layouts/NoLayout";
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";
import { axiosInstance } from "@/utils/axiosInstance";
import { toast } from "react-toastify";

const LogoutPage: NextPageWithLayout = () => {
  const router = useRouter();

  const { setUser, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const logout = async (): Promise<void> => {
      try {
        await axiosInstance.post("/api/auth/logout");

        setIsLoggedIn(false);
        setUser(undefined);

        toast.warning("Та системээс гарлаа!");

        setTimeout(() => {
          router.push("/auth/login");
        }, 500);
      } catch (error) {
        console.log(error);
      }
    };

    logout();
  }, []);

  return <></>;
};

export default LogoutPage;
LogoutPage.getLayout = function getLayout(page): ReactNode {
  return <NoLayout>{page}</NoLayout>;
};
