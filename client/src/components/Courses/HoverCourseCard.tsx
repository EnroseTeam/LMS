import { useCart } from "@/hooks/useCart";
import { ICourse } from "@/interfaces/courses";
import { IUser } from "@/interfaces/user";
import router from "next/router";
import { FC } from "react";
import { BsFileEarmarkText, BsClock, BsBarChart } from "react-icons/bs";
import { GrFormCheckmark } from "react-icons/gr";
import classNames from "classnames";

interface HoverCourseCardProps {
  course: ICourse;
  user: IUser | undefined;
  boughtCourses: string[];
  position?: "Left" | "Right";
}

const HoverCourseCard: FC<HoverCourseCardProps> = ({
  course,
  user,
  boughtCourses,
  position = "Right",
}) => {
  const { addCartItem } = useCart();

  return (
    <div
      className={classNames(
        "absolute text-head top-0 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto duration-300 cursor-auto hidden sm:flex z-[1000] ",
        { "left-full": position === "Right" },
        { "right-full": position === "Left" }
      )}
    >
      {position === "Right" && (
        <div className="py-10">
          <div className="w-[10px] h-[10px] rotate-45 bg-white border-b border-l border-border-2 mt-14 ml-1 z-[1000]" />
        </div>
      )}
      <div
        className={classNames(
          "bg-white rounded-lg border border-border-2 px-[30px] py-[22px] -mt-2",
          { "-ml-[5.5px]": position === "Right" },
          { "-mr-[5.5px]": position === "Left" }
        )}
      >
        <h1 className="text-[20px] font-medium leading-[30px] mb-[15px] w-[30ch]">{course.name}</h1>
        <div className="flex items-center justify-between mb-[15px]">
          <span className="flex items-center gap-2 text-md text-icon">
            <BsFileEarmarkText />
            <span className="text-sm-regular text-text">{course.lessonCount} хичээл</span>
          </span>

          <span className="flex items-center gap-2 text-md text-icon">
            <BsClock />
            <span className="text-sm-regular text-text">
              {course.totalLessonLength.hour > 0 && `${course.totalLessonLength.hour} цаг `}
              {course.totalLessonLength.minute > 0 && `${course.totalLessonLength.minute} минут`}
            </span>
          </span>

          <span className="flex items-center gap-2 text-md text-icon">
            <BsBarChart />
            <span className="text-sm-regular text-text">{course.level.name}</span>
          </span>
        </div>

        {course.discountPrice > 0 && (
          <div className="mb-[15px] w-fit uppercase py-2 px-4 bg-color-6 text-head text-[11px] font-medium leading-[13px] rounded-[60px]">
            Хямдралтай
          </div>
        )}

        <div
          className="text-base-regular leading-[26px] mb-[15px] w-[35ch]"
          dangerouslySetInnerHTML={{
            __html: course.description.slice(0, 100) + "...",
          }}
        />

        <ul className="flex flex-col gap-[5px] text-text text-md-regular mb-[30px]">
          {course.goals.slice(0, 5).map((goal, index) => (
            <li key={`course-goal-${index}`} className="flex items-center gap-[10px]">
              <div className="w-5 h-5 border border-border-1 rounded-full grid place-items-center">
                <GrFormCheckmark size={12} />
              </div>
              {goal}
            </li>
          ))}
        </ul>

        {!user && (
          <button
            onClick={(): void => {
              addCartItem(course);
            }}
            type="button"
            className="block w-full btn-1 py-3"
          >
            Сагсанд нэмэх
          </button>
        )}

        {user && !boughtCourses.includes(course._id) && (
          <button
            onClick={(): void => {
              addCartItem(course);
            }}
            type="button"
            className="block w-full btn-1 py-3"
          >
            Сагсанд нэмэх
          </button>
        )}

        {user && boughtCourses.includes(course._id) && (
          <button
            onClick={(): void => {
              router.push(`/courses/${course._id}`);
            }}
            type="button"
            className="block w-full btn-1 py-3"
          >
            Үзэх
          </button>
        )}
      </div>

      {position === "Left" && (
        <div className="py-10">
          <div className="w-[10px] h-[10px] rotate-45 bg-white border-t border-r border-border-2 mt-14 mr-1 z-[1000]" />
        </div>
      )}
    </div>
  );
};

export default HoverCourseCard;
