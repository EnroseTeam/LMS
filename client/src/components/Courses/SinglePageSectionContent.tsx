import { ICourse } from "@/interfaces/courses";
import Link from "next/link";
import { FC } from "react";

import { BsPlayFill } from "react-icons/bs";
import Accordion from "../global/Accordion";

interface SinglePageSectionContentProps {
  course: ICourse;
}

const SinglePageSectionContent: FC<SinglePageSectionContentProps> = ({ course }) => (
  <div className="flex flex-col gap-[10px]">
    {course.sections.map((section) => (
      <Accordion
        key={section._id}
        header={
          <div className="flex items-center justify-between w-full">
            <h1 className="text-base-medium">{section.title}</h1>
            <div className="text-text text-md-regular flex items-center">
              <p className='after:content-["•"] after:mx-2'>{section.lessons.length} хичээл</p>
              <p>87 min</p>
            </div>
          </div>
        }
        content={
          <div className="p-[30px] flex flex-col gap-5">
            {section.lessons.map((lesson) => (
              <Link
                key={lesson._id}
                href={`/lessons/${lesson._id}`}
                className="flex items-center justify-between"
              >
                <span className="flex items-center gap-[10px] w-[50%]">
                  <div className="p-2 rounded-full bg-color-1/[.07] text-color-1">
                    <BsPlayFill size={12} />
                  </div>
                  <h3 className="text-text text-md-regular">{lesson.name}</h3>
                </span>
                <p className="text-text text-md-regular underline">
                  {lesson.length.hour > 0 && `${lesson.length.hour} цаг`}
                  {lesson.length.minute > 0 && `${lesson.length.minute} минут`}
                </p>
              </Link>
            ))}
          </div>
        }
      />
    ))}
  </div>
);

export default SinglePageSectionContent;
