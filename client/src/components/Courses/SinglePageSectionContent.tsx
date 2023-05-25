import { ICourse, ICourseSection } from "@/interfaces/courses";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

import { BsPlayFill } from "react-icons/bs";
import Accordion from "../global/Accordion";

interface SinglePageSectionContentProps {
  course: ICourse;
}

const SinglePageSectionContent: FC<SinglePageSectionContentProps> = ({ course }) => (
  <div className="flex flex-col gap-[10px]">
    {course.sections.map((section, index) => (
      <SingleSectionContent key={section._id} section={section} index={index} />
    ))}
  </div>
);

interface SingleSectionContentProps {
  section: ICourseSection;
  index: number;
}

const SingleSectionContent: FC<SingleSectionContentProps> = ({ section, index }) => {
  const [totalMinutes, setTotalMinutes] = useState<number>(0);
  const [totalHours, setTotalHours] = useState<number>(0);

  useEffect(() => {
    let minutes = 0;
    let hours = 0;

    for (const lesson of section.lessons) {
      minutes += lesson.length.minute;
      hours += lesson.length.hour;
    }

    if (minutes >= 60) {
      minutes -= 60;
      hours += 1;
    }

    setTotalHours(hours);
    setTotalMinutes(minutes);
  }, [section]);

  return (
    <Accordion
      state={index === 0}
      header={
        <div className="flex flex-col smallest:flex-row items-start smallest:items-center justify-between w-full">
          <h1 className="text-base-medium">{section.title}</h1>
          <div className="text-text text-md-regular flex items-center">
            <p className='after:content-["•"] after:mx-2'>{section.lessons.length} хичээл</p>
            <p>
              {totalHours > 0 && `${totalHours} цаг`} {totalMinutes > 0 && `${totalMinutes} минут`}
            </p>
          </div>
        </div>
      }
      content={
        <div className="p-[30px] flex flex-col gap-5">
          {section.lessons.map((lesson) => (
            <Link
              key={lesson._id}
              href={`/lessons/${lesson._id}`}
              className="flex flex-col smallest:flex-row items-start smallest:items-center justify-between group gap-2 smallest:gap-0"
            >
              <span className="flex items-center gap-[10px] w-full smallest:w-1/2">
                <div className="p-2 rounded-full bg-color-1/[.07] text-color-1 group-hover:bg-color-1 group-hover:text-white duration-300">
                  <BsPlayFill size={12} />
                </div>
                <h3 className="text-text text-md-regular group-hover:text-color-1 duration-300">
                  {lesson.name}
                </h3>
              </span>
              <p className="text-text text-md-regular underline self-end smallest:self-auto">
                {lesson.length.hour > 0 && `${lesson.length.hour} цаг`}
                {lesson.length.minute > 0 && `${lesson.length.minute} минут`}
              </p>
            </Link>
          ))}
        </div>
      }
    />
  );
};

export default SinglePageSectionContent;
