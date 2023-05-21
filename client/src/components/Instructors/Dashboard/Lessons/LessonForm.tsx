import { ICourseLesson } from "@/interfaces/courses";
import { FC, useEffect, useRef, useState } from "react";
import { SlTrash } from "react-icons/sl";
import imagePlaceholder from "@/assets/ph-image.webp";
import { BiLoader } from "react-icons/bi";
import { axiosInstance } from "@/utils/axiosInstance";
import { isAxiosError } from "axios";
import MessageBox from "@/components/global/MessageBox";
import classNames from "classnames";
import { toast } from "react-toastify";

interface LessonFormProps {
  lesson?: ICourseLesson;
  sectionId?: string;
  closeModal: () => void;
  afterCreateLesson?: (lesson: ICourseLesson) => void;
  afterUpdateLesson?: (lesson: ICourseLesson) => void;
}

const LessonForm: FC<LessonFormProps> = ({
  lesson,
  sectionId,
  closeModal,
  afterCreateLesson,
  afterUpdateLesson,
}) => {
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"Success" | "Error">("Success");

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [hour, setHour] = useState<number>(0);
  const [minutes, setMintues] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  const [isNameExist, setIsNameExist] = useState<boolean>(true);
  const [isDescriptionExist, setIsDescriptionExist] = useState<boolean>(true);
  const [isLengthExist, setIsLengthExist] = useState<boolean>(true);

  const [video, setVideo] = useState<string>("");
  const [videoName, setVideoName] = useState<string>("Бичлэгээ оруулна уу.");

  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(false);
  const [isVideoExist, setIsVideoExist] = useState<boolean>(true);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (lesson) {
      setName(lesson.name);
      setDescription(lesson.description);
      setHour(lesson.length.hour);
      setMintues(lesson.length.minute);
      setSeconds(lesson.length.second);
      setVideo(lesson.video ? lesson.video : "");
    }
  }, [lesson]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [video]);

  const videoUploadHandler = async (video: FileList | null): Promise<void> => {
    try {
      setMessage("");
      setIsVideoLoading(true);

      if (!video) {
        return setMessage("Бичлэг оруулаагүй байна.");
      }

      const res = await axiosInstance.post(
        "/api/files/videos",
        { file: video[0] },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setVideoName(video[0].name);
      setVideo(res.data.body);
      setMessageType("Success");
      setMessage(res.data.message);
    } catch (error) {
      setMessageType("Error");
      if (isAxiosError(error)) {
        setMessage(error.response?.data.error || "Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу.");
      } else {
        setMessage("Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу.");
      }
    } finally {
      setIsVideoLoading(false);
    }
  };

  const submitHandler = async (): Promise<void> => {
    if (!isSubmitting) {
      try {
        setIsSubmitting(true);
        setMessageType("Success");
        setMessage("");

        if (
          !video ||
          !name ||
          !description ||
          (minutes === 0 && seconds === 0) ||
          hour < 0 ||
          minutes < 0 ||
          seconds < 0
        ) {
          if (!video) setIsVideoExist(false);
          if (!name) setIsNameExist(false);
          if (!description) setIsDescriptionExist(false);
          if ((minutes === 0 && seconds === 0) || hour < 0 || minutes < 0 || seconds < 0)
            setIsLengthExist(false);
          return;
        }

        if (sectionId && afterCreateLesson) {
          const res = await axiosInstance.post<{ message: string; body: ICourseLesson }>(
            "/api/courses/lessons",
            {
              name,
              description,
              video,
              length: {
                hour,
                minute: minutes,
                second: seconds,
              },
              section: sectionId,
              type: "Lesson",
            }
          );

          toast.success(res.data.message);
          afterCreateLesson(res.data.body);
          closeModal();
        }

        if (lesson && afterUpdateLesson) {
          const res = await axiosInstance.patch<{ message: string; body: ICourseLesson }>(
            `/api/courses/lessons/${lesson._id}`,
            {
              name,
              description,
              video,
              length: {
                hour,
                minute: minutes,
                second: seconds,
              },
              type: "Lesson",
            }
          );

          toast.success(res.data.message);
          afterUpdateLesson(res.data.body);
          closeModal();
        }
      } catch (error) {
        setMessageType("Error");
        if (isAxiosError(error)) {
          setMessage(
            error.response?.data.error || "Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу,"
          );
        } else {
          setMessage("Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу,");
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <div className="space-y-5 mb-6 min-w-[800px]">
        {message && <MessageBox message={message} type={messageType} />}

        <div className="space-y-3">
          <label className="block text-head text-base-medium after:content-['*'] after:text-red-500 after:ml-1">
            Бичлэг
          </label>
          <div className="grid grid-cols-7 gap-[30px]">
            <div className="col-span-7 lg:col-span-2 rounded-lg overflow-hidden relative">
              <video
                ref={videoRef}
                className="block w-full aspect-[1.2/1] object-cover"
                poster={video === "" ? imagePlaceholder.src : ""}
                controls={video !== ""}
              >
                <source src={video} type="video/mp4" />
              </video>
              {isVideoLoading && (
                <div className="w-full h-full absolute top-0 right-0 left-0 bottom-0 bg-text/50 text-white grid place-items-center">
                  <BiLoader className="animate-spin" size={26} />
                </div>
              )}
              <button
                onClick={(): void => {
                  setVideo("");
                  setVideoName("Бичлэгээ оруулна уу.");
                }}
                disabled={isVideoLoading || video === ""}
                className="absolute top-5 right-5 text-base text-icon p-[10px] bg-white rounded-lg hover:text-white hover:bg-icon duration-300 disabled:pointer-events-none disabled:bg-gray-300 disabled:text-icon"
                type="button"
              >
                <SlTrash />
              </button>
            </div>
            <div className="col-span-7 lg:col-span-5">
              <label
                htmlFor="video"
                className="block mb-[9px] text-head text-base-medium after:content-['*'] after:text-red-500 after:ml-1"
              >
                Хичээлийн бичлэг
              </label>
              <div
                className={`flex items-center focus-within:ring-2 focus-within:ring-color-1 rounded-lg overflow-hidden duration-150 mb-3 `}
              >
                <input
                  disabled
                  type="text"
                  id="video"
                  className="flex-1 border border-border-2 rounded-l-lg py-3 px-[22px] text-text text-md-regular focus:outline-none  "
                  placeholder={videoName}
                />
                <label
                  className={`bg-icon py-[11.5px] px-[28px] text-white rounded-r-lg cursor-pointer text-md-regular border-2 border-transparent hover:border-icon hover:text-icon hover:bg-transparent duration-300 `}
                >
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e): void => {
                      setIsVideoExist(true);
                      videoUploadHandler(e.target.files);
                    }}
                    className="sr-only"
                  />
                  Бичлэг хуулах
                </label>
              </div>
              {!isVideoExist && (
                <p className="mb-2 text-red-500 text-md-medium">Бичлэг заавал шаардлагатай.</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label
            htmlFor="name"
            className="block text-head text-base-medium after:content-['*'] after:text-red-500 after:ml-1"
          >
            Хичээлийн нэр
          </label>
          <input
            value={name}
            onChange={(e): void => {
              setName(e.target.value);
              setIsNameExist(true);
            }}
            type="text"
            id="name"
            className={classNames(
              "w-full border border-border-2 rounded-lg py-2 px-[22px] text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150",
              { "ring-2 ring-red-500": !isNameExist }
            )}
            placeholder="Хичээлийн нэр"
          />
          {!isNameExist && (
            <p className="mb-2 text-red-500 text-md-medium">Нэр заавал шаардлагатай.</p>
          )}
        </div>

        <div className="space-y-3">
          <label
            htmlFor="description"
            className="block text-head text-base-medium after:content-['*'] after:text-red-500 after:ml-1"
          >
            Тайлбар
          </label>
          <textarea
            value={description}
            onChange={(e): void => {
              setDescription(e.target.value);
              setIsDescriptionExist(true);
            }}
            id="description"
            className={classNames(
              "w-full border border-border-2 rounded-lg py-2 px-[22px] text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150 resize-none",
              { "ring-2 ring-red-500": !isDescriptionExist }
            )}
            rows={5}
            placeholder="Тайлбар"
          />
          {!isDescriptionExist && (
            <p className="mb-2 text-red-500 text-md-medium">Тайлбар заавал шаардлагатай.</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="block text-head text-base-medium after:content-['*'] after:text-red-500 after:ml-1">
            Хугацаа
          </label>
          <div className="w-full grid grid-cols-6 gap-5">
            <div className="flex items-center gap-2 col-span-1">
              <label className="text-head text-md-medium" htmlFor="hour">
                Цаг
              </label>
              <input
                value={hour}
                onChange={(e): void => {
                  setHour(Number(e.target.value));
                }}
                type="number"
                id="hour"
                className="w-full border border-border-2 rounded-lg py-2 px-[22px] text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150"
                placeholder="0"
              />
            </div>

            <div className="flex items-center gap-2 col-span-1">
              <label
                className="text-head text-md-medium after:content-['*'] after:text-red-500 after:ml-1"
                htmlFor="minute"
              >
                Минут
              </label>
              <input
                min={0}
                value={minutes}
                onChange={(e): void => {
                  setMintues(Number(e.target.value));
                  setIsLengthExist(true);
                }}
                type="number"
                id="minute"
                className={classNames(
                  "w-full border border-border-2 rounded-lg py-2 px-[22px] text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150",
                  { "ring-2 ring-red-500": !isLengthExist }
                )}
                placeholder="0"
              />
            </div>

            <div className="flex items-center gap-2 col-span-1">
              <label
                className="text-head text-md-medium after:content-['*'] after:text-red-500 after:ml-1"
                htmlFor="second"
              >
                Секунд
              </label>
              <input
                value={seconds}
                onChange={(e): void => {
                  setSeconds(Number(e.target.value));
                  setIsLengthExist(true);
                }}
                min={0}
                type="number"
                id="second"
                className={classNames(
                  "w-full border border-border-2 rounded-lg py-2 px-[22px] text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150",
                  { "ring-2 ring-red-500": !isLengthExist }
                )}
                placeholder="0"
              />
            </div>
          </div>
          {!isLengthExist && (
            <p className="mb-2 text-red-500 text-md-medium">Хугацаа заавал шаардлагатай.</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end space-x-2 ">
        <button
          type="button"
          disabled={isSubmitting || isVideoLoading}
          onClick={(): void => {
            submitHandler();
          }}
          className="btn-4 py-3 px-5 text-sm-medium"
        >
          {lesson ? "Хадгалах" : "Нэмэх"}
        </button>
        <button
          disabled={isSubmitting || isVideoLoading}
          onClick={closeModal}
          className="btn-1 py-[10px] px-5 text-sm-medium"
        >
          Болих
        </button>
      </div>
    </>
  );
};

export default LessonForm;
