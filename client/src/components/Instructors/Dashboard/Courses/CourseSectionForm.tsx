import { useModal } from "@/hooks/useModal";
import { FC, useState } from "react";
import SectionForm from "../Sections/SectionForm";
import { ICourse, ICourseSection } from "@/interfaces/courses";

import SectionAccordion from "../Sections/SectionAccordion";

interface CourseSectionFormProps {
  course: ICourse;
}

const CourseSectionForm: FC<CourseSectionFormProps> = ({ course }) => {
  const { showModal } = useModal();
  const [sections, setSections] = useState<ICourseSection[]>(course.sections);

  const showAddSectionModal = (): void => {
    showModal({
      title: "Хичээлийн сэдэв нэмэх",
      content: <SectionForm courseId={course._id} afterCreate={afterCreate} />,
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
      </div>
    </div>
  );
};

export default CourseSectionForm;
