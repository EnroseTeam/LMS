import { axiosInstance } from "@/utils/axiosInstance";
import { isAxiosError } from "axios";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import classNames from "classnames";
import { SlTrash } from "react-icons/sl";
import { HiPhoto } from "react-icons/hi2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CategoryCreatePage: FC = () => {
  const router = useRouter();

  const [catName, setCatName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);

  const [isNameExist, setIsNameExist] = useState<boolean>(true);
  // const [isDescriptionExist, setIsDescriptionExist] = useState<boolean>(true);
  const [isImageExist, setIsImageExist] = useState<boolean>(true);
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
          "/api/files/svg",
          { file: image[0] },
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        setImage(res.data.body);
        toast.success(res.data.message);
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(
            error.response?.data.error || "Тодорхойгүй алдаа гарлаа."
          );
        } else {
          toast.error("Тодорхойгүй алдаа гарлаа.");
        }
      } finally {
        setIsImageLoading(false);
      }
    }
  };

  const handleCategoryRequest = async (): Promise<void> => {
    try {
      if (!isSubmitting) {
        setIsSubmitting(true);

        if (!catName || !image) {
          !catName && setIsNameExist(false);

          !image && setIsImageExist(false);
          return;
        }
      }
      const res = await axiosInstance.post("/api/courses/categories", {
        name: catName,

        image: image,
      });

      toast.success(res.data.message);
      router.push("/courses/categories");
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.error || "Тодорхойгүй алдаа гарлаа.");
      } else {
        toast.error("Тодорхойгүй алдаа гарлаа.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 mx-6 my-6">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Сургалтын ангилал нэмэх
              </h3>
            </div>

            <div className="flex flex-col gap-5.5 p-6.5">
              {/* Ангиллын нэр */}
              <div>
                <label className="mb-3 block font-medium text-sm text-black dark:text-white">
                  Ангиллын нэр
                </label>
                <input
                  value={catName}
                  onChange={(e): void => {
                    setIsNameExist(true);
                    setCatName(e.target.value);
                  }}
                  type="text"
                  placeholder="Ангилал оруулах"
                  className={`w-full border border-border-2 rounded-lg py-3 px-[22px] text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150 ${
                    !isNameExist ? "ring-2 ring-meta-1" : ""
                  }`}
                />
                {!isNameExist && (
                  <p className="mt-2 text-meta-1 text-md-medium">
                    Ангиллын нэр заавал шаардалагатай.
                  </p>
                )}
              </div>
              {/* Ангиллын зураг */}
              <div>
                <label className="mb-3 block font-medium text-sm text-black dark:text-white">
                  Ангиллын зураг оруулах
                </label>
                <div
                  className={classNames(
                    "mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 overflow-hidden relative",
                    { "bg-bodydark/25 py-10": isImageLoading },
                    { "py-10": !isImageLoading && !image },
                    { "ring-2 ring-meta-1": !isImageExist }
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
                      <HiPhoto
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                      <div className="mt-4 flex justify-center text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-transparent font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Зураг хуулах</span>
                          <input
                            accept="image/svg+xml"
                            onChange={(e): void => {
                              imageUploadHandler(e.target.files);
                            }}
                            id="file-upload"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        SVG өргөтгөлтэй файл
                      </p>
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
                {!isImageExist && (
                  <p className="mt-2 text-meta-1 text-md-medium">
                    Зураг заавал шаардлагатай.
                  </p>
                )}
              </div>
              {/* Ангиллын тайлбар */}
              <div>
                <label className="mb-3 block font-medium text-sm text-black dark:text-white">
                  Ангиллын тайлбар
                </label>
                <textarea
                  value={description}
                  onChange={(e): void => {
                    setDescription(e.target.value);
                  }}
                  rows={3}
                  placeholder="Мэдээний тайлбар"
                  // className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"

                  className={`w-full border border-border-2 rounded-lg py-3 px-[22px] text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150 resize-none overflow-y-auto `}
                  defaultValue={""}
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={(): void => {
                    router.push({ pathname: "/courses/categories" });
                  }}
                  className="w-fit inline-flex items-center justify-center gap-2.5 rounded-md bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  Буцах
                </button>
                <button
                  onClick={(): void => {
                    handleCategoryRequest();
                  }}
                  className="w-fit inline-flex items-center justify-center gap-2.5 rounded-md bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  Ангилал нэмэх
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CategoryCreatePage;
