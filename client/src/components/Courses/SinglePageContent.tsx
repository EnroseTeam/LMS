import { FC, useState } from "react";

import { ICourse } from "@/interfaces/courses";

import SinglePageDescriptionContent from "./SinglePageDescriptionContent";
import SinglePageSectionContent from "./SinglePageSectionContent";
import SinglePageInstructorContent from "./SinglePageInstructorContent";
import SinglePageReviewContent from "./SinglePageReviewContent";

interface SinglePageContentProps {
  course: ICourse;
}

const SinglePageContent: FC<SinglePageContentProps> = ({ course }) => {
  const tabs: string[] = [
    "Дэлгэрэнгүй мэдээлэл",
    "Хичээлийн сэдвүүд",
    "Багшийн мэдээлэл",
    "Сэтгэгдлүүд",
  ];
  const tabContents: JSX.Element[] = [
    <SinglePageDescriptionContent key={`course-single-page-content-1`} course={course} />,
    <SinglePageSectionContent key={`course-single-page-content-2`} course={course} />,
    <SinglePageInstructorContent
      key={`course-single-page-content-3`}
      instuctor={course.instructor}
    />,
    <SinglePageReviewContent
      key={`course-single-page-content-4`}
      reviews={course.reviews}
      avgRating={course.avgRating}
    />,
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="container py-[120px] grid grid-cols-3">
      <div className="flex flex-col items-start text-head text-xl-medium">
        {tabs.map((tab, index) => (
          <button
            key={`single-course-tab-${index}`}
            onClick={(): void => setActiveTab(tab)}
            className={`py-4 border-l border-l-border-1 pl-4 hover:text-color-1 duration-300 ${
              activeTab === tab ? "border-l-2 border-l-color-1 text-color-1" : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="col-span-2">
        {tabContents.map((tabContent, index) => activeTab === tabs[index] && tabContent)}
      </div>
    </div>
  );
};

export default SinglePageContent;
