import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import { ICourseCategory } from "@/interfaces/courses";

interface CategoryCardProps {
  category: ICourseCategory;
}

const CategoryCard: FC<CategoryCardProps> = ({ category }) => (
  <Link href={`/courses?category=${category.slug}`}>
    <div className="bg-bg-4 rounded-lg py-[26px] px-[50px] text-center flex flex-col items-center hover:bg-color-2 duration-300 group">
      <div className="bg-white rounded-[100%] w-[90px] h-[90px] mb-5 flex items-center justify-center">
        <Image src={category.image} alt={category.name} width={45} height={45} />
      </div>
      <h1 className="text-head text-lg-medium mb-[10px] group-hover:text-white duration-300">
        {category.name}
      </h1>
      <p className="text-text text-xs-regular whitespace-nowrap group-hover:text-white duration-300">
        {category.courseCount} хичээлүүд
      </p>
    </div>
  </Link>
);

export default CategoryCard;
