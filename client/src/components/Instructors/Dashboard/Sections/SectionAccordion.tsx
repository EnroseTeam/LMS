import Accordion from "@/components/global/Accordion";
import { useModal } from "@/hooks/useModal";
import { ICourseLesson, ICourseSection } from "@/interfaces/courses";
import { FC, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

interface SectionAccordionProps {
  section: ICourseSection;
}

const SectionAccordion: FC<SectionAccordionProps> = ({ section }) => {
  const [lessons, setLessons] = useState<ICourseLesson[]>(section.lessons);
  const { showModal } = useModal();

  const showAddLesson = (): void => {
    showModal({ title: "Хичээл нэмэх", content: "" });
  };

  return (
    <Accordion
      header={
        <div className="flex items-center justify-between flex-1">
          <span className="text-head text-base-medium">{section.title}</span>
          <div className="flex items-center gap-5 text-base text-icon">
            <button
              className="hover:text-icon/70 duration-300"
              onClick={(e): void => {
                e.stopPropagation();
              }}
            >
              <AiOutlineEdit />
            </button>
            <button
              onClick={(e): void => {
                e.stopPropagation();
              }}
            >
              <AiOutlineDelete />
            </button>
          </div>
        </div>
      }
      content={
        <div className="p-[30px]">
          <div className="flex flex-col gap-5 items-start mb-5">
            {lessons.map((lesson, index) => (
              <button
                className="text-sm-regular text-head hover:text-icon duration-300"
                key={lesson._id}
              >
                {index + 1}. {lesson.name}
              </button>
            ))}
          </div>

          <button onClick={showAddLesson} className="btn-4 py-4 px-7 text-md-medium">
            Хичээл нэмэх +
          </button>
        </div>
      }
    />
  );
};

export default SectionAccordion;
