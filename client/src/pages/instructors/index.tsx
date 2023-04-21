import axios from "axios";
import { GetServerSideProps } from "next";
import { FC, useState } from "react";
import { BsChevronDown, BsSearch } from "react-icons/bs";

import { ICourseCategory } from "@/interfaces/courses";
import Breadcrumbs from "@/components/global/Breadcrumbs";
import InstructorCard from "@/components/Instructors/InstructorCard";
import { IUser } from "@/interfaces/user";
import { useRouter } from "next/router";

interface InstructorsPageProps {
  categories: ICourseCategory[];
  instructors: IUser[];
}

export const getServerSideProps: GetServerSideProps<
  InstructorsPageProps
> = async () => {
  const [categoryRes, instructorsRes] = await axios.all([
    axios.get("http://localhost:5000/api/courses/categories"),
    axios.get("http://localhost:5000/api/users/instructors"),
  ]);
  return {
    props: {
      categories: categoryRes.data.body,
      instructors: instructorsRes.data.body,
    },
  };
};

const InstructorsPage: FC<InstructorsPageProps> = ({ instructors }) => {
  const [dropCategory, setDropCategory] = useState(false);
  const [dropSort, setDropSort] = useState(false);
  const [input, setInput] = useState("");

  const dropCategoryHandler = (): void => {
    setDropCategory(!dropCategory);
    setDropSort(false);
  };

  const dropSortHandler = (): void => {
    setDropSort(!dropSort);
    setDropCategory(false);
  };

  const router = useRouter();

  return (
    <>
      <Breadcrumbs
        breadcrumbItems={[{ title: "Багш, сургагч нар", link: "/instructors" }]}
      />
      <div className="container mb-[150px]">
        <div className="text-center">
          <h1 className="font-[700] text-[40px] leading-[47px] text-head mb-1">
            Instructors
          </h1>
          <p className="text-lg-regular text-text mb-[90px]">
            We’re on a mission to deliver engaging, curated courses at a
            reasonable price.
          </p>
        </div>
        <div className="flex justify-between items-center mb-[30px]">
          <p className="text-text text-sm-regular">
            Showing <span className="text-head text-sm-medium">250</span> total
            results
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
                placeholder="Search Instructors"
                onChange={(e)=> {
                  e.target.value = input
                }}
                onKeyDown={(e): void => {
                  if (e.key === "Enter") {
                    router.push({
                      query: { ...router.query, q: },
                    });
                  }
                }}
              />
            </div>

            <div className="relative">
              <button
                onClick={dropCategoryHandler}
                className="bg-bg-4 rounded-lg py-4 px-[15px] flex items-center gap-[46px] text-text text-sm-regular"
              >
                Category
                <BsChevronDown
                  className={`duration-300 ${
                    dropCategory ? "rotate-[-180deg]" : "rotate-0"
                  }`}
                />
              </button>
              <div
                className={`${
                  dropCategory ? "opacity-100" : "opacity-0 pointer-events-none"
                } absolute top-[60px] z-[10] bg-bg-4 rounded-lg py-[22px] pl-[30px] pr-[50px] duration-300 shadow-lg`}
              >
                <ul className="flex flex-col font-[400] text-[15px] leading-[35px] text-head ">
                  <li className="hover:text-color-1 whitespace-nowrap cursor-pointer hover:underline">
                    Web Designer
                  </li>
                  <li className="hover:text-color-1 whitespace-nowrap cursor-pointer hover:underline">
                    Marketing Coordinator
                  </li>
                  <li className="hover:text-color-1 whitespace-nowrap cursor-pointer hover:underline">
                    Medical Assistant
                  </li>
                  <li className="hover:text-color-1 whitespace-nowrap cursor-pointer hover:underline">
                    Dog Trainer
                  </li>
                  <li className="hover:text-color-1 whitespace-nowrap cursor-pointer hover:underline">
                    Chief
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={dropSortHandler}
                className="bg-bg-4 rounded-lg py-4 px-[15px] flex items-center gap-[46px] text-text text-sm-regular"
              >
                Sort by: Default
                <BsChevronDown
                  className={`duration-300 ${
                    dropSort ? "rotate-[-180deg]" : "rotate-0"
                  }`}
                />
              </button>
              <div
                className={`${
                  dropSort ? "opacity-100" : "opacity-0 pointer-events-none"
                } absolute top-[60px] z-[10] bg-bg-4 rounded-lg py-[22px] pl-[30px] pr-[50px] duration-300 shadow-lg`}
              >
                <ul className="flex flex-col font-[400] text-[15px] leading-[35px] text-head ">
                  <li className="hover:text-color-1 whitespace-nowrap cursor-pointer hover:underline ">
                    Popular
                  </li>
                  <li className="hover:text-color-1 whitespace-nowrap cursor-pointer hover:underline">
                    Newest
                  </li>
                  <li className="hover:text-color-1 whitespace-nowrap cursor-pointer hover:underline">
                    A - Z
                  </li>
                  <li className="hover:text-color-1 whitespace-nowrap cursor-pointer hover:underline">
                    Z - A
                  </li>
                  <li className="hover:text-color-1 whitespace-nowrap cursor-pointer hover:underline">
                    Chief
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-[30px] mb-[60px]">
          {instructors.map((instructor) => (
            <InstructorCard key={instructor._id} instructor={instructor} />
          ))}
        </div>
      </div>
    </>
  );
};

export default InstructorsPage;
