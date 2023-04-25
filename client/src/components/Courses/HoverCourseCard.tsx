import { ICourse } from "@/interfaces/courses";
import { FC } from "react";
import { BsFileEarmarkText, BsClock, BsBarChart } from "react-icons/bs";
import { GrFormCheckmark } from "react-icons/gr";

interface HoverCourseCardProps {
  course: ICourse;
}

const HoverCourseCard: FC<HoverCourseCardProps> = ({ course }) => (
  <div className="p-2 absolute text-head -top-4 left-[102%] pointer-events-none group-hover:pointer-events-auto">
    <div className="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto duration-300">
      <div className="w-[10px] h-[10px] rotate-45 bg-white border-b border-l border-border-2 absolute top-20 -left-1 z-[99]" />
      <div className="bg-white rounded-lg border border-border-2 px-[30px] py-[22px] z-[999] -ml-2">
        <h1 className="text-[20px] font-medium leading-[30px] mb-[15px] w-[30ch]">{course.name}</h1>
        <div className="flex items-center justify-between mb-[15px]">
          <span className="flex items-center gap-2 text-md text-icon">
            <BsFileEarmarkText />
            <span className="text-sm-regular text-text">{course.lessonCount} хичээл</span>
          </span>

          <span className="flex items-center gap-2 text-md text-icon">
            <BsClock />
            <span className="text-sm-regular text-text">
              {course.totalLessonLength.hour > 0 && `${course.totalLessonLength.hour} цаг`}
              {course.totalLessonLength.minute > 0 && `${course.totalLessonLength.minute} минут`}
            </span>
          </span>

          <span className="flex items-center gap-2 text-md text-icon">
            <BsBarChart />
            <span className="text-sm-regular text-text">{course.level.name}</span>
          </span>
        </div>

        <div
          className="text-base-regular leading-[26px] mb-[15px] w-[35ch]"
          dangerouslySetInnerHTML={{ __html: course.description.slice(0, 100) + "..." }}
        />

        <ul className="flex flex-col gap-[5px] text-text text-md-regular mb-[30px]">
          {course.goals.map((goal, index) => (
            <li key={`course-goal-${index}`} className="flex items-center gap-[10px]">
              <div className="w-5 h-5 border border-border-1 rounded-full grid place-items-center">
                <GrFormCheckmark size={12} />
              </div>
              {goal}
            </li>
          ))}
        </ul>

        <button className="block w-full py-3 rounded-lg text-white bg-color-1 hover:bg-color-1/70 duration-300">
          Сагсанд нэмэх
        </button>
      </div>
    </div>
  </div>
);

export default HoverCourseCard;
