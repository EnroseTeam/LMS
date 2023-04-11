import { ICourseCategory } from '@/interfaces/courses';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { FC } from 'react';
import Breadcrumbs from '@/components/global/Breadcrumbs';
import BgShape from '../../assets/hero-shape.svg';
import Image from 'next/image';
import placeholder from '../../assets/placeholder.png';

interface CoursesPageProps {
  categories: ICourseCategory[];
}

export const getServerSideProps: GetServerSideProps<
  CoursesPageProps
> = async () => {
  const res = await axios.get('http://localhost:5000/api/courses/categories');
  return {
    props: {
      categories: res.data.body,
    },
  };
};

const SingleInstructorPage: FC = () => (
  <>
    <Breadcrumbs
      breadcrumbItems={[
        { title: 'Багш, сургагч нар', link: '/instructors' },
        { title: 'Ali Tufan', link: '/instructors/instructor' },
      ]}
    />
    <div className="container relative bg-color-1 pt-[69px] rounded-lg text-white">
      <div className="px-[325px]">
        <div className="rounded-full overflow-hidden w-[127px] h-[127px]">
          <Image
            src={placeholder}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <h1>Ali Tufan</h1>
      </div>
    </div>
    <div className="absolute container top-8 right-0 left-0 pointer-events-none ">
      <img src={BgShape} alt="" className="w-full" />
    </div>
  </>
);

export default SingleInstructorPage;
