import { UserContext } from "@/contexts/UserContext";
import axios from "axios";
import { useRouter } from "next/router";
import { FC, useContext, useEffect } from "react";

const LogoutPage: FC = () => {
  const router = useRouter();
  const { setUser, setLoggedIn } = useContext(UserContext);

  useEffect(() => {
    const logoutUser = async (): Promise<void> => {
      try {
        await axios.post(
          `http://localhost:5000/api/auth/logout`,
          {},
          { withCredentials: true }
        );

        setUser(null);
        setLoggedIn(false);
        localStorage.setItem("loggedIn", JSON.stringify(false));
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    };

    logoutUser();
  }, []);

  return <></>;
};

export default LogoutPage;
