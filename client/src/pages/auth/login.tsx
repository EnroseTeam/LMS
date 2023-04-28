import { FC } from "react";

import AuthLayout from "@/layouts/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import { useRouter } from "next/router";

const LoginPage: FC = () => {
  const router = useRouter();

  return (
    <>
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </>
  );
};

export default LoginPage;
