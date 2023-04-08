import { FC } from 'react';

import { ICourseCategory } from '@/interfaces/courses';
import CategoryCard from './CategoryCard';

interface TopCategoriesProps {
  categories: ICourseCategory[];
}

const TopCategories: FC<TopCategoriesProps> = ({ categories }) => (
  <div className="container mb-[120px]">
    <div className="mb-[51px] text-center">
      <h1 className="text-head text-3xl-bold mb-[9px]">Top Categories</h1>
      <p className="text-text text-md-regular">Lorem ipsum dolor sit amet, consectetur.</p>
    </div>

    <div className="grid grid-cols-6 gap-[30px]">
      {categories.map((category) => (
        <CategoryCard key={category._id} category={category} />
      ))}
    </div>
  </div>
);

export default TopCategories;
