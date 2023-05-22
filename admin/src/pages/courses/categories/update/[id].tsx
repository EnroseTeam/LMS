import { useModal } from "@/hooks/useModal";
import { ICourseCategory } from "@/interfaces/courses";
import { axiosInstance } from "@/utils/axiosInstance";
import { isAxiosError } from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { toast } from "react-toastify";

import { AiOutlineWarning } from "react-icons/ai";

interface CategoryUpdatePageProps {
  category: ICourseCategory;
}

interface CategoryUpdateModalContentProps {
  category: ICourseCategory;
  closeModal: () => void;
  categoryName: string;
  categoryDesc: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axiosInstance.get("/api/courses/categories/id");
  const paths = res.data.body.map((id: string) => ({ params: { id } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<CategoryUpdatePageProps> = async ({
  params,
}) => {
  try {
    const res = await axiosInstance.get(
      `/api/courses/categories/${params?.id}`
    );

    return {
      props: {
        category: res.data.body,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

const CategoryUpdatePage: FC<CategoryUpdatePageProps> = ({ category }) => {
  const [categoryName, setCategoryName] = useState<string>(category.name);
  const [categoryDesc, setCategoryDesc] = useState<string>(
    category.description || ""
  );
  // const [categoryImg, setCategoryImg] = useState(category.image);

  const { showModal, closeModal } = useModal();

  const router = useRouter();

  const showUpdatePrompt = (): void => {
    showModal({
      title: "Ангилал устгах",
      content: (
        <CategoryUpdateModalContent
          category={category}
          closeModal={closeModal}
          categoryName={categoryName}
          categoryDesc={categoryDesc}
          // categoryImg={categoryDescImg}
        />
      ),
    });
  };
  return (
    <>
      <div className="grid grid-cols-1 mx-6 my-6">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Сургалтын ангилал засах
              </h3>
            </div>

            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block font-medium text-sm text-black dark:text-white">
                  Ангилал
                </label>
                <input
                  value={categoryName}
                  onChange={(e): void => {
                    setCategoryName(e.target.value);
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
                  value={categoryDesc}
                  onChange={(e): void => {
                    setCategoryDesc(e.target.value);
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
                    showUpdatePrompt();
                  }}
                  className="w-fit inline-flex items-center justify-center gap-2.5 rounded-md bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  Ангилал засах
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

const CategoryUpdateModalContent: FC<CategoryUpdateModalContentProps> = ({
  category,
  closeModal,
  categoryName,
  categoryDesc,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const submitHandler = async (): Promise<void> => {
    try {
      setIsSubmitting(true);

      await axiosInstance.patch(`/api/courses/categories/${category._id}`, {
        name: categoryName,
        description: categoryDesc,
      });

      toast.success("Ангилал амжилттай засагдлаа.");
      closeModal();
      router.push({
        pathname: "/courses/categories",
        query: { ...router.query },
      });
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data.error ||
            "Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу."
        );
      } else {
        toast.error("Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="text-danger p-3 rounded-full bg-danger/20">
        <AiOutlineWarning size={35} />
      </div>
      <h5 className="text-md-medium text-head max-w-[45ch] text-center">
        Та {category.name} нэртэй ангилал засахдаа итгэлтэй байна уу?
      </h5>
      <div className="flex items-center gap-3">
        <button
          disabled={isSubmitting}
          onClick={closeModal}
          className="btn-1 py-3 px-5 text-sm-medium bg-red-500 hover:bg-transparent rounded hover:border hover:border-primary hover:text-primary border border-transparent disabled:bg-red-300 disabled:cursor-not-allowed disabled:hover:bg-red-300 disabled:hover:border-transparent disabled:hover:text-white"
        >
          Үгүй
        </button>
        <button
          disabled={isSubmitting}
          onClick={(): void => {
            submitHandler();
          }}
          className="btn-1 py-3 px-5 text-sm-medium border border-transparent bg-red-500 hover:bg-transparent rounded hover:border hover:border-meta-1 hover:text-meta-1 disabled:bg-red-300 disabled:cursor-not-allowed disabled:hover:bg-red-300 disabled:hover:border-transparent disabled:hover:text-white"
        >
          Тийм
        </button>
      </div>
    </div>
  );
};

export default CategoryUpdatePage;
