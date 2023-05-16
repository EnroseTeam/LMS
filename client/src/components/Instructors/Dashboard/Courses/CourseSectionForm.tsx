import { useModal } from "@/hooks/useModal";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import SectionForm from "../Sections/SectionForm";
import { ICourse, ICourseSection } from "@/interfaces/courses";
import { useRouter } from "next/router";
import SectionAccordion from "../Sections/SectionAccordion";

interface CourseSectionFormProps {
  setActiveStage: Dispatch<SetStateAction<"Info" | "Media" | "Sections">>;
  courseId?: string;
  course?: ICourse;
}

const CourseSectionForm: FC<CourseSectionFormProps> = ({ setActiveStage, courseId, course }) => {
  const router = useRouter();
  const { showModal } = useModal();
  const [sections, setSections] = useState<ICourseSection[]>([]);

  useEffect(() => {
    if (course) {
      setSections(course.sections);
    }
  }, [course]);

  const showAddSectionModal = (): void => {
    showModal({
      title: "Хичээлийн сэдэв нэмэх",
      content: <SectionForm courseId={courseId} course={course} afterCreate={afterCreate} />,
    });
  };

  const afterCreate = (section: ICourseSection): void => {
    setSections([...sections, section]);
  };

  return (
    <div className="bg-white shadow-shadow-dashboard rounded-2xl">
      <div className="px-[30px] py-5 border-b border-b-border-1 flex items-center justify-between">
        <h2 className="text-head text-lg-medium">Сургалтын сэдвүүд</h2>
        <button
          onClick={(): void => {
            showAddSectionModal();
          }}
          className="btn-4 py-3 px-5 text-sm-medium"
        >
          Сэдэв нэмэх +
        </button>
      </div>
      <div className="p-[30px]">
        <div className="flex flex-col gap-[10px] mb-[30px]">
          {sections.map((section) => (
            <SectionAccordion key={section._id} section={section} />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={(): void => {
              setActiveStage("Media");
            }}
            type="button"
            className="btn-1-outline py-4"
          >
            Буцах
          </button>
          <button
            onClick={(): void => {
              router.push("/instructors/dashboard/my-courses");
            }}
            type="button"
            form="course-create-form"
            className="btn-1 py-4"
          >
            Нэмэх
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseSectionForm;
