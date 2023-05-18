import { FC, useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import imagePlaceholder from "@/assets/ph-image.webp";
import { BiLoader } from "react-icons/bi";
import { axiosInstance } from "@/utils/axiosInstance";
import { isAxiosError } from "axios";
import { SlTrash } from "react-icons/sl";
import { toast } from "react-toastify";
import { ICourse } from "@/interfaces/courses";

interface CourseMediaUploadProps {
  setActiveStage: Dispatch<SetStateAction<"Info" | "Media" | "Sections">>;
  courseId?: string;
  setMessage: Dispatch<SetStateAction<string>>;
  setMessageType: Dispatch<SetStateAction<"Success" | "Error">>;
  course?: ICourse;
}

const CourseMediaUpload: FC<CourseMediaUploadProps> = ({
  setActiveStage,
  courseId,
  setMessage,
  setMessageType,
  course,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [image, setImage] = useState<string>("");
  const [video, setVideo] = useState<string>("");

  const [isImageExist, setIsImageExist] = useState<boolean>(true);
  const [isVideoExist, setIsVideoExist] = useState<boolean>(true);

  const videoRef = useRef<HTMLVideoElement>(null);

  const [imageName, setImageName] = useState<string>("Зураг оруулна уу.");
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

  const [videoName, setVideoName] = useState<string>("Танилцуулга бичлэгээ оруулна уу.");
  const [isVideoLoading, setIsVideoLoading] = useState<boolean>(false);

  useEffect(() => {
    if (course) {
      setImage(course.picture);
      setVideo(course.video);
    }
  }, [course]);

  const imageUploadHandler = async (image: FileList | null): Promise<void> => {
    try {
      setMessage("");
      setIsImageLoading(true);

      if (!image) {
        return setMessage("Зураг оруулаагүй байна.");
      }

      const res = await axiosInstance.post(
        "/api/files/images",
        { file: image[0] },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setImageName(image[0].name);
      setImage(res.data.body);
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
      setIsImageLoading(false);
    }
  };

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
        setMessage("");
        setMessageType("Success");
        setIsSubmitting(true);
        if (!image || !video) {
          if (!image) setIsImageExist(false);
          if (!video) setIsVideoExist(false);

          return;
        }

        const url = course ? `/api/courses/${course._id}/media` : `/api/courses/${courseId}/media`;

        const res = await axiosInstance.patch(url, {
          picture: image,
          video,
        });
        toast.success(res.data.message);
        setActiveStage("Sections");
      } catch (error) {
        setMessageType("Error");
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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [video]);

  return (
    <div className="rounded-2xl shadow-shadow-dashboard bg-white">
      <div className="px-[30px] py-5 border-b border-b-border-1">
        <h2 className="text-head text-lg-medium">Зураг болон бичлэг</h2>
      </div>
      <div className="p-[30px] flex flex-col gap-[60px]">
        {/* Image Upload */}
        <div className="grid grid-cols-7 gap-[30px]">
          <div className="col-span-7 lg:col-span-2 rounded-lg overflow-hidden relative">
            <Image
              src={image ? image : imagePlaceholder}
              alt="Image"
              width={520}
              height={430}
              className="block w-full aspect-[1.2/1] object-cover"
            />
            {isImageLoading && (
              <div className="w-full h-full absolute top-0 right-0 left-0 bottom-0 bg-text/50 text-white grid place-items-center">
                <BiLoader className="animate-spin" size={26} />
              </div>
            )}
            <button
              onClick={(): void => {
                setImage("");
                setImageName("Зураг оруулна уу.");
              }}
              disabled={isImageLoading || image === ""}
              className="absolute top-5 right-5 text-base text-icon p-[10px] bg-white rounded-lg hover:text-white hover:bg-icon duration-300 disabled:pointer-events-none disabled:bg-gray-300 disabled:text-icon"
              type="button"
            >
              <SlTrash />
            </button>
          </div>
          <div className="col-span-7 lg:col-span-5">
            <label
              htmlFor="image"
              className="block mb-[9px] text-head text-base-medium after:content-['*'] after:text-red-500 after:ml-1"
            >
              Зураг
            </label>
            <div
              className={`flex items-center focus-within:ring-2 focus-within:ring-color-1 rounded-lg overflow-hidden duration-150 mb-3 ${
                !isImageExist ? "ring-2 ring-red-500" : ""
              }`}
            >
              <input
                disabled
                type="text"
                id="image"
                className="flex-1 border border-border-2 rounded-l-lg py-3 px-[22px] text-text text-md-regular focus:outline-none  "
                placeholder={imageName}
              />
              <label
                className={`bg-icon py-[11.5px] px-[28px] text-white rounded-r-lg cursor-pointer text-md-regular border-2 border-transparent hover:border-icon hover:text-icon hover:bg-transparent duration-300 ${
                  isImageLoading ? "pointer-events-none bg-icon/50" : ""
                }`}
              >
                <input
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={(e): void => {
                    setIsImageExist(true);
                    imageUploadHandler(e.target.files);
                  }}
                  className="sr-only"
                />
                Зураг хуулах
              </label>
            </div>
            {!isImageExist && (
              <p className="mb-2 text-red-500 text-md-medium">Зураг заавал шаардлагатай</p>
            )}
            <p className="text-text text-md-regular">
              Сургалтын зургаа энд оруулна уу. Энэхүү зураг нь зөвхөн .jpg, .jpeg, .png өргөтгөлтэй
              байх ёстойг анхаарна уу.
            </p>
          </div>
        </div>

        {/* Video Upload */}
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
                setVideoName("Танилцуулга бичлэгээ оруулна уу.");
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
              Танилцуулга бичлэг
            </label>
            <div
              className={`flex items-center focus-within:ring-2 focus-within:ring-color-1 rounded-lg overflow-hidden duration-150 mb-3 ${
                !isVideoExist ? "ring-2 ring-red-500" : ""
              }`}
            >
              <input
                disabled
                type="text"
                id="video"
                className="flex-1 border border-border-2 rounded-l-lg py-3 px-[22px] text-text text-md-regular focus:outline-none  "
                placeholder={videoName}
              />
              <label
                className={`bg-icon py-[11.5px] px-[28px] text-white rounded-r-lg cursor-pointer text-md-regular border-2 border-transparent hover:border-icon hover:text-icon hover:bg-transparent duration-300 ${
                  isVideoLoading ? "pointer-events-none bg-icon/50" : ""
                }`}
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
              <p className="mb-2 text-red-500 text-md-medium">
                Танилцуулга бичлэг заавал шаардлагатай.
              </p>
            )}
            <p className="text-text text-md-regular">
              Танилцуулга бичлэг хийснээр таны сургалтыг илүү их хүн үзэх магадлал ихсэх болно.
              Бичлэгийн дээд хэмжээ 1GB.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={(): void => {
              setActiveStage("Info");
            }}
            type="button"
            className="btn-1-outline py-4"
          >
            Буцах
          </button>
          <button
            disabled={isSubmitting}
            onClick={(): void => {
              submitHandler();
            }}
            type="submit"
            className="btn-1 py-4"
          >
            Дараах
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseMediaUpload;
