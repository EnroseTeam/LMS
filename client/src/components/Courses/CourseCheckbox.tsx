import { ICourseCategory } from "@/interfaces/courses";
import { FC, useState } from "react";

interface CourseCheckBoxProps {
  title: string;
  items: ICourseCategory[];
}

const CourseCheckBox: FC<CourseCheckBoxProps> = ({ title, items }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="">
      <button
        onClick={(): void => setShow(!show)}
        className="text-head font-medium leading-[23px] text-[20px]"
      >
        {title}
      </button>
      <div
        className={`${
          show ? "opacity-100" : "opacity-0 pointer-events-none"
        } z-[10]  rounded-lg py-[30px] pr-[50px] duration-300 shadow`}
      >
        {items.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-[15px] text-color-2 py-[5px]"
          >
            <input
              type="checkbox"
              id={item.name}
              className="w-[15px] h-[15px] border-2 border-2-icon rounded-none text-black"
            />
            <label className="whitespace-nowrap" htmlFor={item.name}>
              {item.name}
            </label>
            <div className="flex text-end">{item.courseCount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCheckBox;
