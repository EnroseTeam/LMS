import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

const LoginForm: FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginUser = async (): Promise<void> => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-[50px] bg-white rounded-2xl shadow-shadow-dashboard">
      <div className="mb-[30px]">
        <h1 className="text-head text-[30px] font-bold leading-9 mb-2">
          Нэвтрэх
        </h1>
        <p className="text-text text-md-regular">
          Манай сайтад бүртгэлгүй юу?{" "}
          <Link href="/auth/register" className="text-color-1">
            Үнэгүй бүртгүүлэх
          </Link>
        </p>
      </div>
      <form
        onSubmit={(e): void => {
          e.preventDefault();
          loginUser();
        }}
        className="text-head"
      >
        <div className="mb-5 w-full">
          <label className="block mb-2 text-lg-medium" htmlFor="email">
            И-мэйл
          </label>
          <input
            value={email}
            onChange={(e): void => {
              setEmail(e.target.value);
            }}
            type="email"
            id="email"
            className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
            placeholder="И-мэйл"
          />
        </div>

        <div className="mb-5 w-full">
          <label className="block mb-2 text-lg-medium" htmlFor="password">
            Нууц үг
          </label>
          <input
            value={password}
            onChange={(e): void => {
              setPassword(e.target.value);
            }}
            type="password"
            id="password"
            className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
            placeholder="Нууц үг"
          />
        </div>

        <div className="flex items-center justify-between text-sm-regular mb-5">
          <div className="flex items-center gap-[10px]">
            <input
              type="checkbox"
              id="remember"
              className="w-[15px] h-[15px] border-2 border-icon"
            />
            <label className="text-text" htmlFor="remember">
              Намайг санах
            </label>
          </div>

          <Link
            className="text-color-1 underline hover:text-color-1/70 duration-300"
            href="/"
          >
            Нууц үгээ мартсан уу?
          </Link>
        </div>

        <button
          type="submit"
          className="block w-full py-4 bg-color-6 text-head rounded-lg mb-5 hover:bg-color-6/70 duration-300"
        >
          Нэвтрэх
        </button>

        <p className="text-center text-md-medium mb-5">Эсвэл</p>

        <div className="flex items-center gap-5">
          <button className="flex items-center gap-2 text-[#1967d2] py-3 px-5 rounded-lg border-2 border-[#1967d2] hover:bg-[#1967d2] hover:text-white duration-300">
            <FaFacebookF />
            Facebook-ээр нэвтрэх
          </button>
          <button className="flex items-center gap-2 text-[#D93025] py-3 px-5 rounded-lg border-2 border-[#D93025] hover:bg-[#d93025] hover:text-white duration-300">
            <FaGoogle />
            Google-ээр нэвтрэх
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
