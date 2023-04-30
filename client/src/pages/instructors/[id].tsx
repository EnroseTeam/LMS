import { FC } from "react";
import { ICourseCategory } from "@/interfaces/courses";
import axios from "axios";
import { GetServerSideProps } from "next";

import SinglePageHeader from "@/components/Instructors/SinglePageHeader";
import Breadcrumbs from "@/components/global/Breadcrumbs";
import SinglePageContent from "@/components/Instructors/SinglePageContent";
import { IUser } from "@/interfaces/user";

interface SingleInstructorPageProps {
  categories: ICourseCategory[];
  instructor: IUser;
}

export const getServerSideProps: GetServerSideProps<
  SingleInstructorPageProps
> = async ({ params }) => {
  const [categoryRes, instructorRes] = await axios.all([
    axios.get("http://localhost:5000/api/courses/categories"),
    axios.get(`http://localhost:5000/api/users/${params?.id}`),
  ]);
  return {
    props: {
      categories: categoryRes.data.body,
      instructor: instructorRes.data.body,
    },
  };
};

const SingleInstructorPage: FC<SingleInstructorPageProps> = ({
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

    <SinglePageContent instructor={instructor} />
  </div>
);

export default SingleInstructorPage;
