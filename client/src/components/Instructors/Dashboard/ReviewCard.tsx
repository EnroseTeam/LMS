import { FC } from "react";
import Image from "next/image";

import placeholder from "../../../assets/placeholder.png";
import RatingStar from "@/components/global/RatingStar";
import { BsFlag } from "react-icons/bs";

const InstructorReviewCard: FC = () => (
  <div className="flex gap-5">
    <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
      <Image
        src={placeholder}
        alt=""
        className="w-full h-full object-cover"
        width={60}
        height={60}
      />
    </div>
    <div className="flex-1 flex-col">
      <div className="flex justify-between items-center mb-[10px]">
        <div className="flex gap-[5px] items-center">
          <h2 className="text-lg-medium text-head">Binderiya</h2>
          <span className="text-xs-regular">3 Days ago</span>
        </div>
        <BsFlag className="text-icon" />
      </div>
      <RatingStar rating={5} gap={4} size={15} />
      <p className="text-md-medium text-head mt-[15px] mb-[9px]">
        Шилдэг платформ
      </p>
      <p className="text-md-regular text-text">
        This course is a very applicable. Professor Ng explains precisely each
        algorithm and even tries to give an intuition for mathematical and
        statistic concepts behind each algorithm. Thank you very much.
      </p>
    </div>
  </div>
);
export default InstructorReviewCard;
