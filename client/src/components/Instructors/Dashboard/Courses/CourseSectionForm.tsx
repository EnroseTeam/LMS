import Accordion from "@/components/global/Accordion";
import { useModal } from "@/hooks/useModal";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import SectionForm from "../Sections/SectionForm";
import { ICourseSection } from "@/interfaces/courses";
import { useRouter } from "next/router";

interface CourseSectionFormProps {
  setActiveStage: Dispatch<SetStateAction<"Info" | "Media" | "Sections">>;
  courseId: string;
}

const CourseSectionForm: FC<CourseSectionFormProps> = ({ setActiveStage, courseId }) => {
  const router = useRouter();
  const { showModal } = useModal();
  const [sections, setSections] = useState<ICourseSection[]>([]);

  const showAddSectionModal = (): void => {
    showModal({
      title: "Хичээлийн сэдэв нэмэх",
      content: <SectionForm courseId={courseId} afterCreate={afterCreate} />,
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
            <Accordion
              key={section._id}
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
                  <div className="flex flex-col gap-5 mb-5"></div>

                  <button className="btn-4 py-4 px-7 text-md-medium">Хичээл нэмэх +</button>
                </div>
              }
            />
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
