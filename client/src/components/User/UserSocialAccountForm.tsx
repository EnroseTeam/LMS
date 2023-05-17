import { IUser } from "@/interfaces/user";
import { isAxiosError } from "axios";
import { FC, useContext, useState } from "react";
import MessageBox from "../global/MessageBox";
import { axiosInstance } from "@/utils/axiosInstance";
import { AuthContext } from "@/contexts/AuthContext";

interface UserSocialAccountFormProps {
  user?: IUser;
}

const UserSocialAccountForm: FC<UserSocialAccountFormProps> = ({ user = {} as IUser }) => {
  const { setUser } = useContext(AuthContext);

  const [facebook, setFacebook] = useState<string>(user.socialAccounts.facebook);
  const [instagram, setInstagram] = useState<string>(user.socialAccounts.instagram);
  const [twitter, setTwitter] = useState<string>(user.socialAccounts.twitter);
  const [linkedin, setLinkedin] = useState<string>(user.socialAccounts.linkedin);

  const [message, setMessage] = useState<string>("");
  const [type, setType] = useState<"Error" | "Success">("Success");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submitHandler = async (): Promise<void> => {
    if (!isSubmitting) {
      try {
        setIsSubmitting(true);
        setMessage("");

        const res = await axiosInstance.patch("/api/users/social-accounts", {
          facebook,
          instagram,
          twitter,
          linkedin,
        });

        setType("Success");
        setMessage(res.data.message);

        setUser({
          ...user,
          socialAccounts: { facebook, linkedin, instagram, twitter },
        });
      } catch (error) {
        setType("Error");
        if (isAxiosError(error)) {
          setMessage(
            error.response?.data.error || "Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу."
          );
        } else setMessage("Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="-mt-[30px]">
      {message && <MessageBox type={type} message={message} className="mb-5" />}
      <form
        onSubmit={(e): void => {
          e.preventDefault();
          submitHandler();
        }}
        id="social-account-form"
        className="grid grid-cols-2 gap-[30px] mb-[30px]"
      >
        <div>
          <label className="text-head text-base-medium mb-[9px] block" htmlFor="facebook">
            Фэйсбүүк
          </label>
          <input
            value={facebook}
            onChange={(e): void => {
              setFacebook(e.target.value);
            }}
            type="text"
            id="facebook"
            className="px-[22px] py-[12px] w-full rounded-lg border border-border-2 text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1"
            placeholder="Фэйсбүүк"
          />
        </div>

        <div>
          <label className="text-head text-base-medium mb-[9px] block" htmlFor="instagram">
            Инстаграм
          </label>
          <input
            value={instagram}
            onChange={(e): void => {
              setInstagram(e.target.value);
            }}
            type="text"
            id="instagram"
            className="px-[22px] py-[12px] w-full rounded-lg border border-border-2 text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1"
            placeholder="Инстаграм"
          />
        </div>

        <div>
          <label className="text-head text-base-medium mb-[9px] block" htmlFor="twitter">
            Твиттер
          </label>
          <input
            value={twitter}
            onChange={(e): void => {
              setTwitter(e.target.value);
            }}
            type="text"
            id="twitter"
            className="px-[22px] py-[12px] w-full rounded-lg border border-border-2 text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1"
            placeholder="Твиттер"
          />
        </div>

        <div>
          <label className="text-head text-base-medium mb-[9px] block" htmlFor="linkedin">
            Линкэдин
          </label>
          <input
            value={linkedin}
            onChange={(e): void => {
              setLinkedin(e.target.value);
            }}
            type="text"
            id="linkedin"
            className="px-[22px] py-[12px] w-full rounded-lg border border-border-2 text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1"
            placeholder="Линкэдин"
          />
        </div>
      </form>
      <button
        disabled={isSubmitting}
        type="submit"
        form="social-account-form"
        className="btn-1 py-4"
      >
        Сошиал хаяг шинэчлэх
      </button>
    </div>
  );
};

export default UserSocialAccountForm;
