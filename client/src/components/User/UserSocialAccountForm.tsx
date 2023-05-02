import { IUser } from "@/interfaces/user";
import { FC, useState } from "react";

interface UserSocialAccountFormProps {
  user?: IUser;
}

const UserSocialAccountForm: FC<UserSocialAccountFormProps> = ({
  user = {} as IUser,
}) => {
  const [facebook, setFacebook] = useState<string>(
    user.socialAccounts?.facebook || ""
  );
  const [instagram, setInstagram] = useState<string>(
    user.socialAccounts?.instagram || ""
  );
  const [twitter, setTwitter] = useState<string>(
    user.socialAccounts?.twitter || ""
  );
  const [linkedin, setLinkedin] = useState<string>(
    user.socialAccounts?.linkedin || ""
  );

  const submitHandler = (): void => undefined;

  return (
    <div className="-mt-[30px]">
      <form
        onSubmit={(e): void => {
          e.preventDefault();
          submitHandler();
        }}
        id="social-account-form"
        className="grid grid-cols-2 gap-[30px] mb-[30px]"
      >
        <div>
          <label
            className="text-head text-base-medium mb-[9px] block"
            htmlFor="facebook"
          >
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
          <label
            className="text-head text-base-medium mb-[9px] block"
            htmlFor="instagram"
          >
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
          <label
            className="text-head text-base-medium mb-[9px] block"
            htmlFor="twitter"
          >
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
          <label
            className="text-head text-base-medium mb-[9px] block"
            htmlFor="linkedin"
          >
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
      <button type="submit" form="social-account-form" className="btn-1 py-4">
        Сошиал хаяг шинэчлэх
      </button>
    </div>
  );
};

export default UserSocialAccountForm;
