import { FC } from "react";
import { GetStaticPaths, GetStaticProps } from "next";

import SinglePageHeader from "@/components/Instructors/SinglePageHeader";
import Breadcrumbs from "@/components/global/Breadcrumbs";
import SinglePageContent from "@/components/Instructors/SinglePageContent";
import { IUser } from "@/interfaces/user";
import { axiosInstance } from "@/utils/axiosInstance";

interface SingleInstructorPageProps {
  instructor: IUser;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axiosInstance.get("/api/users/instructors/id");
  const paths = res.data.body.map((id: string) => ({ params: { id } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<SingleInstructorPageProps> = async ({ params }) => {
  const res = await axiosInstance.get(`/api/users/instructors/${params?.id}`);

  return {
    props: {
      instructor: res.data.body,
    },
  };
};

const SingleInstructorPage: FC<SingleInstructorPageProps> = ({ instructor }) => (
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
