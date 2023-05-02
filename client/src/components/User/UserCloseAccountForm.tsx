import { FC } from "react";

const UserCloseAccountForm: FC = () => {
  const submitHandler = (): void => undefined;

  return (
    <div className="-mt-[30px]">
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
            type="password"
            id="password"
            className="px-[22px] py-[12px] w-1/2 rounded-lg border border-border-2 text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1"
            placeholder="Нууц үг"
          />
        </div>
      </form>
      <button type="submit" form="close-account-form" className="btn-1 py-4">
        Хаяг устгах
      </button>
    </div>
  );
};

export default UserCloseAccountForm;
