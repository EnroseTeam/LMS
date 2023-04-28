import { UserContext } from "@/contexts/UserContext";
import axios from "axios";
import { useRouter } from "next/router";
import React, { FC, useEffect, useContext } from "react";

const LoginSuccess: FC = () => {
  const router = useRouter();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/current`, { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        router.push("/");
      });
  }, []);

  return <></>;
};

export default LoginSuccess;
