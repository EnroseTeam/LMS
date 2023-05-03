import { useAuthenticate } from "@/hooks/useAuthenticate";
import axios from "axios";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";

const LogoutPage: FC = () => {
  const router = useRouter();
  // const { setUser } = useContext(UserContext);
  const { setLoggedIn } = useAuthenticate();

  useEffect(() => {
    const logoutUser = async (): Promise<void> => {
      try {
        await axios.post(
          `http://localhost:5000/api/auth/logout`,
          {},
          { withCredentials: true }
        );

        setLoggedIn(false);
        localStorage.setItem("loggedIn", JSON.stringify(false));
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    };

    logoutUser();
  }, [router, setLoggedIn]);

  return <></>;
};

export default LogoutPage;
