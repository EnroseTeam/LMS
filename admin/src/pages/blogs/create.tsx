import { FC, useContext, useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { AiOutlineRollback } from "react-icons/ai";
import { axiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import classNames from "classnames";

import { HiPhoto } from "react-icons/hi2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { SlTrash } from "react-icons/sl";
import Image from "next/image";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { AuthContext } from "@/contexts/AuthContext";

const BlogCreatePage: FC = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [post, setPost] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const imageUploadHandler = async (image: FileList | null): Promise<void> => {
    if (!isImageLoading) {
      try {
        setIsImageLoading(true);

        if (!image) {
          toast.error("Зураг оруулаагүй байна.");
          return;
        }

        const res = await axiosInstance.post<{ message: string; body: string }>(
          "/api/files/images",
          { file: image[0] },
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        setImage(res.data.body);
        toast.success(res.data.message);
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error.response?.data.error || "Тодорхойгүй алдаа гарлаа.");
        } else {
          toast.error("Тодорхойгүй алдаа гарлаа.");
        }
      } finally {
        setIsImageLoading(false);
      }
    }
  };

  const handlePostRequest = async (): Promise<void> => {
    if (!isSubmitting && user) {
      try {
        setIsSubmitting(true);
        const res = await axiosInstance.post("/api/blogs", {
          name: title,
          description,
          picture: image,
          text: post,
          user: user._id,
        });

        toast.success(res.data.message);
        router.push("/blogs");
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error.response?.data.error || "Тодорхойгүй алдаа гарлаа.");
        } else {
          toast.error("Тодорхойгүй алдаа гарлаа.");
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 mx-6 my-6">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Мэдээ нэмэх</h3>
            </div>

            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block font-medium text-sm text-black dark:text-white">
                  Гарчиг
                </label>
                <input
                  value={title}
                  onChange={(e): void => {
                    setTitle(e.target.value);
                  }}
                  type="text"
                  placeholder="Мэдээний гарчиг"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block font-medium text-sm text-black dark:text-white">
                  Тайлбар
                </label>
                <textarea
                  value={description}
                  onChange={(e): void => {
                    setDescription(e.target.value);
                  }}
                  rows={3}
                  placeholder="Мэдээний тайлбайр"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary resize-none"
                  defaultValue={""}
                />
              </div>
              <div>
                <label className="mb-3 block font-medium text-sm text-black dark:text-white">
                  Мэдээний дэлгэрэнгүй...
                </label>
                <textarea
                  value={post}
                  onChange={(e): void => {
                    setPost(e.target.value);
                  }}
                  rows={6}
                  placeholder="Мэдээний дэлгэрэнгүй..."
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input resize-none"
                  defaultValue={""}
                />
              </div>
              <div>
                <label className="mb-3 block font-medium text-sm text-black dark:text-white">
                  Мэдээний зураг оруулах
                </label>
                <div
                  className={classNames(
                    "mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 overflow-hidden relative",
                    { "bg-bodydark/25 py-10": isImageLoading },
                    { "py-10": !isImageLoading && !image }
                  )}
                >
                  {!isImageLoading && image && (
                    <div className="w-1/2 relative">
                      <Image
                        src={image}
                        alt="Picture"
                        width={1000}
                        height={1000}
                        className="w-full aspect-[2/1] object-contain"
                      />
                    </div>
                  )}

                  {!isImageLoading && image && (
                    <button
                      disabled={isSubmitting}
                      onClick={(): void => {
                        setImage("");
                      }}
                      className="absolute top-2 right-2 p-3 rounded-lg border-2 border-transparent bg-bodydark2 text-white hover:bg-transparent hover:border-bodydark2 hover:text-bodydark2 duration-300 disabled:pointer-events-none disabled:bg-bodydark2/50 shadow-md"
                    >
                      <SlTrash />
                    </button>
                  )}

                  {!image && !isImageLoading && (
                    <div className="text-center">
                      <HiPhoto className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                      <div className="mt-4 flex justify-center text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-transparent font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Зураг хуулах</span>
                          <input
                            onChange={(e): void => {
                              imageUploadHandler(e.target.files);
                            }}
                            id="file-upload"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">PNG, JPG өргөтгөлтэй файл</p>
                    </div>
                  )}

                  {isImageLoading && (
                    <div className="w-full h-full grid place-items-center">
                      <AiOutlineLoading3Quarters
                        size={25}
                        className="text-black animate-spin dark:text-whiten"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  disabled={isImageLoading || isSubmitting}
                  onClick={(): void => {
                    router.back();
                  }}
                  className="w-fit inline-flex items-center justify-center gap-2.5 rounded-md bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 disabled:pointer-events-none disabled:bg-black/60"
                >
                  <span>
                    <AiOutlineRollback />
                  </span>
                  Буцах
                </button>

                <button
                  disabled={isImageLoading || isSubmitting}
                  onClick={(): void => {
                    handlePostRequest();
                  }}
                  className="w-fit inline-flex items-center justify-center gap-2.5 rounded-md bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 disabled:pointer-events-none disabled:bg-black/60"
                >
                  <span>
                    <IoCreateOutline />
                  </span>
                  Мэдээ нийтлэх
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCreatePage;
