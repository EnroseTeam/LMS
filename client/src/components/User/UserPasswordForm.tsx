import { FC } from "react";

const UserPasswordForm: FC = () => {
  const submitHandler = (): void => undefined;

  return (
    <div className="-mt-[30px]">
      <form
        id="password-form"
        onSubmit={(e): void => {
          e.preventDefault();
          submitHandler();
        }}
        className="grid grid-cols-1 gap-[30px] mb-[30px]"
      >
        <div>
          <label
            className="text-head text-base-medium mb-[9px] block"
            htmlFor="oldPassword"
          >
            Хуучин нууц үг
          </label>
          <input
            type="password"
            id="oldPassword"
            className="px-[22px] py-[12px] w-1/2 rounded-lg border border-border-2 text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1"
            placeholder="Хуучин нууц үг"
          />
        </div>

        <div>
          <label
            className="text-head text-base-medium mb-[9px] block"
            htmlFor="newPassword"
          >
            Шинэ нууц үг
          </label>
          <input
            type="password"
            id="newPassword"
            className="px-[22px] py-[12px] w-1/2 rounded-lg border border-border-2 text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1"
            placeholder="Шинэ нууц үг"
          />
        </div>

        <div>
          <label
            className="text-head text-base-medium mb-[9px] block"
            htmlFor="reNewPassword"
          >
            Шинэ нууц үг давтан
          </label>
          <input
            type="password"
            id="reNewPassword"
            className="px-[22px] py-[12px] w-1/2 rounded-lg border border-border-2 text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1"
            placeholder="Шинэ нууц үг давтан"
          />
        </div>
      </form>
      <button type="submit" form="password-form" className="btn-1 py-4">
        Нууц үг шинэчлэх
      </button>
    </div>
  );
};

export default UserPasswordForm;
