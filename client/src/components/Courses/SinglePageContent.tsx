import { FC, useState } from "react";

import { ICourse } from "@/interfaces/courses";

import SinglePageDescriptionContent from "./SinglePageDescriptionContent";
import SinglePageSectionContent from "./SinglePageSectionContent";
import SinglePageInstructorContent from "./SinglePageInstructorContent";
import SinglePageReviewContent from "./SinglePageReviewContent";
import { useRouter } from "next/router";

interface SinglePageContentProps {
  course: ICourse;
}

interface TabTitleItem {
  name: string;
  slug: string;
}

const SinglePageContent: FC<SinglePageContentProps> = ({ course }) => {
  const router = useRouter();

  const tabs: TabTitleItem[] = [
    { name: "Дэлгэрэнгүй мэдээлэл", slug: "description" },
    { name: "Хичээлийн сэдвүүд", slug: "sections" },
    { name: "Багшийн мэдээлэл", slug: "instructor-info" },
    { name: "Сэтгэгдлүүд", slug: "reviews" },
  ];
  const tabContents: JSX.Element[] = [
    <SinglePageDescriptionContent
      key={`course-single-page-content-1`}
      course={course}
    />,
    <SinglePageSectionContent
      key={`course-single-page-content-2`}
      course={course}
    />,
    <SinglePageInstructorContent
      key={`course-single-page-content-3`}
      instuctor={course.instructor}
    />,
    <SinglePageReviewContent
      key={`course-single-page-content-4`}
      course={course}
    />,
  ];

  const [activeTab, setActiveTab] = useState<string>(
    (router.query.activetab as string) || tabs[0].slug
  );

  return (
    <div id="course-content" className="container py-[120px] grid grid-cols-3">
      <div className="flex flex-col items-start text-head text-xl-medium">
        {tabs.map((tab, index) => (
          <button
            key={`single-course-tab-${index}`}
            onClick={(): void => {
              router.push({
                query: { ...router.query, activetab: tab.slug },
                hash: "course-content",
              });
              setActiveTab(tab.slug);
            }}
            className={`py-4 border-l border-l-border-1 pl-4 hover:text-color-1 duration-300 ${
              activeTab === tab.slug
                ? "border-l-2 border-l-color-1 text-color-1"
                : ""
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="col-span-2">
        {tabContents.map(
          (tabContent, index) => activeTab === tabs[index].slug && tabContent
        )}
      </div>
    </div>
  );
};

export default SinglePageContent;
