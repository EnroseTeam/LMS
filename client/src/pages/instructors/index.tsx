import { GetServerSideProps } from "next";
import { FC, useState } from "react";
import { BsSearch } from "react-icons/bs";

import Breadcrumbs from "@/components/global/Breadcrumbs";
import InstructorCard from "@/components/Instructors/InstructorCard";
import { IInstructor } from "@/interfaces/user";
import { useRouter } from "next/router";
import SortDropDown from "@/components/global/SortDropDown";
import { axiosInstance } from "@/utils/axiosInstance";

interface InstructorsPageProps {
  instructors: IInstructor[];
}

export const getServerSideProps: GetServerSideProps<InstructorsPageProps> = async ({ query }) => {
  const { q: search = "", sort = "popular" } = query;

  const res = await axiosInstance.get(`/api/instructors?q=${search}&sort=${sort}`);

  return {
    props: {
      instructors: res.data.body,
    },
  };
};

const InstructorsPage: FC<InstructorsPageProps> = ({ instructors }) => {
  const [input, setInput] = useState("");
  const router = useRouter();

  return (
    <>
      <Breadcrumbs breadcrumbItems={[{ title: "Багш, сургагч нар", link: "/instructors" }]} />
      <div className="container mb-[60px] lg:mb-[120px]">
        <div className="text-center">
          <h1 className="font-[700] text-[40px] leading-[47px] text-head mb-1">Багш, сургагчид</h1>
          <p className="text-lg-regular text-text mb-[60px] lg:mb-[120px]">
            We’re on a mission to deliver engaging, curated courses at a reasonable price.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-[30px] mb-[30px]">
          <p className="text-text text-sm-regular">
            Нийт <span className="text-head text-sm-medium">{instructors.length}</span> үр дүн
          </p>
          <div className="flex flex-col md:flex-row md:justify-between gap-[23px]">
            <div className="flex items-center gap-[20px] text-icon bg-bg-4 rounded-lg px-[18px] w-[340px] h-[50px] focus-within:ring-2 focus-within:ring-color-1 duration-300">
              <label
                className="cursor-pointer text-xl text-text hover:text-text/70 duration-300"
                htmlFor="instructorSearch"
              >
                <BsSearch />
              </label>
              <input
                id="instructorSearch"
                type="text"
                className=" placeholder:text-text text-sm-regular bg-inherit w-full h-full focus:outline-none "
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[30px]">
          {instructors.length > 0 &&
            instructors.map((instructor) => (
              <InstructorCard key={instructor._id} instructor={instructor} />
            ))}
          {instructors.length === 0 && <p className="text-center col-span-4">Илэрц олдсонгүй</p>}
        </div>
      </div>
    </>
  );
};

export default InstructorsPage;
