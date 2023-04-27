import axios from "axios";
import Link from "next/link";
import { FC, useContext, useEffect, useState } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import { UserContext } from "@/contexts/UserContext";
import { useRouter } from "next/router";

const RegisterForm: FC = () => {
  const { setLoggedIn } = useContext(UserContext);
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");

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
  }, [password]);

  const registerUser = async (): Promise<void> => {
    if (!isPasswordRequirementMet) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          email,
          phone,
          firstName,
          lastName,
          password,
          rePassword,
        },
        { withCredentials: true }
      );

      setLoggedIn(true);
      localStorage.setItem("loggedIn", JSON.stringify(true));
      router.back();
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
      <form
        onSubmit={(e): void => {
          e.preventDefault();
          registerUser();
        }}
        className="text-head"
      >
        <div className="grid grid-cols-2 gap-5 mb-5">
          <div className="w-full">
            <label className="block mb-2 text-lg-medium" htmlFor="firstName">
              Нэр
            </label>
            <input
              value={firstName}
              onChange={(e): void => {
                setFirstName(e.target.value);
              }}
              type="text"
              id="firstName"
              className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
              placeholder="Нэр"
            />
          </div>

          <div className="w-full">
            <label className="block mb-2 text-lg-medium" htmlFor="lastName">
              Овог
            </label>
            <input
              value={lastName}
              onChange={(e): void => {
                setLastName(e.target.value);
              }}
              type="text"
              id="lastName"
              className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
              placeholder="Овог"
            />
          </div>

          <div className="w-full">
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

          <div className="w-full">
            <label className="block mb-2 text-lg-medium" htmlFor="phone">
              Утасны дугаар
            </label>
            <input
              value={phone}
              onChange={(e): void => {
                setPhone(e.target.value);
              }}
              type="text"
              id="phone"
              className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
              placeholder="Утасны дугаар"
            />
          </div>

          <div className="w-[300px]">
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

          <div className="w-[300px]">
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
              className="border border-border-2 w-full py-[12px] px-[22px] rounded-lg focus:outline-none focus:ring-2 focus:ring-color-1 text-text text-md-regular"
              placeholder="Нууц үг давтах"
            />
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
            type="checkbox"
            id="accept"
            className="w-[15px] h-[15px] border-2 border-icon"
          />
          <label className="text-text" htmlFor="accept">
            Үйлчилгээний нөхцөл зөвшөөрөх
          </label>
        </div>

        <button type="submit" className="w-full btn-2 block mb-5">
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
};

export default RegisterForm;
