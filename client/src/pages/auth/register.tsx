import AuthLayout from "@/layouts/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

const RegisterPage: FC = () => {
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
          <RegisterForm />
        </AuthLayout>
      )}
    </>
  );
};

export default RegisterPage;
