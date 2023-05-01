import { FC } from "react";

import { ICourse } from "@/interfaces/courses";

import SinglePageDescriptionContent from "./SinglePageDescriptionContent";
import SinglePageSectionContent from "./SinglePageSectionContent";
import SinglePageInstructorContent from "./SinglePageInstructorContent";
import SinglePageReviewContent from "./SinglePageReviewContent";
import TabAlternative from "../global/TabAlternative";

interface SinglePageContentProps {
  course: ICourse;
}

interface TabTitleItem {
  name: string;
  slug: string;
}

const SinglePageContent: FC<SinglePageContentProps> = ({ course }) => {
  const tabHeaders: TabTitleItem[] = [
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

  return (
    <div className="container py-[120px] ">
      <TabAlternative tabHeaders={tabHeaders} tabContents={tabContents} />
    </div>
  );
};

export default SinglePageContent;
