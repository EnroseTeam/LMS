import axios from "axios";
import { GetServerSideProps } from "next";
import { FC, useState } from "react";
import { BsChevronDown, BsSearch } from "react-icons/bs";

import { ICourseCategory } from "@/interfaces/courses";
import Breadcrumbs from "@/components/global/Breadcrumbs";
import InstructorCard from "@/components/Instructors/InstructorCard";
import { IUser } from "@/interfaces/user";
import { useRouter } from "next/router";
import SortDropDown from "@/components/global/SortDropDown";
import { ICheckBoxFilterItem } from "@/interfaces/components";

interface InstructorsPageProps {
  categories: ICourseCategory[];
  instructors: IUser[];
}

export const getServerSideProps: GetServerSideProps<
  InstructorsPageProps
> = async ({ query }) => {
  const { q: search = "", sort = "popular" } = query;

  const [categoryRes, instructorsRes] = await axios.all([
    axios.get("http://localhost:5000/api/courses/categories"),
    axios.get(
      `http://localhost:5000/api/users/instructors?q=${search}&sort=${sort}`
    ),
  ]);
  return {
    props: {
      categories: categoryRes.data.body,
      instructors: instructorsRes.data.body,
    },
  };
};

const InstructorsPage: FC<InstructorsPageProps> = ({
  instructors,
  categories,
}) => {
  const [dropCategory, setDropCategory] = useState(false);

  const [input, setInput] = useState("");

  const dropCategoryHandler = (): void => {
    setDropCategory(!dropCategory);
  };

  const router = useRouter();

  const categoryItems: ICheckBoxFilterItem[] = categories.map((category) => ({
    title: category.name,
    slug: category.slug,
    count: category.courseCount,
  }));

  return (
    <>
      <Breadcrumbs
        breadcrumbItems={[{ title: "Багш, сургагч нар", link: "/instructors" }]}
      />
      <div className="container mb-[150px]">
        <div className="text-center">
          <h1 className="font-[700] text-[40px] leading-[47px] text-head mb-1">
            Багш, сургагчид
          </h1>
          <p className="text-lg-regular text-text mb-[90px]">
            We’re on a mission to deliver engaging, curated courses at a
            reasonable price.
          </p>
        </div>
        <div className="flex justify-between items-center mb-[30px]">
          <p className="text-text text-sm-regular">
            Нийт{" "}
            <span className="text-head text-sm-medium">
              {instructors.length}
            </span>{" "}
            үр дүн
          </p>
          <div className="flex justify-between gap-[23px]">
            <div className="flex items-center gap-[20px] text-icon bg-bg-4 rounded-lg px-[18px] w-[340px] focus-within:ring-2 focus-within:ring-color-1 duration-300">
              <label
                className="cursor-pointer text-xl text-text hover:text-text/70 duration-300"
                htmlFor="instructorSearch"
              >
                <BsSearch />
              </label>
              <input
                id="instructorSearch"
                type="text"
                className=" placeholder:text-text text-sm-regular bg-inherit w-full h-full focus:outline-none"
                placeholder="Хайх"
                value={input}
                onChange={(e): void => {
                  setInput(e.target.value);
                }}
                onKeyDown={(e): void => {
                  if (e.key === "Enter") {
                    if (input !== "") {
                      router.push({
                        query: { ...router.query, q: input },
                      });
                    } else {
                      delete router.query.q;
                      router.push({
                        query: router.query,
                      });
                    }
                  }
                }}
              />
            </div>
            <SortDropDown />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-[30px] mb-[60px]">
          {instructors.length > 0 &&
            instructors.map((instructor) => (
              <InstructorCard key={instructor._id} instructor={instructor} />
            ))}
          {instructors.length === 0 && (
            <p className="text-center col-span-4">Илэрц олдсонгүй</p>
          )}
        </div>
      </div>
    </>
  );
};

export default InstructorsPage;
