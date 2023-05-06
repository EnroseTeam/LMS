import { FC, useState } from "react";

import CourseCard from "../../components/Courses/CourseCard";
import { IUser } from "@/interfaces/user";
import Tab, { TabHeaderItem } from "../global/Tab";

interface SinglePageContentProps {
  instructor: IUser;
}

const SinglePageContent: FC<SinglePageContentProps> = ({ instructor }) => {
  const [descriptionHide, setDescriptionHide] = useState(true);

  const data = `Phasellus enim magna, varius et commodo ut, ultricies vitae velit. Ut nulla tellus, eleifend euismod pellentesque vel, sagittis vel justo. In libero urna, venenatis sit amet ornare non, suscipit nec risus. Sed consequat justo non mauris pretium at tempor justo sodales. Quisque tincidunt laoreet malesuada. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur.

This course is aimed at people interested in UI/UX Design. We’ll start from the very beginning and work all the way through, step by step. If you already have some UI/UX Design experience but want to get up to speed using Adobe XD then this course is perfect for you too!

First, we will go over the differences between UX and UI Design. We will look at what our brief for this real-world project is, then we will learn about low-fidelity wireframes and how to make use of existing UI design kits.`;

  const description = (
    <div className="mb-[60px]">
      <h1 className="text-head text-xl font-medium leading-[23px] mb-[30px]">
        Тайлбар
      </h1>
      <div
        className={`text-text text-md-regular overflow-hidden mb-10 relative ${
          descriptionHide ? "h-[160px]" : "h-full"
        } `}
      >
        <div
          className="[&>p]:mb-4"
          dangerouslySetInnerHTML={{ __html: data }}
        />
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
  );

  const courseContent = (
    <div className="grid grid-cols-2 gap-[30px]">
      {instructor.ownCourses.length > 0 &&
        instructor.ownCourses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      {instructor.ownCourses.length === 0 && (
        <p className="col-span-2 text-center text-text text-md-medium">
          Сургалт байхгүй байна.
        </p>
      )}
    </div>
  );

  const tabHeaders: TabHeaderItem[] = [
    { name: "Дэлгэрэнгүй мэдээлэл", slug: "description" },
    { name: "Хичээлүүд", slug: "course-content" },
  ];

  const tabContents: JSX.Element[] = [description, courseContent];

  return (
    <>
      <div className="container px-[325px] mb-[120px]">
        <Tab tabHeaders={tabHeaders} tabContents={tabContents} />
      </div>
    </>
  );
};

export default SinglePageContent;
