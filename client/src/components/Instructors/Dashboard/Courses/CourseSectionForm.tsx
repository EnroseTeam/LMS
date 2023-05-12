import Accordion from "@/components/global/Accordion";
import { Dispatch, FC, SetStateAction } from "react";

interface CourseSectionFormProps {
  setActiveStage: Dispatch<SetStateAction<"Info" | "Media" | "Sections">>;
  courseId: string;
}

const CourseSectionForm: FC<CourseSectionFormProps> = ({ setActiveStage, courseId }) => {
  console.log("object");

  return (
    <div className="bg-white shadow-shadow-dashboard rounded-2xl">
      <div className="px-[30px] py-5 border-b border-b-border-1">
        <h2 className="text-head text-lg-medium">Сургалтын сэдвүүд</h2>
      </div>
      <div className="p-[30px]">
        <div className="flex flex-col gap-[10px] mb-[30px]">
          <Accordion
            header={
              <div className="flex items-center justify-between flex-1">
                <span>Хичээлийн сэдэв</span>
                <div className="flex items-center gap-5">
                  <button
                    onClick={(e): void => {
                      e.stopPropagation();
                    }}
                  >
                    Засах
                  </button>
                  <button
                    onClick={(e): void => {
                      e.stopPropagation();
                    }}
                  >
                    устах
                  </button>
                </div>
              </div>
            }
          />
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
          <button type="submit" form="course-create-form" className="btn-1 py-4">
            Нэмэх
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseSectionForm;
