import CourseMediaUpload from "@/components/Instructors/Dashboard/Courses/CourseMediaUpload";
import MessageBox from "@/components/global/MessageBox";
import { ICourse, ICourseCategory, ICourseLevel } from "@/interfaces/courses";
import DashboardLayout from "@/layouts/DashboardLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { axiosInstance } from "@/utils/axiosInstance";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { ReactNode, useState } from "react";
import CourseCreateForm from "@/components/Instructors/Dashboard/Courses/CourseInfoForm";
import CourseSectionForm from "@/components/Instructors/Dashboard/Courses/CourseSectionForm";

interface InstructorCoursesEditPageProps {
  course: ICourse;
  levels: ICourseLevel[];
  categories: ICourseCategory[];
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axiosInstance.get("/api/courses/id");
  const paths = res.data.body.map((id: string) => ({ params: { id } }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<InstructorCoursesEditPageProps> = async ({
  params,
}) => {
  try {
    const [courseRes, levelsRes, categoriesRes] = await axios.all([
      axiosInstance.get(`/api/courses/${params?.id}`),
      axiosInstance.get("/api/courses/levels"),
      axiosInstance.get("/api/courses/categories"),
    ]);

    return {
      props: {
        course: courseRes.data.body,
        levels: levelsRes.data.body,
        categories: categoriesRes.data.body,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

const InstructorCoursesEditPage: NextPageWithLayout<InstructorCoursesEditPageProps> = ({
  course,
  levels,
  categories,
}) => {
  const [image, setImage] = useState<string>("");
  const [video, setVideo] = useState<string>("");

  const [isImageExist, setIsImageExist] = useState<boolean>(true);
  const [isVideoExist, setIsVideoExist] = useState<boolean>(true);

  const mediaStates = {
    image,
    setImage,
    video,
    setVideo,
    isImageExist,
    setIsImageExist,
    isVideoExist,
    setIsVideoExist,
  };

  return (
    <>
      <h1 className="text-head text-3xl-bold mb-[9px]">Сургалт засах</h1>
      <p className="text-text text-md-regular mb-[30px]">Сургалтын мэдээлэл засах</p>

      <MessageBox
        type="Warning"
        message="Сургалтын мэдээллээ хадгалхаас өмнө хуудсаа дахин ачааллавал таны оруулсан бүх мэдээлэл устах болно."
        className="mb-[30px]"
      />

      <CourseMediaUpload mediaStates={mediaStates} />
      <CourseCreateForm levels={levels} categories={categories} mediaStates={mediaStates} />
      <CourseSectionForm />
    </>
  );
};

export default InstructorCoursesEditPage;

InstructorCoursesEditPage.getLayout = function getLayout(page): ReactNode {
  return <DashboardLayout>{page}</DashboardLayout>;
};
