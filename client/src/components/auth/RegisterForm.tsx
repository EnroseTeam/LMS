import Link from "next/link";
import { FC } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

const RegisterForm: FC = () => (
  <div className="p-[50px] bg-white rounded-2xl shadow-shadow-dashboard">
    <div className="mb-[30px]">
      <h1 className="text-head text-[30px] font-bold leading-9 mb-2">
        Бүртгүүлэх
      </h1>
      <p className="text-text text-md-regular">
        Манай сайтад бүртгэлтэй юу?{" "}
        <Link href="/auth/register" className="text-color-1">
          Нэвтрэх
        </Link>
      </p>
    </div>
    <form className="text-head">
      <div className="grid grid-cols-2 gap-5 mb-5">
        <div className="w-full">
          <label className="block mb-2 text-lg-medium" htmlFor="email">
            И-мэйл
          </label>
          <input
            type="email"
            id="email"
            className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
            placeholder="И-мэйл"
          />
        </div>

        <div className="w-full">
          <label className="block mb-2 text-lg-medium" htmlFor="username">
            Хэрэглэгчийн нэр
          </label>
          <input
            type="text"
            id="username"
            className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
            placeholder="Хэрэглэгчийн нэр"
          />
        </div>

        <div className="w-[300px]">
          <label className="block mb-2 text-lg-medium" htmlFor="password">
            Нууц үг
          </label>
          <input
            type="password"
            id="password"
            className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
            placeholder="Нууц үг"
          />
        </div>

        <div className="w-[300px]">
          <label className="block mb-2 text-lg-medium" htmlFor="repassword">
            Нууц үг давтах
          </label>
          <input
            type="password"
            id="repassword"
            className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
            placeholder="Нууц үг давтах"
          />
        </div>
      </div>

      <div className="flex items-center gap-[10px] text-sm-regular mb-5">
        <input
          type="checkbox"
          id="accept"
          className="w-[15px] h-[15px] border-2 border-icon"
        />
        <label className="text-text" htmlFor="accept">
          Үйлчилгээний нөхцөл зөвшөөрөх
        </label>
      </div>

      <button
        type="submit"
        className="block w-full py-4 bg-color-6 text-head rounded-lg mb-5 hover:bg-color-6/70 duration-300"
      >
        Бүртгүүлэх
      </button>

      <p className="text-center text-md-medium mb-5">Эсвэл</p>

      <div className="grid grid-cols-2 gap-5">
        <button className="flex items-center justify-center gap-2 text-[#1967d2] py-3 px-5 rounded-lg border-2 border-[#1967d2] hover:bg-[#1967d2] hover:text-white duration-300">
          <FaFacebookF />
          Facebook-ээр бүртгүүлэх
        </button>
        <button className="flex items-center justify-center gap-2 text-[#D93025] py-3 px-5 rounded-lg border-2 border-[#D93025] hover:bg-[#d93025] hover:text-white duration-300">
          <FaGoogle />
          Google-ээр бүртгүүлэх
        </button>
      </div>
    </form>
  </div>
);

export default RegisterForm;
