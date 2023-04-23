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
import { IUser } from "@/interfaces/user";

interface SingleInstructorPageProps {
  categories: ICourseCategory[];
  courses: ICourse[];
  instructor: IUser;
}

export const getServerSideProps: GetServerSideProps<
  SingleInstructorPageProps
> = async ({ params }) => {
  const [categoryRes, courseRes, instructorRes] = await axios.all([
    axios.get("http://localhost:5000/api/courses/categories"),
    axios.get("http://localhost:5000/api/courses"),
    axios.get(`http://localhost:5000/api/users/${params?.id}`),
  ]);
  return {
    props: {
      categories: categoryRes.data.body,
      courses: courseRes.data.body,
      instructor: instructorRes.data.body,
    },
  };
};

const SingleInstructorPage: FC<SingleInstructorPageProps> = ({
  courses,
  instructor,
}) => (
  <div>
    <Breadcrumbs
      breadcrumbItems={[
        { title: "Багш, сургагч нар", link: "/instructors" },
        { title: instructor.fullName, link: `/instructors/${instructor._id}` },
      ]}
    />

    <SinglePageHeader instructor={instructor} />

    <div className="absolute container top-8 right-0 left-0 pointer-events-none ">
      <Image src={BgShape} alt="" className="w-full" />
    </div>
    <SinglePageContent courses={courses} />
  </div>
);

export default SingleInstructorPage;
