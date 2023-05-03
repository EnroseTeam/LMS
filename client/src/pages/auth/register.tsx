import AuthLayout from "@/layouts/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";
import { FC } from "react";

const RegisterPage: FC = () => (
  <>
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  </>
);

export default RegisterPage;
