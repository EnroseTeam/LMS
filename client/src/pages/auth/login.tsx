import { FC, useEffect, useState } from "react";

import AuthLayout from "@/layouts/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import { useRouter } from "next/router";

const LoginPage: FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("loggedIn") as string)) {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {!isLoading && (
        <AuthLayout>
          <LoginForm />
        </AuthLayout>
      )}
    </>
  );
};

export default LoginPage;
