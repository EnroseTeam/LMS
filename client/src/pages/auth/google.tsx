import LoadingScreen from "@/utils/LoadingScreen";
import { axiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";

const GoogleLoginPage: FC = () => {
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

  return <LoadingScreen />;
};

export default GoogleLoginPage;
