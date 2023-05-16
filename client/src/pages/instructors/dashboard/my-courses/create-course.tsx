import { ReactNode, useState } from "react";
import axios from "axios";

import MessageBox from "@/components/global/MessageBox";
import CourseInfoForm from "@/components/Instructors/Dashboard/Courses/CourseInfoForm";
import { ICourseCategory, ICourseLevel } from "@/interfaces/courses";
import { GetStaticProps } from "next";
import { axiosInstance } from "@/utils/axiosInstance";
import { NextPageWithLayout } from "@/pages/_app";
import DashboardLayout from "@/layouts/DashboardLayout";
import CourseMediaUpload from "@/components/Instructors/Dashboard/Courses/CourseMediaUpload";
import CourseSectionForm from "@/components/Instructors/Dashboard/Courses/CourseSectionForm";

interface InstructorCreateCoursePageProps {
  levels: ICourseLevel[];
  categories: ICourseCategory[];
}

export const getStaticProps: GetStaticProps<InstructorCreateCoursePageProps> = async () => {
  const [levelRes, categoryRes] = await axios.all([
    axiosInstance.get("/api/courses/levels"),
    axiosInstance.get("/api/courses/categories"),
  ]);

  return {
    props: {
      levels: levelRes.data.body,
      categories: categoryRes.data.body,
    },
  };
};

const InstructorCreateCoursePage: NextPageWithLayout<InstructorCreateCoursePageProps> = ({
  levels,
  categories,
}) => {
  const [courseId, setCourseId] = useState<string>("");
  const [activeStage, setActiveStage] = useState<"Info" | "Media" | "Sections">("Info");

  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"Success" | "Error">("Success");

  return (
    <>
      <h1 className="text-head text-3xl-bold mb-[9px]">Сургалт нэмэх</h1>
      <p className="text-text text-md-regular mb-[30px]">Шинээр сургалт нэмэх</p>

      <MessageBox
        type="Warning"
        message="Сургалтаа нэмэхээс өмнө хуудсаа дахин ачааллавал таны оруулсан бүх мэдээлэл устах болно."
        className="mb-[30px]"
      />

      {message && <MessageBox className="mb-[30px]" message={message} type={messageType} />}

      {activeStage === "Info" && (
        <CourseInfoForm
          levels={levels}
          categories={categories}
          setActiveStage={setActiveStage}
          setCourseId={setCourseId}
          setMessage={setMessage}
          setMessageType={setMessageType}
        />
      )}
      {activeStage === "Media" && (
        <CourseMediaUpload
          setActiveStage={setActiveStage}
          courseId={courseId}
          setMessage={setMessage}
          setMessageType={setMessageType}
        />
      )}
      {activeStage === "Sections" && (
        <CourseSectionForm setActiveStage={setActiveStage} courseId={courseId} />
      )}
    </>
  );
};

export default InstructorCreateCoursePage;

InstructorCreateCoursePage.getLayout = function getLayout(page): ReactNode {
  return <DashboardLayout>{page}</DashboardLayout>;
};
