import { FC } from "react";
import { GetStaticPaths, GetStaticProps } from "next";

import SinglePageHeader from "@/components/Instructors/SinglePageHeader";
import Breadcrumbs from "@/components/global/Breadcrumbs";
import SinglePageContent from "@/components/Instructors/SinglePageContent";
import { axiosInstance } from "@/utils/axiosInstance";
import { IUser } from "@/interfaces/user";

interface SingleInstructorPageProps {
  instructor: IUser;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axiosInstance.get("/api/instructors/id");
  const paths = res.data.body.map((id: string) => ({ params: { id } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<SingleInstructorPageProps> = async ({ params }) => {
  try {
    const res = await axiosInstance.get(`/api/instructors/${params?.id}`);

    return {
      props: {
        instructor: res.data.body,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
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
