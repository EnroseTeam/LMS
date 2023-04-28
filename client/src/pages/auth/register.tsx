import AuthLayout from "@/layouts/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";
import { useRouter } from "next/router";
import { FC } from "react";

const RegisterPage: FC = () => {
  const router = useRouter();

  return (
    <>
      <AuthLayout>
        <RegisterForm />
      </AuthLayout>
    </>
  );
};

export default RegisterPage;
