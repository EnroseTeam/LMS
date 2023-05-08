import LoadingScreen from "@/utils/LoadingScreen";
import { axiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { NextPageWithLayout } from "../_app";
import NoLayout from "@/layouts/NoLayout";

const GoogleLoginPage: NextPageWithLayout = () => {
  const router = useRouter();

  useEffect(() => {
    const code = router.query.code;

    if (code !== undefined) {
      axiosInstance
        .get(`/api/auth/google?code=${code}`)
        .then((res) => {
          if (res.status === 201) {
            localStorage.setItem("loggedIn", JSON.stringify(true));
            router.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [router]);

  return <LoadingScreen state={true} />;
};

export default GoogleLoginPage;

GoogleLoginPage.getLayout = function getLayout(page): ReactNode {
  return <NoLayout>{page}</NoLayout>;
};
