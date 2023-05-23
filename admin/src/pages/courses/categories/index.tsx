import SingleCategoryRow from "@/components/Courses/Categories/SingleCategoryRow";
import { ICourseCategory } from "@/interfaces/courses";
import { axiosInstance } from "@/utils/axiosInstance";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { FC } from "react";

interface CourseCategoryPageProps {
  categories: ICourseCategory[];
}

export const getStaticProps: GetStaticProps<
  CourseCategoryPageProps
> = async () => {
  const categoryRes = await axiosInstance.get("/api/courses/categories");
  return {
    props: {
      categories: categoryRes.data.body,
    },
  };
};

const CourseCategoryPage: FC<CourseCategoryPageProps> = ({ categories }) => {
  const router = useRouter();

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark m-6">
      <div className="flex justify-between items-center py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-bold text-black dark:text-white">
          Бүх Ангилал
        </h4>
        <button
          onClick={(): void => {
            router.push({ pathname: "/courses/categories/create" });
          }}
          className="w-fit inline-flex items-center justify-center gap-2.5 border border-text-primary rounded-md bg-transparent py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10 dark:border-meta-2 dark:text-meta-2"
        >
          Ангилал нэмэх
        </button>
      </div>
      <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark  md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Ангилалын нэр</p>
        </div>

        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Тайлбар</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Хичээлийн тоо</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Огноо</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Засах/Устгах</p>
        </div>
      </div>
      {categories.map((category) => (
        <SingleCategoryRow category={category} key={category._id} />
      ))}
    </div>
  );
};

export default CourseCategoryPage;
