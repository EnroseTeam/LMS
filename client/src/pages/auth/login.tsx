import { FC } from "react";

import AuthLayout from "@/layouts/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage: FC = () => (
  <>
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  </>
);

export default LoginPage;
