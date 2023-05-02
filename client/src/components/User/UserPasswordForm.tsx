import axios, { isAxiosError } from "axios";
import { FC, useEffect, useState } from "react";
import MessageBox from "../global/MessageBox";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";

const UserPasswordForm: FC = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [reNewPassword, setReNewPassword] = useState<string>("");

  const [isOldPasswordExist, setIsOldPasswordExist] = useState<boolean>(true);
  const [isNewPasswordExist, setIsNewPasswordExist] = useState<boolean>(true);
  const [isNewPasswordMatch, setIsNewPasswordMatch] = useState<boolean>(true);

  const [msg, setMsg] = useState<string>("");
  const [type, setType] = useState<"Error" | "Success">("Success");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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
    if (newPassword !== reNewPassword) setIsNewPasswordMatch(false);
    else setIsNewPasswordMatch(true);
  }, [newPassword, reNewPassword]);

  const [isPasswordRequirementMet, setIsPasswordRequirementMet] =
    useState<boolean>(false);

  useEffect(() => {
    for (const req of passwordRequirements) {
      if (!req.state) return setIsPasswordRequirementMet(false);
    }

    setIsPasswordRequirementMet(true);
  }, [passwordRequirements]);

  useEffect(() => {
    const newPasswordRequirements = [...passwordRequirements];
    for (const req of newPasswordRequirements) {
      if (req.regex.test(newPassword)) req.state = true;
      else req.state = false;
    }

    setPasswordRequirements(newPasswordRequirements);
  }, [newPassword]);

  const submitHandler = async (): Promise<void> => {
    try {
      setMsg("");
      setIsSubmitting(true);

      if (
        !oldPassword ||
        !newPassword ||
        newPassword !== reNewPassword ||
        !isPasswordRequirementMet
      ) {
        if (!oldPassword) setIsOldPasswordExist(false);
        if (!newPassword) setIsNewPasswordExist(false);
        if (newPassword !== reNewPassword) setIsNewPasswordMatch(false);
        if (!isPasswordRequirementMet) {
          setType("Error");
          setMsg("Нууц үг шаардлага хангахгүй байна");
        }

        return;
      }

      const res = await axios.patch(
        `http://localhost:5000/api/users/password`,
        { oldPassword, newPassword, reNewPassword },
        { withCredentials: true }
      );

      setMsg(res.data.message);
      setType("Success");
      setOldPassword("");
      setNewPassword("");
      setReNewPassword("");
    } catch (error) {
      if (isAxiosError(error)) {
        setType("Error");
        setMsg(
          error.response?.data.error ||
            "Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу."
        );
      } else {
        setMsg("Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="-mt-[30px] ">
      <div className="grid grid-cols-2 gap-[100px]">
        <form
          id="password-form"
          onSubmit={(e): void => {
            e.preventDefault();
            submitHandler();
          }}
          className="grid grid-cols-1 gap-[30px] mb-[30px]"
        >
          {msg && <MessageBox type={type} message={msg} />}
          <div>
            <label
              className="text-head text-base-medium mb-[9px] block"
              htmlFor="oldPassword"
            >
              Хуучин нууц үг
            </label>
            <input
              value={oldPassword}
              onChange={(e): void => {
                setOldPassword(e.target.value);
                setIsOldPasswordExist(true);
              }}
              type="password"
              id="oldPassword"
              className={`px-[22px] py-[12px] w-full rounded-lg border border-border-2 text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1 ${
                !isOldPasswordExist ? "ring ring-red-500" : ""
              }`}
              placeholder="Хуучин нууц үг"
            />
            {!isOldPasswordExist && (
              <p className="text-red-500 text-md-medium mt-2">
                Хуучин нууц үг заавал шаардлагатай.
              </p>
            )}
          </div>

          <div>
            <label
              className="text-head text-base-medium mb-[9px] block"
              htmlFor="newPassword"
            >
              Шинэ нууц үг
            </label>
            <input
              value={newPassword}
              onChange={(e): void => {
                setNewPassword(e.target.value);
                setIsNewPasswordExist(true);
              }}
              type="password"
              id="newPassword"
              className={`px-[22px] py-[12px] w-full rounded-lg border border-border-2 text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1 ${
                !isNewPasswordExist ? "ring ring-red-500" : ""
              }`}
              placeholder="Шинэ нууц үг"
            />
            {!isNewPasswordExist && (
              <p className="text-red-500 text-md-medium mt-2">
                Шинэ нууц үг заавал шаардлагатай.
              </p>
            )}
          </div>

          <div>
            <label
              className="text-head text-base-medium mb-[9px] block"
              htmlFor="reNewPassword"
            >
              Шинэ нууц үг давтан
            </label>
            <input
              value={reNewPassword}
              onChange={(e): void => {
                setReNewPassword(e.target.value);
              }}
              type="password"
              id="reNewPassword"
              className={`px-[22px] py-[12px] w-full rounded-lg border border-border-2 text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1 ${
                !isNewPasswordMatch ? "ring ring-red-500" : ""
              }`}
              placeholder="Шинэ нууц үг давтан"
            />
            {!isNewPasswordMatch && (
              <p className="text-red-500 text-md-medium mt-2">
                Шинэ нууц үг таарахгүй байна.
              </p>
            )}
          </div>
        </form>

        <div className="flex items-end mb-[30px]">
          <ul className="flex flex-col gap-1 text-md-regular">
            <h1 className="mb-5 text-head text-xl-medium">
              Нууц үгийн шаардлага
            </h1>
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
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        form="password-form"
        className="btn-1 py-4"
      >
        Нууц үг шинэчлэх
      </button>
    </div>
  );
};

export default UserPasswordForm;
