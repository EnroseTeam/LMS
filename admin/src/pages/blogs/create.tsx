import { FC, useState } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { AiOutlineRollback } from "react-icons/ai";
import { axiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/router";

const BlogCreatePage: FC = () => {
  const router = useRouter();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [post, setPost] = useState<string>("");
  //   const [image, setImage] = useState<string>("");

  const handBack = async (): Promise<void> => {
    router.back();
  };

  const handlePostRequest = async (): Promise<void> => {
    try {
      await axiosInstance.post("/api/blogs", {
        name: title,
        description,
        text: post,
      });

      router.push("/blogs");
    } catch (error) {
      console.error("Error:", error);
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
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
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
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input"
                  defaultValue={""}
                />
              </div>
              <div>
                <label className="mb-3 block font-medium text-sm text-black dark:text-white">
                  Мэдээний зураг оруулах
                </label>
                <input
                  type="file"
                  placeholder="Файл оруулаагүй байна..."
                  className="cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter dark:file:bg-white/30 dark:file:text-white file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:focus:border-primary"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={(): void => {
                    handlePostRequest();
                  }}
                  className="w-fit inline-flex items-center justify-center gap-2.5 rounded-md bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  <span>
                    <IoCreateOutline />
                  </span>
                  Мэдээ нийтлэх
                </button>
                <button
                  onClick={(): void => {
                    handBack();
                  }}
                  className="w-fit inline-flex items-center justify-center gap-2.5 rounded-md bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  <span>
                    <AiOutlineRollback />
                  </span>
                  Буцах
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
