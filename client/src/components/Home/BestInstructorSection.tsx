import { FC } from "react";
import Link from "next/link";

import InstructorCard from "../Instructors/InstructorCard";
import { IUser } from "@/interfaces/user";
import { HiOutlineArrowUpRight } from "react-icons/hi2";

interface BestInstructorSectionProps {
  instructors: IUser[];
}

const BestInstructorSection: FC<BestInstructorSectionProps> = ({
  instructors,
}) => (
  <>
    <div className="container mb-[111px] mt-[120px]">
      <h1 className="text-3xl-bold text-head">Шилдэг багш, сургагч нар</h1>
      <div className="flex justify-between items-center mb-[43px]">
        <p className="text-text">Lorem ipsum dolor sit amet, consectetur.</p>
        <Link href="/instructors" className="arrow-btn-1">
          Бүх багш, сургагчид
          <HiOutlineArrowUpRight size={20} />
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-[22px] mb-[60px]">
        {instructors.map((instructor) => (
          <InstructorCard key={instructor._id} instructor={instructor} />
        ))}
      </div>
      <p className="text-text flex justify-center">
        Өөрийн мэдлэгээ бусдад түгээж, нэмэлт орлоготой болмоор байна уу?
        <Link href="/become-instructor" className="text-color-1 ml-1 underline">
          Багш болох
        </Link>
      </p>
    </div>
  </>
);

export default BestInstructorSection;
