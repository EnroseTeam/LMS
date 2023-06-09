import CourseMediaUpload from "@/components/Instructors/Dashboard/Courses/CourseMediaUpload";
import MessageBox from "@/components/global/MessageBox";
import { ICourse, ICourseCategory, ICourseLevel } from "@/interfaces/courses";
import DashboardLayout from "@/layouts/DashboardLayout";
import { NextPageWithLayout } from "@/pages/_app";
import { axiosInstance } from "@/utils/axiosInstance";
import axios from "axios";
import { GetServerSideProps } from "next";
import { ReactNode, useContext, useEffect, useState } from "react";
import CourseInfoForm from "@/components/Instructors/Dashboard/Courses/CourseInfoForm";
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";
import { fetcher } from "@/utils/fetcher";
import useSwr from "swr";

interface InstructorCoursesEditPageProps {
  course: ICourse;
  levels: ICourseLevel[];
  categories: ICourseCategory[];
}

export const getServerSideProps: GetServerSideProps<InstructorCoursesEditPageProps> = async ({
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
  const router = useRouter();
  const { user } = useContext(AuthContext);

  const {
    data: userOwnCourses,
    isLoading: ownCoursesLoading,
    error: coursesError,
  } = useSwr(user && "/api/courses/instructor", fetcher<{ body: ICourse[] }>);

  const [isReady, setIsReady] = useState<boolean>(false);

  const [activeStage, setActiveStage] = useState<"Info" | "Media">("Info");

  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<"Success" | "Error">("Success");

  useEffect(() => {
    if (!ownCoursesLoading && userOwnCourses && user) {
      const ids: string[] = [];
      for (const course of userOwnCourses.body) {
        ids.push(course._id);
      }

      if (!ids.includes(course._id)) {
        router.push("/instructors/dashboard/my-courses");
      } else {
        setIsReady(true);
      }
    }

    if (!ownCoursesLoading && coursesError) {
      router.push("/instructors/dashboard/my-courses");
    }
  }, [user, userOwnCourses, ownCoursesLoading, course, router, coursesError]);

  if (!isReady) return <></>;

  return (
    <>
      <h1 className="text-head text-3xl-bold mb-[9px]">Сургалт засах</h1>
      <p className="text-text text-md-regular mb-[30px]">Сургалтын мэдээлэл засах</p>

      <MessageBox
        type="Warning"
        message="Сургалтын мэдээллээ хадгалхаас өмнө хуудсаа дахин ачааллавал таны оруулсан бүх мэдээлэл устах болно."
        className="mb-[30px]"
      />

      {message && <MessageBox className="mb-[30px]" message={message} type={messageType} />}

      {activeStage === "Info" && (
        <CourseInfoForm
          levels={levels}
          categories={categories}
          setActiveStage={setActiveStage}
          course={course}
          setMessage={setMessage}
          setMessageType={setMessageType}
        />
      )}
      {activeStage === "Media" && (
        <CourseMediaUpload
          setActiveStage={setActiveStage}
          course={course}
          setMessage={setMessage}
          setMessageType={setMessageType}
        />
      )}
    </>
  );
};

export default InstructorCoursesEditPage;

InstructorCoursesEditPage.getLayout = function getLayout(page): ReactNode {
  return <DashboardLayout>{page}</DashboardLayout>;
};
