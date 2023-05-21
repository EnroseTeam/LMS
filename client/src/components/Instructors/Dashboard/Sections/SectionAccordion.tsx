import Accordion from "@/components/global/Accordion";
import { useModal } from "@/hooks/useModal";
import { ICourseLesson, ICourseSection } from "@/interfaces/courses";
import { axiosInstance } from "@/utils/axiosInstance";
import { isAxiosError } from "axios";
import { Dispatch, FC, ReactNode, SetStateAction, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineWarning } from "react-icons/ai";
import { toast } from "react-toastify";
import SectionForm from "./SectionForm";
import LessonForm from "../Lessons/LessonForm";
import classNames from "classnames";

interface SectionAccordionProps {
  section: ICourseSection;
  afterUpdate: (section: ICourseSection) => void;
}

const SectionAccordion: FC<SectionAccordionProps> = ({ section, afterUpdate }) => {
  const [lessons, setLessons] = useState<ICourseLesson[]>(section.lessons);
  const { showModal, closeModal } = useModal();

  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const afterCreateLesson = (lesson: ICourseLesson): void => {
    setLessons([...lessons, lesson]);
  };

  const afterUpdateLesson = (lesson: ICourseLesson): void => {
    setLessons(lessons.map((curLesson) => (curLesson._id === lesson._id ? lesson : curLesson)));
  };

  const showAddLesson = (): void => {
    showModal({
      title: "Хичээл нэмэх",
      content: (
        <LessonForm
          sectionId={section._id}
          closeModal={closeModal}
          afterCreateLesson={afterCreateLesson}
        />
      ),
    });
  };

  const showDeletePrompt = (): void => {
    showModal({
      title: `Сэдэв утсгах`,
      content: (
        <SectionDeleteModalContent
          section={section}
          closeModal={closeModal}
          setIsDeleted={setIsDeleted}
        />
      ),
    });
  };

  const showEditModal = (): void => {
    showModal({
      title: "Сэдэв засах",
      content: <SectionForm section={section} afterUpdate={afterUpdate} />,
    });
  };

  if (isDeleted) return <></>;

  return (
    <Accordion
      header={
        <div className="flex items-center justify-between flex-1">
          <span className="text-head text-base-medium">{section.title}</span>
          <div className="flex items-center gap-5 text-base text-icon">
            <button
              className="hover:text-color-1 duration-300"
              onClick={(e): void => {
                e.stopPropagation();
                showEditModal();
              }}
            >
              <AiOutlineEdit size={18} />
            </button>
            <button
              className="hover:text-color-1 duration-300 "
              onClick={(e): void => {
                e.stopPropagation();
                showDeletePrompt();
              }}
            >
              <AiOutlineDelete size={18} />
            </button>
          </div>
        </div>
      }
      content={
        <div className="p-[30px] overflow-y-auto">
          <div className="flex flex-col gap-5 items-start mb-5">
            {lessons.map((lesson, index) => (
              <SingleLessonContent
                key={lesson._id}
                index={index}
                lesson={lesson}
                showModal={showModal}
                closeModal={closeModal}
                afterUpdateLesson={afterUpdateLesson}
              />
            ))}
          </div>

          <button onClick={showAddLesson} className="btn-4 py-3 px-7 text-md-medium">
            Хичээл нэмэх +
          </button>
        </div>
      }
    />
  );
};

interface SingleLessonContentProps {
  lesson: ICourseLesson;
  index: number;
  showModal: ({ title, content }: { title: string; content: ReactNode }) => void;
  closeModal: () => void;
  afterUpdateLesson: (lesson: ICourseLesson) => void;
}

