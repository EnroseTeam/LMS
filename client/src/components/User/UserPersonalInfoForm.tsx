import { IUser } from "@/interfaces/user";
import { isAxiosError } from "axios";
import Image from "next/image";
import { FC, useContext, useState } from "react";

import { SlCloudUpload, SlTrash } from "react-icons/sl";
import { BiLoader } from "react-icons/bi";
import MessageBox from "../global/MessageBox";
import { axiosInstance } from "@/utils/axiosInstance";
import { AuthContext } from "@/contexts/AuthContext";

interface UserPersonalInfoFormProps {
  user?: IUser;
}

const UserPersonalInfoForm: FC<UserPersonalInfoFormProps> = ({ user = {} as IUser }) => {
  const { setUser } = useContext(AuthContext);

  const [profilePicture, setProfilePicture] = useState<string>(user.avatar);
  const defaultProfile =
    "https://team-enrose-s3-bucket.s3.ap-northeast-1.amazonaws.com/images/T_Rpl0_PKsXMrHoPphE91-default-profile.jpg";

  const [firstName, setFirstName] = useState<string>(user.firstName);
  const [lastName, setLastName] = useState<string>(user.lastName);
  const [email, setEmail] = useState<string>(user.email);
  const [phone, setPhone] = useState<string>(user.phone);
  const [birthday, setBirthday] = useState<string>(
    user.birthDate ? new Date(user.birthDate).toISOString().split("T")[0] : ""
  );
  const [address, setAddress] = useState<string>(user.address.apartment);
  const [district, setDistrict] = useState<string>(user.address.district);
  const [city, setCity] = useState<string>(user.address.city);
  const [country, setCountry] = useState<string>(user.address.country);
  const [bio, setBio] = useState<string>(user.bio || "");

  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<"Error" | "Success">("Success");

  const [isPictureLoading, setIsPictureLoading] = useState<boolean>(false);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [isFirstNameExist, setIsFirstNameExist] = useState<boolean>(true);
  const [isLastNameExist, setIsLastNameExist] = useState<boolean>(true);
  const [isEmailExist, setIsEmailExist] = useState<boolean>(true);
  const [isPhoneExist, setIsPhoneExist] = useState<boolean>(true);
  const [isBirthdayExist, setIsBirthDayExist] = useState<boolean>(true);

  const removePicture = (): void => {
    setProfilePicture(defaultProfile);
  };

  const uploadPicture = async (image: FileList | null): Promise<void> => {
    try {
      setMessage("");
      setIsPictureLoading(true);
      if (!image) {
        return setMessage("Зураг оруулаагүй байна.");
      }

      const res = await axiosInstance.post(
        `/api/files/images`,
        {
          file: image[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProfilePicture(res.data.body);
      setType("Success");
      setMessage(res.data.message);
    } catch (error) {
      setType("Error");
      if (isAxiosError(error)) {
        setMessage(error.response?.data.error || "Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу.");
      } else {
        setMessage("Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу.");
      }
    } finally {
      setIsPictureLoading(false);
    }
  };

  const submitHandler = async (): Promise<void> => {
    if (!isSubmitting) {
      try {
        setIsSubmitting(true);
        setMessage("");

        if (!firstName || !lastName || !email || !phone || !birthday) {
          if (!firstName) setIsFirstNameExist(false);
          if (!lastName) setIsLastNameExist(false);
          if (!email) setIsEmailExist(false);
          if (!phone) setIsPhoneExist(false);
          if (!birthday) setIsBirthDayExist(false);
          return;
        }

        const res = await axiosInstance.patch("/api/users/personal-info", {
          firstName,
          lastName,
          email,
          phone,
          birthDate: new Date(birthday),
          address: {
            country,
            city,
            district,
            apartment: address,
          },
          avatar: profilePicture,
        });

        setUser({
          ...user,
          firstName,
          lastName,
          email,
          phone,
          birthDate: new Date(birthday).toISOString(),
          address: { country, city, district, apartment: address },
          avatar: profilePicture,
        });

        setType("Success");
        setMessage(res.data.message);
      } catch (error) {
        setType("Error");
        if (isAxiosError(error)) {
          setMessage(
            error.response?.data.error || "Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу."
          );
        } else {
          setMessage("Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу.");
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="">
      {message && <MessageBox type={type} message={message} className="mb-5" />}
      <div className="pb-[30px] mb-[30px] border-b border-b-border-1 flex items-center gap-5">
        <div className="w-[100px] h-[100px] rounded-full overflow-hidden relative">
          <Image
            alt={user.fullName}
            src={profilePicture}
            width={100}
            height={100}
            className="w-full aspect-square object-cover"
          />
          {isPictureLoading && (
            <div className="w-full h-full absolute top-0 right-0 left-0 bottom-0 bg-text/50 text-white grid place-items-center">
              <BiLoader className="animate-spin" size={26} />
            </div>
          )}
        </div>
        <div>
          <h3 className="mb-[9px] text-head text-base-medium">Таны зураг</h3>
          <p className="mb-[14px] text-text text-sm-regular">
            2мб-ээс дээшгүй зурган файл байх ёстой.
          </p>
          <div className="flex items-center gap-3 text-base text-icon">
            <label
              className={`block cursor-pointer p-[10px] bg-bg-4 rounded-lg hover:text-white hover:bg-icon duration-300 ${
                isPictureLoading ? "pointer-events-none bg-icon/50" : ""
              }`}
            >
              <SlCloudUpload />
              <input
                onChange={(e): void => {
                  uploadPicture(e.target.files);
                }}
                accept="image/png, image/jpg, image/jpeg"
                type="file"
                className="sr-only"
              />
            </label>

            <button
              disabled={isPictureLoading || profilePicture === defaultProfile}
              onClick={removePicture}
              className="p-[10px] bg-bg-4 rounded-lg hover:text-white hover:bg-icon duration-300 disabled:pointer-events-none disabled:bg-icon/60"
            >
              <SlTrash />
            </button>
          </div>
        </div>
      </div>
      <form
        id="personal-info-form"
        onSubmit={(e): void => {
          e.preventDefault();
          submitHandler();
        }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-[30px] mb-[30px]"
      >
        <div>
          <label
            className="text-head text-base-medium mb-[9px] block after:content-['*'] after:text-red-500 after:ml-1"
            htmlFor="firstName"
          >
            Нэр
          </label>
          <input
            value={firstName}
            onChange={(e): void => {
              setFirstName(e.target.value);
            }}
            type="text"
            id="firstName"
            className={`px-[22px] py-[12px] w-full rounded-lg border border-border-2 text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1 ${
              !isFirstNameExist ? "ring ring-red-500" : ""
            }`}
            placeholder="Нэр"
          />
          {!isFirstNameExist && (
            <p className="text-red-500 text-md-medium mt-2">Нэр заавал шаардлагатай.</p>
          )}
        </div>

        <div>
          <label
            className="text-head text-base-medium mb-[9px] block after:content-['*'] after:text-red-500 after:ml-1"
            htmlFor="lastName"
          >
            Овог
          </label>
          <input
            value={lastName}
            onChange={(e): void => {
              setLastName(e.target.value);
            }}
            type="text"
            id="lastName"
            className={`px-[22px] py-[12px] w-full rounded-lg border border-border-2 text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1 ${
              !isLastNameExist ? "ring ring-red-500" : ""
            }`}
            placeholder="Овог"
          />
          {!isLastNameExist && (
            <p className="text-red-500 text-md-medium mt-2">Овог заавал шаардлагатай.</p>
          )}
        </div>

        <div>
          <label
            className="text-head text-base-medium mb-[9px] block after:content-['*'] after:text-red-500 after:ml-1"
            htmlFor="email"
          >
            И-мэйл
          </label>
          <input
            value={email}
            onChange={(e): void => {
              setEmail(e.target.value);
            }}
            type="email"
            id="email"
            className={`px-[22px] py-[12px] w-full rounded-lg border border-border-2 text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1 ${
              !isEmailExist ? "ring ring-red-500" : ""
            }`}
            placeholder="И-мэйл"
          />
          {!isEmailExist && (
            <p className="text-red-500 text-md-medium mt-2">И-мэйл заавал шаардлагатай.</p>
          )}
        </div>

        <div>
          <label
            className="text-head text-base-medium mb-[9px] block after:content-['*'] after:text-red-500 after:ml-1"
            htmlFor="phone"
          >
            Утасны дугаар
          </label>
          <input
            value={phone}
            onChange={(e): void => {
              setPhone(e.target.value);
            }}
            type="text"
            id="phone"
            className={`px-[22px] py-[12px] w-full rounded-lg border border-border-2 text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1 ${
              !isPhoneExist ? "ring ring-red-500" : ""
            }`}
            placeholder="Утасны дугаар"
          />
          {!isPhoneExist && (
            <p className="text-red-500 text-md-medium mt-2">Утасны дугаар заавал шаардлагатай.</p>
          )}
        </div>

        <div>
          <label
            className="text-head text-base-medium mb-[9px] block after:content-['*'] after:text-red-500 after:ml-1"
            htmlFor="birthday"
          >
            Төрсөн өдөр
          </label>
          <input
            value={birthday}
            onChange={(e): void => {
              setBirthday(e.target.value);
            }}
            type="date"
            id="birthday"
            className={`px-[22px] py-[12px] w-full rounded-lg border border-border-2 text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1 ${
              !isBirthdayExist ? "ring ring-red-500" : ""
            }`}
          />
          {!isBirthdayExist && (
            <p className="text-red-500 text-md-medium mt-2">Төрсөн өдөр заавал шаардлагатай.</p>
          )}
        </div>

        <div>
          <label className="text-head text-base-medium mb-[9px] block" htmlFor="address">
            Хаяг
          </label>
          <input
            value={address}
            onChange={(e): void => {
              setAddress(e.target.value);
            }}
            type="text"
            id="address"
            className="px-[22px] py-[12px] w-full rounded-lg border border-border-2 text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1"
            placeholder="Хаяг"
          />
        </div>

        <div>
          <label className="text-head text-base-medium mb-[9px] block" htmlFor="district">
            Дүүрэг /Сум/
          </label>
          <input
            value={district}
            onChange={(e): void => {
              setDistrict(e.target.value);
            }}
            type="text"
            id="district"
            className="px-[22px] py-[12px] w-full rounded-lg border border-border-2 text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1"
            placeholder="Дүүрэг /Сум/"
          />
        </div>

        <div>
          <label className="text-head text-base-medium mb-[9px] block" htmlFor="city">
            Хот /Аймаг/
          </label>
          <input
            value={city}
            onChange={(e): void => {
              setCity(e.target.value);
            }}
            type="text"
            id="city"
            className="px-[22px] py-[12px] w-full rounded-lg border border-border-2 text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1"
            placeholder="Хот /Аймаг/"
          />
        </div>

        <div className="col-span-1 sm:col-span-2">
          <label className="text-head text-base-medium mb-[9px] block" htmlFor="country">
            Улс
          </label>
          <input
            value={country}
            onChange={(e): void => {
              setCountry(e.target.value);
            }}
            type="text"
            id="country"
            className="px-[22px] py-[12px] w-full rounded-lg border border-border-2 text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1"
            placeholder="Улс"
          />
        </div>

        <div className="col-span-1 sm:col-span-2">
          <label className="text-head text-base-medium mb-[9px] block" htmlFor="bio">
            Хувийн тайлбар
          </label>
          <textarea
            value={bio}
            onChange={(e): void => {
              setBio(e.target.value);
            }}
            id="bio"
            className="px-[22px] py-[12px] w-full rounded-lg border border-border-2 text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1 resize-none"
            placeholder="Хувийн тайлбар"
            rows={10}
          />
        </div>
      </form>
      <button
        disabled={isSubmitting || isPictureLoading}
        type="submit"
        form="personal-info-form"
        className="btn-1 py-4"
      >
        Мэдээлэл хадгалах
      </button>
    </div>
  );
};

export default UserPersonalInfoForm;
