import Link from "next/link";
import { ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isAxiosError } from "axios";

import { NextPageWithLayout } from "../_app";
import { axiosInstance } from "@/utils/axiosInstance";
import getGoogleOAuthURL from "@/utils/getGoogleUrl";
import AuthLayout from "@/layouts/AuthLayout";

import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import MessageBox from "@/components/global/MessageBox";
import { AuthContext } from "@/contexts/AuthContext";

const RegisterPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { setIsLoggedIn } = useContext(AuthContext);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [agreement, setAgreement] = useState<boolean>(false);

  const [emailExist, setEmailExist] = useState<boolean>(true);
  const [phoneExist, setPhoneExist] = useState<boolean>(true);
  const [firstNameExist, setFirstNameExist] = useState<boolean>(true);
  const [lastNameExist, setLastNameExist] = useState<boolean>(true);
  const [passwordExist, setPasswordExist] = useState<boolean>(true);
  const [rePasswordMatch, setRePasswordMatch] = useState<boolean>(true);

  const [errorMsg, setErrorMsg] = useState<string>("");

  const [isPasswordRequirementMet, setIsPasswordRequirementMet] =
    useState<boolean>(false);

  const [passwordRequirements, setPasswordRequirements] = useState([
    {
      title: "Хамгийн багадаа 8 тэмдэгттэй байх",
      state: false,
      regex: new RegExp("(?=.{8,})"),
    },
    {
      title: "Дор хаяж 1 том үсэг орсон байх",
      state: false,
      regex: new RegExp("(?=.*[A-Z])"),
    },
    {
      title: "Дор хаяж 1 жижиг үсэг орсон байх",
      state: false,
      regex: new RegExp("(?=.*[a-z])"),
    },
    {
      title: "Дор хаяж 1 тоо орсон байх",
      state: false,
      regex: new RegExp("(?=.*[0-9])"),
    },
    {
      title: "Дор хаяж 1 тусгай тэмдэгт орсон байх",
      state: false,
      regex: new RegExp("(?=.*[^A-Za-z0-9])"),
    },
  ]);

  useEffect(() => {
    for (const req of passwordRequirements) {
      if (!req.state) return setIsPasswordRequirementMet(false);
    }

    setIsPasswordRequirementMet(true);
  }, [passwordRequirements]);

  useEffect(() => {
    const newPasswordRequirements = [...passwordRequirements];
    for (const req of newPasswordRequirements) {
      if (req.regex.test(password)) req.state = true;
      else req.state = false;
    }

    setPasswordRequirements(newPasswordRequirements);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  useEffect(() => {
    if (password !== rePassword) setRePasswordMatch(false);
    else setRePasswordMatch(true);
  }, [password, rePassword]);

  const registerUser = async (): Promise<void> => {
    if (!isSubmitting) {
      try {
        setIsSubmitting(true);

        if (
          !firstName ||
          !lastName ||
          !email ||
          !phone ||
          !password ||
          !rePasswordMatch ||
          !isPasswordRequirementMet ||
          !agreement
        ) {
          if (!firstName) setFirstNameExist(false);
          if (!lastName) setLastNameExist(false);
          if (!email) setEmailExist(false);
          if (!phone) setPhoneExist(false);
          if (!password) setPasswordExist(false);
          if (!agreement)
            setErrorMsg(
              "Үйлчилгээний нөхцөлийг заавал зөвшөөрөх шаардлагатай."
            );
          if (!isPasswordRequirementMet)
            setErrorMsg("Нууц үг шаардлага хангахгүй байна");

          return;
        }

        await axiosInstance.post("/api/auth/signup", {
          email,
          phone,
          firstName,
          lastName,
          password,
          rePassword,
        });

        setIsLoggedIn(true);

        router.back();
      } catch (error) {
        if (isAxiosError(error))
          setErrorMsg(
            error.response?.data.error ||
              "Тодорхойгүй алдаа гарлаа. Дахин оролдоно уу."
          );
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="p-[50px] bg-white rounded-2xl shadow-shadow-dashboard mx-1 sm:mx-10 md:mx-0">
      <div className="mb-[30px]">
        <h1 className="text-head text-[30px] font-bold leading-9 mb-2">
          Бүртгүүлэх
        </h1>
        <p className="text-text text-md-regular">
          Манай сайтад бүртгэлтэй юу?{" "}
          <Link href="/auth/login" className="text-color-1">
            Нэвтрэх
          </Link>
        </p>
      </div>
      {errorMsg && (
        <MessageBox type="Error" message={errorMsg} className="mb-5" />
      )}
      <form
        onSubmit={(e): void => {
          e.preventDefault();
          registerUser();
        }}
        className="text-head"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
          <div className="w-full">
            <label className="block mb-2 text-lg-medium" htmlFor="firstName">
              Нэр
            </label>
            <input
              value={firstName}
              onChange={(e): void => {
                setFirstName(e.target.value);
                setFirstNameExist(true);
              }}
              type="text"
              id="firstName"
              className={`border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular ${
                !firstNameExist ? "ring ring-red-500" : ""
              }`}
              placeholder="Нэр"
            />
            {!firstNameExist && (
              <p className="text-red-500 text-md-medium mt-2">
                Нэр заавал шаардлагатай.
              </p>
            )}
          </div>

          <div className="w-full">
            <label className="block mb-2 text-lg-medium" htmlFor="lastName">
              Овог
            </label>
            <input
              value={lastName}
              onChange={(e): void => {
                setLastName(e.target.value);
                setLastNameExist(true);
              }}
              type="text"
              id="lastName"
              className={`border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular ${
                !lastNameExist ? "ring ring-red-500" : ""
              }`}
              placeholder="Овог"
            />
            {!lastNameExist && (
              <p className="text-red-500 text-md-medium mt-2">
                Овог заавал шаардлагатай.
              </p>
            )}
          </div>

          <div className="w-full">
            <label className="block mb-2 text-lg-medium" htmlFor="email">
              И-мэйл
            </label>
            <input
              value={email}
              onChange={(e): void => {
                setEmail(e.target.value);
                setEmailExist(true);
              }}
              type="email"
              id="email"
              className={`border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular ${
                !emailExist ? "ring ring-red-500" : ""
              }`}
              placeholder="И-мэйл"
            />
            {!emailExist && (
              <p className="text-red-500 text-md-medium mt-2">
                И-мэйл заавал шаардлагатай.
              </p>
            )}
          </div>

          <div className="w-full">
            <label className="block mb-2 text-lg-medium" htmlFor="phone">
              Утасны дугаар
            </label>
            <input
              value={phone}
              onChange={(e): void => {
                setPhone(e.target.value);
                setPhoneExist(true);
              }}
              type="text"
              id="phone"
              className={`border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular ${
                !phoneExist ? "ring ring-red-500" : ""
              }`}
              placeholder="Утасны дугаар"
            />
            {!phoneExist && (
              <p className="text-red-500 text-md-medium mt-2">
                Утасны дугаар заавал шаардлагатай.
              </p>
            )}
          </div>

          <div className="w-full">
            <label className="block mb-2 text-lg-medium" htmlFor="password">
              Нууц үг
            </label>
            <input
              value={password}
              onChange={(e): void => {
                setPassword(e.target.value);
                setPasswordExist(true);
              }}
              type="password"
              id="password"
              className={`border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular ${
                !passwordExist ? "ring ring-red-500" : ""
              }`}
              placeholder="Нууц үг"
            />
            {!passwordExist && (
              <p className="text-red-500 text-md-medium mt-2">
                Нууц үг заавал шаардлагатай.
              </p>
            )}
          </div>

          <div className="w-full">
            <label className="block mb-2 text-lg-medium" htmlFor="repassword">
              Нууц үг давтах
            </label>
            <input
              value={rePassword}
              onChange={(e): void => {
                setRePassword(e.target.value);
              }}
              type="password"
              id="repassword"
              className={`border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular ${
                !rePasswordMatch ? "ring ring-red-500" : ""
              }`}
              placeholder="Нууц үг давтах"
            />
            {!rePasswordMatch && (
              <p className="text-red-500 text-md-medium mt-2">
                Давтан нууц үг таарахгүй байна.
              </p>
            )}
          </div>
        </div>

        <div className="mb-7">
          <ul className="flex flex-col gap-1 text-md-regular">
            {passwordRequirements.map((requirement, index) => (
              <li
                key={`password-requirement-${index}`}
                className={`flex items-center gap-2 ${
                  requirement.state ? "text-green-600" : "text-red-600"
                }`}
              >
                {requirement.state && <BsCheckCircle size={15} />}
                {!requirement.state && <BsXCircle size={15} />}
                {requirement.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-[10px] text-sm-regular mb-5">
          <input
            checked={agreement}
            onChange={(e): void => {
              if (e.target.checked) setAgreement(true);
              else setAgreement(false);
            }}
            type="checkbox"
            id="accept"
            className="w-[15px] h-[15px] border-2 border-icon"
          />
          <label className="text-text" htmlFor="accept">
            Үйлчилгээний нөхцөл зөвшөөрөх
          </label>
        </div>

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full btn-2 block mb-5"
        >
          Бүртгүүлэх
        </button>

        <p className="text-center text-md-medium mb-5">Эсвэл</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Link
            href={"/"}
            className="flex items-center justify-center gap-2 text-[#1967d2] py-3 px-5 rounded-lg border-2 border-[#1967d2] hover:bg-[#1967d2] hover:text-white duration-300"
          >
            <FaFacebookF />
            Facebook-ээр бүртгүүлэх
          </Link>
          <Link
            href={getGoogleOAuthURL()}
            className="flex items-center justify-center gap-2 text-[#D93025] py-3 px-5 rounded-lg border-2 border-[#D93025] hover:bg-[#d93025] hover:text-white duration-300"
          >
            <FaGoogle />
            Google-ээр бүртгүүлэх
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;

RegisterPage.getLayout = function getLayout(page): ReactNode {
  return <AuthLayout>{page}</AuthLayout>;
};
