import { useModal } from "@/hooks/useModal";
import { ICourseSection } from "@/interfaces/courses";
import { FC, useState } from "react";
import classNames from "classnames";
import MessageBox from "@/components/global/MessageBox";
import { AxiosError, isAxiosError } from "axios";
import { axiosInstance } from "@/utils/axiosInstance";

interface SectionFormProps {
  courseId?: string;
  section?: ICourseSection;
  afterCreate: (section: ICourseSection) => void;
}

const SectionForm: FC<SectionFormProps> = ({ courseId, section, afterCreate }) => {
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"Success" | "Error">("Success");

  const [name, setName] = useState<string>("");
  const [isNameExist, setIsNameExist] = useState<boolean>(true);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { closeModal } = useModal();

  const createSection = async (): Promise<void> => {
    try {
      const res = await axiosInstance.post<{ message: string; body: ICourseSection }>(
        "/api/courses/sections",
        {
          title: name,
          course: courseId,
        }
      );

      afterCreate(res.data.body);
      closeModal();
    } catch (error) {
      if (isAxiosError(error)) {
        throw new AxiosError(error.response?.data.error);
      } else throw new Error();
    }
  };

  const updateSection = async (): Promise<void> => {};

  const submitHandler = (): void => {
    if (!isSubmitting) {
      try {
        setMessage("");
        setIsSubmitting(true);
        if (!name) {
          return setIsNameExist(false);
        }

        if (courseId) {
          createSection();
        }

        if (section) {
          updateSection();
        }
      } catch (error) {
        setMessageType("Error");
        if (isAxiosError(error)) {
          setMessage(error.message || "Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу.");
        } else {
          setMessage("Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу.");
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <div className="space-y-3 mb-6">
        {message && <MessageBox message={message} type={messageType} />}

        <label
          htmlFor="name"
          className="block text-head text-base-medium after:content-['*'] after:text-red-500 after:ml-1"
        >
          Нэр
        </label>
        <input
          value={name}
          onChange={(e): void => {
            setName(e.target.value);
            setIsNameExist(true);
          }}
          type="text"
          id="name"
          placeholder="Сэдвийн нэр"
          className={classNames(
            "w-full border border-border-2 rounded-lg py-3 px-[22px] text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150",
            { "ring-2 ring-red-500": !isNameExist }
          )}
        />
        {!isNameExist && (
          <p className="mt-2 text-md-medium text-red-500">Сэдвийн нэр заавал шаардалагатай.</p>
        )}
      </div>

      <div className="flex items-center justify-start space-x-2 ">
        <button
          disabled={isSubmitting}
          onClick={submitHandler}
          className="btn-4 py-3 px-5 text-sm-medium"
        >
          Нэмэх
        </button>
        <button
          disabled={isSubmitting}
          onClick={closeModal}
          className="btn-1 py-[10px] px-5 text-sm-medium"
        >
          Болих
        </button>
      </div>
    </>
  );
};

export default SectionForm;
