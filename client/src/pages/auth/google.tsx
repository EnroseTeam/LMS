import { axiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import { ReactNode, useContext, useEffect } from "react";
import { NextPageWithLayout } from "../_app";
import NoLayout from "@/layouts/NoLayout";
import { AuthContext } from "@/contexts/AuthContext";

const GoogleLoginPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const code = router.query.code;

    if (code !== undefined) {
      axiosInstance
        .get(`/api/auth/google?code=${code}`)
        .then((res) => {
          if (res.status === 201) {
            setIsLoggedIn(true);
            router.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [router]);

  return <></>;
};

export default GoogleLoginPage;

GoogleLoginPage.getLayout = function getLayout(page): ReactNode {
  return <NoLayout>{page}</NoLayout>;
};
