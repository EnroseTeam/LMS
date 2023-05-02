import { IUser } from "@/interfaces/user";
import Image from "next/image";
import { FC, useState } from "react";

import { SlCloudUpload, SlTrash } from "react-icons/sl";

interface UserPersonalInfoFormProps {
  user?: IUser;
}

const UserPersonalInfoForm: FC<UserPersonalInfoFormProps> = ({
  user = {} as IUser,
}) => {
  const [firstName, setFirstName] = useState<string>(user.firstName);
  const [lastName, setLastName] = useState<string>(user.lastName);
  const [email, setEmail] = useState<string>(user.email);
  const [phone, setPhone] = useState<string>(user.phone);
  const [birthday, setBirthday] = useState<string>(
    new Date(user.birthDate).toISOString().split("T")[0]
  );
  const [address, setAddress] = useState<string>(user.address?.apartment || "");
  const [district, setDistrict] = useState<string>(
    user.address?.disctrict || ""
  );
  const [city, setCity] = useState<string>(user.address?.city || "");
  const [country, setCountry] = useState<string>(user.address?.country || "");
  const [bio, setBio] = useState<string>(user.bio);

  const submitHandler = (): void => undefined;

  return (
    <div className="-mt-[30px]">
      <div className="pb-[30px] mb-[30px] border-b border-b-border-1 flex items-center gap-5">
        <div className="w-[100px] h-[100px] rounded-full overflow-hidden">
          <Image
            alt={user.fullName}
            src={user.avatar}
            width={100}
            height={100}
            className="w-full aspect-square object-cover"
          />
        </div>
        <div>
          <h3 className="mb-[9px] text-head text-base-medium">Таны зураг</h3>
          <p className="mb-[14px] text-text text-sm-regular">
            2мб-ээс дээшгүй зурган файл байх ёстой.
          </p>
          <div className="flex items-center gap-3 text-base text-icon">
            <button className="p-[10px] bg-bg-4 rounded-lg hover:text-white hover:bg-icon duration-300">
              <SlCloudUpload />
            </button>
            <button className="p-[10px] bg-bg-4 rounded-lg hover:text-white hover:bg-icon duration-300">
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
        className="grid grid-cols-2 gap-[30px] mb-[30px]"
      >
        <div>
          <label
            className="text-head text-base-medium mb-[9px] block"
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
            className="px-[22px] py-[12px] w-full rounded-lg border border-border-2 text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1"
            placeholder="Нэр"
          />
        </div>

        <div>
          <label
            className="text-head text-base-medium mb-[9px] block"
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
            className="px-[22px] py-[12px] w-full rounded-lg border border-border-2 text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1"
            placeholder="Овог"
          />
        </div>

        <div>
          <label
            className="text-head text-base-medium mb-[9px] block"
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
            className="px-[22px] py-[12px] w-full rounded-lg border border-border-2 text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1"
            placeholder="И-мэйл"
          />
        </div>

        <div>
          <label
            className="text-head text-base-medium mb-[9px] block"
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
            className="px-[22px] py-[12px] w-full rounded-lg border border-border-2 text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1"
            placeholder="Утасны дугаар"
          />
        </div>

        <div>
          <label
            className="text-head text-base-medium mb-[9px] block"
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
            className="px-[22px] py-[12px] w-full rounded-lg border border-border-2 text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1"
          />
        </div>

        <div>
          <label
            className="text-head text-base-medium mb-[9px] block"
            htmlFor="address"
          >
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
          <label
            className="text-head text-base-medium mb-[9px] block"
            htmlFor="district"
          >
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
          <label
            className="text-head text-base-medium mb-[9px] block"
            htmlFor="city"
          >
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

        <div className="col-span-2">
          <label
            className="text-head text-base-medium mb-[9px] block"
            htmlFor="country"
          >
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

        <div className="col-span-2">
          <label
            className="text-head text-base-medium mb-[9px] block"
            htmlFor="bio"
          >
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
      <button type="submit" form="personal-info-form" className="btn-1 py-4">
        Мэдээлэл хадгалах
      </button>
    </div>
  );
};

export default UserPersonalInfoForm;
