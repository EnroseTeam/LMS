import { FC, useState } from "react";
import MessageBox from "../global/MessageBox";
import { isAxiosError } from "axios";
import { useRouter } from "next/router";
import { axiosInstance } from "@/utils/axiosInstance";

const UserCloseAccountForm: FC = () => {
  const router = useRouter();

  const [password, setPassword] = useState<string>("");
  const [isPasswordExist, setIsPasswordExist] = useState<boolean>(true);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [message, setMessage] = useState<string>("");

  const submitHandler = async (): Promise<void> => {
    if (!isSubmitting) {
      try {
        if (!password) return setIsPasswordExist(false);

        setMessage("");
        setIsSubmitting(true);

        await axiosInstance.delete(
          "http://localhost:5000/api/users/delete-account",
          {
            data: { password },
          }
        );

        router.push("/auth/logout");
      } catch (error) {
        if (isAxiosError(error)) {
          setMessage(
            error.response?.data.error ||
              "Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу."
          );
        } else setMessage("Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="-mt-[30px]">
      {message && (
        <MessageBox type="Error" message={message} className="mb-5" />
      )}
      <h1 className="mb-[9px] text-head text-base-medium">Хаяг устгах</h1>
      <p className="mb-[30px] text-text text-md-regular">
        Анхааруулга: Хэрвээ та хаягаа устгавал, худалдаж авсан бүх сургалтын
        эрхээ алдах болно.
      </p>
      <form
        onSubmit={(e): void => {
          e.preventDefault();
          submitHandler();
        }}
        id="close-account-form"
        className="mb-[30px]"
      >
        <div>
          <label
            className="text-head text-base-medium mb-[9px] block"
            htmlFor="password"
          >
            Нууц үгээ оруулна уу
          </label>
          <input
            value={password}
            onChange={(e): void => {
              setPassword(e.target.value);
              setIsPasswordExist(true);
            }}
            type="password"
            id="password"
            className={`px-[22px] py-[12px] w-1/2 rounded-lg border border-border-2 text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1 ${
              !isPasswordExist ? "ring ring-red-500" : ""
            }`}
            placeholder="Нууц үг"
          />
          {!isPasswordExist && (
            <p className="text-red-500 text-md-medium mt-2">
              Нууц үг заавал шаардлагатай.
            </p>
          )}
        </div>
      </form>
      <button
        disabled={isSubmitting}
        type="submit"
        form="close-account-form"
        className="btn-1 py-4"
      >
        Хаяг устгах
      </button>
    </div>
  );
};

export default UserCloseAccountForm;
