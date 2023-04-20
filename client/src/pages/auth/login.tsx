import Link from "next/link";
import { FC } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

const Login: FC = () => (
  <div className="grid grid-cols-3">
    <div className=" bg-head h-screen w-screen gird grid-cols-1">1</div>
    <div className=" items-center justify-center bg-bg-5 h-screen w-screen grid grid-cols-1 ">
      <div className="flex flex-col items-center justify-center bg-white w-[520px] h-[603px] ">
        <div className=" w-[470px] h-[553px]">
          <h1 className="text-head text-3xl-bold pt-[50px] pb-[9px]">Login</h1>
          <p>Don't have an account yet?</p>
          <Link href="/" className="text-color-1">
            Sign up for free
          </Link>
          <p className="text-head text-base-medium pt-[30px] pb-[9px]">
            Username Or Email
          </p>
          <input
            type="text"
            placeholder="Ali"
            className="border border-spacing-1 w-[420px] h-[55px] pt-[9px] rounded-xl"
          />
          <p className="text-head text-base-medium pt-[30px] pb-[9px]">
            Password
          </p>
          <input
            type="text"
            placeholder="********************** "
            className="border border-spacing-1 w-[420px] h-[55px] pt-[9px] rounded-xl"
          />
          <p>Username Or Email</p>
          <input type="text" />
          <button className="bg-color-6 w-[420px] h-[60px] rounded-lg text-head text-base-medium">
            Login
          </button>
          <p>Or sign in using</p>
          <div className="flex gap-5">
            <button className="flex flex-row items-center justify-center border-2 rounded-md border-[#1967D2] w-[200px] h-[45px] text-head">
              <p className="w-[2px] h-[15.6px] pr-[9px]">
                <FaFacebookF />
              </p>
              <p className="pl-[9px]">Log In via Facebook</p>
            </button>
            <button className="flex flex-row items-center justify-center border-2 rounded-md border-[#1967D2] w-[200px] h-[45px] text-head">
              <p className="w-[2px] h-[15.6px] pr-[9px]">
                <FaGoogle />
              </p>
              <p className="pl-[9px]">Log In via Google+</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Login;
