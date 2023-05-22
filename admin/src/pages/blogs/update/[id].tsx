import { IBlog } from "@/interfaces/blogs";
import { axiosInstance } from "@/utils/axiosInstance";
import { isAxiosError } from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { FC, useContext, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";

import { IoCreateOutline } from "react-icons/io5";
import { AiOutlineRollback } from "react-icons/ai";

import { HiPhoto } from "react-icons/hi2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { SlTrash } from "react-icons/sl";
import classNames from "classnames";
import { AuthContext } from "@/contexts/AuthContext";

interface BlogUpdatePageProps {
  blog: IBlog;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axiosInstance.get("/api/blogs/id");
  const paths = res.data.body.map((id: string) => ({ params: { id } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<BlogUpdatePageProps> = async ({
  params,
}) => {
  try {
    const res = await axiosInstance.get(`/api/blogs/${params?.id}`);

    return {
      props: {
        blog: res.data.body,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

const CategoryUpdatePage: FC<BlogUpdatePageProps> = ({ blog }) => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState<string>(blog.name);
  const [description, setDescription] = useState<string>(blog.description);
  const [post, setPost] = useState<string>(blog.text);
  const [image, setImage] = useState<string>(blog.picture);
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

  const router = useRouter();

  const handlePostRequest = async (): Promise<void> => {
    if (!isSubmitting && user) {
      try {
        setIsSubmitting(true);
        const res = await axiosInstance.patch(`/api/blogs/${blog._id}`, {
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
          toast.error(
            error.response?.data.error || "Тодорхойгүй алдаа гарлаа."
          );
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
              <h3 className="font-medium text-black dark:text-white">
                Мэдээ нэмэх
              </h3>
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
                        PNG, JPG өргөтгөлтэй файл
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
                  Хадгалах
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// const CategoryUpdateModalContent: FC<BlogUpdateModalContentProps> = ({
//   blog,
//   closeModal,
//   title,
//   description,
//   post,
// }) => {
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//   const router = useRouter();

//   const submitHandler = async (): Promise<void> => {
//     try {
//       setIsSubmitting(true);

//       await axiosInstance.patch(`/api/blogs/${blog._id}`, {
//         name: title,
//         description: description,
//         text: post,
//       });

//       toast.success("Ангилал амжилттай засагдлаа.");
//       closeModal();
//       router.push({
//         pathname: "/blogs",
//         query: { ...router.query },
//       });
//     } catch (error) {
//       if (isAxiosError(error)) {
//         toast.error(
//           error.response?.data.error ||
//             "Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу."
//         );
//       } else {
//         toast.error("Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу.");
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-5 items-center">
//       <div className="text-danger p-3 rounded-full bg-danger/20">
//         <AiOutlineWarning size={35} />
//       </div>
//       <h5 className="text-md-medium text-head max-w-[45ch] text-center">
//         Та {blog.name} нэртэй ангилал засахдаа итгэлтэй байна уу?
//       </h5>
//       <div className="flex items-center gap-3">
//         <button
//           disabled={isSubmitting}
//           onClick={closeModal}
//           className="btn-1 py-3 px-5 text-sm-medium bg-red-500 hover:bg-transparent rounded hover:border hover:border-primary hover:text-primary border border-transparent disabled:bg-red-300 disabled:cursor-not-allowed disabled:hover:bg-red-300 disabled:hover:border-transparent disabled:hover:text-white"
//         >
//           Үгүй
//         </button>
//         <button
//           disabled={isSubmitting}
//           onClick={(): void => {
//             submitHandler();
//           }}
//           className="btn-1 py-3 px-5 text-sm-medium border border-transparent bg-red-500 hover:bg-transparent rounded hover:border hover:border-meta-1 hover:text-meta-1 disabled:bg-red-300 disabled:cursor-not-allowed disabled:hover:bg-red-300 disabled:hover:border-transparent disabled:hover:text-white"
//         >
//           Тийм
//         </button>
//       </div>
//     </div>
//   );
// };

export default CategoryUpdatePage;