const SingleLessonContent: FC<SingleLessonContentProps> = ({
  lesson,
  index,
  showModal,
  closeModal,
  afterUpdateLesson,
}) => {
  const [actionButtonShow, setActionButtonShow] = useState<boolean>(false);

  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const showEditLessonModal = (): void => {
    showModal({
      title: "Хичээл засах",
      content: (
        <LessonForm closeModal={closeModal} lesson={lesson} afterUpdateLesson={afterUpdateLesson} />
      ),
    });
  };

  const showDeleteLessonPrompt = (): void => {
    showModal({
      title: "Хичээл устгах",
      content: (
        <LessonDeleteModalContent
          lesson={lesson}
          closeModal={closeModal}
          setIsDeleted={setIsDeleted}
        />
      ),
    });
  };

  if (isDeleted) return <></>;

  return (
    <div key={lesson._id} className="relative">
      <button
        onClick={(): void => {
          setActionButtonShow(!actionButtonShow);
        }}
        className="block text-sm-regular text-head hover:text-icon duration-300"
      >
        {index + 1}. {lesson.name}
      </button>

      <div
        className={classNames(
          "absolute top-full right-0 z-40 mt-2",
          { block: actionButtonShow },
          { hidden: !actionButtonShow }
        )}
      >
        <div className="absolute left-1/2 w-[10px] h-[10px] rotate-45 bg-white border-t border-l border-border-1" />
        <div className="rounded-lg p-5 bg-white border border-border-1 mt-[5px] w-fit flex flex-col gap-5">
          <button
            onClick={(): void => {
              showEditLessonModal();
              setActionButtonShow(false);
            }}
            className="flex items-center gap-2 text-md-regular leading-none text-head hover:text-color-1 duration-300"
          >
            <AiOutlineEdit size={16} /> Засах
          </button>
          <button
            onClick={(): void => {
              showDeleteLessonPrompt();
              setActionButtonShow(false);
            }}
            className="flex items-center gap-2 text-md-regular leading-none text-head hover:text-color-1 duration-300"
          >
            <AiOutlineDelete size={16} /> Устгах
          </button>
        </div>
      </div>
    </div>
  );
};

interface LessonDeleteModalContentProps {
  lesson: ICourseLesson;
  closeModal: () => void;
  setIsDeleted: Dispatch<SetStateAction<boolean>>;
}

const LessonDeleteModalContent: FC<LessonDeleteModalContentProps> = ({
  lesson,
  closeModal,
  setIsDeleted,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submitHandler = async (): Promise<void> => {
    try {
      setIsSubmitting(true);

      await axiosInstance.delete(`/api/courses/lessons/${lesson._id}`);

      toast.success("Хичээл амжилттай устлаа.");
      setIsDeleted(true);
      closeModal();
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data.error || "Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу."
        );
      } else {
        toast.error("Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="text-red-500 p-3 rounded-full bg-red-200">
        <AiOutlineWarning size={35} />
      </div>
      <h5 className="text-md-medium text-head max-w-[45ch] text-center">
        Та {lesson.name} нэртэй хичээлийг устгахдаа итгэлтэй байна уу?
      </h5>
      <div className="flex items-center gap-3">
        <button
          disabled={isSubmitting}
          onClick={closeModal}
          className="btn-1 py-3 px-5 text-sm-medium"
        >
          Үгүй
        </button>
        <button
          disabled={isSubmitting}
          onClick={(): void => {
            submitHandler();
          }}
          className="btn-1 py-3 px-5 text-sm-medium bg-red-500 hover:bg-transparent hover:border-red-500 hover:text-red-500 disabled:bg-red-300 disabled:cursor-not-allowed disabled:hover:bg-red-300 disabled:hover:border-transparent disabled:hover:text-white"
        >
          Тийм
        </button>
      </div>
    </div>
  );
};

interface SectionDeleteModalContentProps {
  section: ICourseSection;
  closeModal: () => void;
  setIsDeleted: Dispatch<SetStateAction<boolean>>;
}

const SectionDeleteModalContent: FC<SectionDeleteModalContentProps> = ({
  section,
  closeModal,
  setIsDeleted,
}) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submitHandler = async (): Promise<void> => {
    try {
      setIsSubmitting(true);

      await axiosInstance.delete(`/api/courses/sections/${section._id}`);

      toast.success("Сэдэв амжилттай устлаа.");
      setIsDeleted(true);
      closeModal();
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data.error || "Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу."
        );
      } else {
        toast.error("Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="text-red-500 p-3 rounded-full bg-red-200">
        <AiOutlineWarning size={35} />
      </div>
      <h5 className="text-md-medium text-head max-w-[45ch] text-center">
        Та {section.title} нэртэй сэдвийг устгахдаа итгэлтэй байна уу?
      </h5>
      <div className="flex items-center gap-3">
        <button
          disabled={isSubmitting}
          onClick={closeModal}
          className="btn-1 py-3 px-5 text-sm-medium"
        >
          Үгүй
        </button>
        <button
          disabled={isSubmitting}
          onClick={(): void => {
            submitHandler();
          }}
          className="btn-1 py-3 px-5 text-sm-medium bg-red-500 hover:bg-transparent hover:border-red-500 hover:text-red-500 disabled:bg-red-300 disabled:cursor-not-allowed disabled:hover:bg-red-300 disabled:hover:border-transparent disabled:hover:text-white"
        >
          Тийм
        </button>
      </div>
    </div>
  );
};

export default SectionAccordion;
