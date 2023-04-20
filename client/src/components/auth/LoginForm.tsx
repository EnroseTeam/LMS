import Link from "next/link";
import { FC } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

const LoginForm: FC = () => (
  <div className="py-[50px] px-[50px] bg-white">
    <h1 className="text-head text-3xl-bold ">Login</h1>
    <p className="text-head text-base-medium pt-[30px] pb-[9px]">
      Username Or Email
    </p>
    <input
      type="text"
      placeholder="Ali"
      className="pl-3 border border-spacing-1 w-[420px] h-[55px] pt-[9px] rounded-xl"
    />
    <p className="text-head text-base-medium pt-[30px] pb-[9px]">Password</p>
    <input
      type="password"
      placeholder="********************** "
      className="pl-3 border border-spacing-1 w-[420px] h-[55px] pt-[9px] rounded-xl"
    />

    <div className="flex items-center justify-between mt-[20px] pb-5">
      <div className="flex items-center ">
        <input type="checkbox" className="border border-2 mr-3" />
        <p>Remember me</p>
      </div>

      <Link href="/" className="text-color-1">
        Forgot your password?
      </Link>
    </div>

    <button className="bg-color-6 w-[420px] h-[60px] py-5 rounded-lg text-head text-base-medium">
      Login
    </button>
    <p className="text-center py-5">Or sign in using</p>
    <div className="flex gap-5">
      <button className="flex flex-row items-center justify-center border-2 rounded-md border-[#1967D2]  w-[200px] h-[45px] text-head">
        <p className="w-[2px] h-[15.6px] pr-[9px]">
          <FaFacebookF />
        </p>
        <p className="pl-[9px]">Log In via Facebook</p>
      </button>
      <button className="flex flex-row items-center justify-center border-2 rounded-md border-[#D93025] text-[#D93025] w-[200px] h-[45px] text-head">
        <p className="w-[2px] h-[15.6px] pr-[9px]">
          <FaGoogle />
        </p>
        <p className="pl-[9px]">Log In via Google+</p>
      </button>
    </div>
  </div>
);

export default LoginForm;
