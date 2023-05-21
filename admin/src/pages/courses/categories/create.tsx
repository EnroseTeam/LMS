import { axiosInstance } from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import { FC, useState } from "react";

const CategoryCreatePage: FC = () => {
  const router = useRouter();

  const [catName, setCatName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleCategoryRequest = async (): Promise<void> => {
    try {
      await axiosInstance.post("/api/courses/categories", {
        name: catName,
        description,
      });
      router.push("/courses/categories");
    } catch (error) {
      console.error("error:", error);
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
              <div>
                <label className="mb-3 block font-medium text-sm text-black dark:text-white">
                  Ангилал
                </label>
                <input
                  value={catName}
                  onChange={(e): void => {
                    setCatName(e.target.value);
                  }}
                  type="text"
                  placeholder="Ангилал оруулах"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block font-medium text-sm text-black dark:text-white">
                  Ангиллын зураг оруулах
                </label>
                <input
                  type="file"
                  placeholder="Файл оруулаагүй байна..."
                  className="cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter dark:file:bg-white/30 dark:file:text-white file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:focus:border-primary"
                />
              </div>
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
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  defaultValue={""}
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={(): void => {
                    handleCategoryRequest();
                  }}
                  className="w-fit inline-flex items-center justify-center gap-2.5 rounded-md bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  Ангилал нэмэх
                </button>
                <button
                  onClick={(): void => {
                    router.push({ pathname: "/courses/categories" });
                  }}
                  className="w-fit inline-flex items-center justify-center gap-2.5 rounded-md bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
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
export default CategoryCreatePage;
