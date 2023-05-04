import { FC, useState } from "react";
import axios from "axios";

import MessageBox from "@/components/global/MessageBox";
import CourseMediaUpload from "@/components/Instructors/Dashboard/Courses/CourseMediaUpload";
import CourseCreateForm from "@/components/Instructors/Dashboard/Courses/CourseCreateForm";
import { ICourseCategory, ICourseLevel } from "@/interfaces/courses";
import { GetStaticProps } from "next";
import { axiosInstance } from "@/utils/axiosInstance";

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

const InstructorCreateCoursePage: FC<InstructorCreateCoursePageProps> = ({
  levels,
  categories,
}) => {
  const [image, setImage] = useState<string>("");
  const [video, setVideo] = useState<string>("");

  const mediaStates = {
    image,
    setImage,
    video,
    setVideo,
  };

  return (
    <>
      <h1 className="text-head text-3xl-bold mb-[9px]">Сургалт нэмэх</h1>
      <p className="text-text text-md-regular mb-[30px]">Шинээр сургалт нэмэх</p>

      <MessageBox
        type="Warning"
        message="Сургалтаа нэмэхээс өмнө хуудсаа дахин ачааллавал таны оруулсан бүх мэдээлэл устах болно."
        className="mb-[30px]"
      />

      <CourseMediaUpload mediaStates={mediaStates} />
      <CourseCreateForm levels={levels} categories={categories} image={image} video={video} />
    </>
  );
};

export default InstructorCreateCoursePage;
