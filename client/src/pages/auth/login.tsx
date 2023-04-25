import { FC } from "react";

import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage: FC = () => (
  <AuthLayout>
    <LoginForm />
  </AuthLayout>
);

export default LoginPage;
