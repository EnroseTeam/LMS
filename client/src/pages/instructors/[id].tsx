import { FC } from "react";
import { ICourseCategory } from "@/interfaces/courses";
import axios from "axios";
import { GetServerSideProps } from "next";

import { ICourse } from "@/interfaces/courses";
import SinglePageHeader from "@/components/Instructors/SinglePageHeader";
import Breadcrumbs from "@/components/global/Breadcrumbs";
import BgShape from "../../assets/hero-shape.svg";
import Image from "next/image";
import SinglePageContent from "@/components/Instructors/SinglePageContent";

interface SingleInstructorPageProps {
  categories: ICourseCategory[];
  courses: ICourse[];
}

export const getServerSideProps: GetServerSideProps<
  SingleInstructorPageProps
> = async () => {
  const [categoryRes, courseRes] = await axios.all([
    axios.get("http://localhost:5000/api/courses/categories"),
    axios.get("http://localhost:5000/api/courses"),
  ]);
  return {
    props: {
      categories: categoryRes.data.body,
      courses: courseRes.data.body,
    },
  };
};

const SingleInstructorPage: FC<SingleInstructorPageProps> = ({ courses }) => (
  <div>
    <Breadcrumbs
      breadcrumbItems={[
        { title: "Багш, сургагч нар", link: "/instructors" },
        { title: "Ali Tufan", link: "/instructors/instructor" },
      ]}
    />

    <SinglePageHeader />

    <div className="absolute container top-8 right-0 left-0 pointer-events-none ">
      <Image src={BgShape} alt="" className="w-full" />
    </div>
    <SinglePageContent courses={courses} />
  </div>
);

export default SingleInstructorPage;
