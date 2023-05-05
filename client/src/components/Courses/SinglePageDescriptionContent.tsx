import { ICourse } from "@/interfaces/courses";
import { FC, useState } from "react";

import { GrFormCheckmark } from "react-icons/gr";

interface SinglePageDescriptionContentProps {
  course: ICourse;
}

const SinglePageDescriptionContent: FC<SinglePageDescriptionContentProps> = ({ course }) => {
  const [descriptionHide, setDescriptionHide] = useState(true);

  return (
    <div className="flex flex-col gap-[60px]">
      <div>
        <h1 className="text-head text-xl font-medium leading-[23px] mb-[30px]">Тайлбар</h1>
        <div
          className={`text-text text-md-regular overflow-hidden mb-10 relative ${
            descriptionHide ? "h-[260px]" : "h-full"
          } `}
        >
          <div className="[&>p]:mb-4" dangerouslySetInnerHTML={{ __html: course.description }} />
          {descriptionHide && (
            <div className="absolute w-full bottom-0 left-0 right-0 h-full pointer-events-none text-fade" />
          )}
        </div>
        <p
          onClick={(): void => setDescriptionHide(!descriptionHide)}
          className="text-color-1 underline text-sm-medium cursor-pointer hover:text-color-1/70 duration-300"
        >
          {descriptionHide ? "Дэлгэрэнгүй" : "Хураангуй"}
        </p>
      </div>
      <div>
        <h1 className="text-head text-xl font-medium leading-[23px] mb-[30px]">
          Суралцах чадварууд
        </h1>
        <div className="grid grid-cols-2 text-text text-md-regular">
          <ul className="flex flex-col gap-5">
            {course.goals.slice(0, 6).map((goal, index) => (
              <li key={`course-goal-col-1-${index}`} className="flex items-center gap-[10px]">
                <div className="w-5 h-5 border border-border-1 rounded-full grid place-items-center">
                  <GrFormCheckmark size={12} />
                </div>
                {goal}
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-5">
            {course.goals.slice(6).map((goal, index) => (
              <li key={`course-goal-col-1-${index}`} className="flex items-center gap-[10px]">
                <div className="w-5 h-5 border border-border-1 rounded-full grid place-items-center">
                  <GrFormCheckmark size={12} />
                </div>
                {goal}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h1 className="text-head text-xl font-medium leading-[23px] mb-[30px]">
          Шаардагдах чадварууд
        </h1>
        <ul className="flex flex-col gap-5 text-text text-md-regular">
          {course.requirements.map((requirement, index) => (
            <li key={`single-course-requirement-${index}`} className="flex items-center gap-[10px]">
              <div className="w-[7px] h-[7px] rounded-full bg-icon" />
              {requirement}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SinglePageDescriptionContent;
