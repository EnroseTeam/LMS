import { ICourseCategory } from '@/interfaces/courses';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { FC } from 'react';

interface CoursesPageProps {
  categories: ICourseCategory[];
}

export const getServerSideProps: GetServerSideProps<CoursesPageProps> = async () => {
  const res = await axios.get('http://localhost:5000/api/courses/categories');
  return {
    props: {
      categories: res.data.body,
    },
  };
};

const CoursesPage: FC<CoursesPageProps> = () => <div>CoursesPage</div>;

export default CoursesPage;
