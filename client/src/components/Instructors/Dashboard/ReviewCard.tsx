import { FC, useState } from "react";
import Image from "next/image";

import placeholder from "../../../assets/placeholder.png";
import RatingStar from "@/components/global/RatingStar";
import { BsFlag, BsFlagFill } from "react-icons/bs";
import classNames from "classnames";

const InstructorReviewCard: FC = () => {
  const [showReply, setShowReply] = useState(false);

  return (
    <div>
      <div className="flex gap-5 pb-[30px] border-b">
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
          <p className="text-md-regular text-text mb-[20px]">
            This course is a very applicable. Professor Ng explains precisely
            each algorithm and even tries to give an intuition for mathematical
            and statistic concepts behind each algorithm. Thank you very much.
          </p>
          <button
            onClick={(): void => setShowReply(!showReply)}
            className={`bg-bg-2 text-xs-medium text-color-1 rounded-lg py-2 px-[17px] mb-2`}
          >
            {showReply ? "Болих" : "Хариулах"}
          </button>
          <form
            className={classNames(
              "text-md-regular text-text duration-150 w-full bg-white py-2",
              { "max-h-[1000px] opacity-100": showReply },
              { "max-h-0 opacity-0 pointer-events-none": !showReply }
            )}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-lg-medium text-head">
                Хариулт
              </label>
              <textarea
                className="appearance-none border rounded-lg w-full py-[15px] px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-color-1 resize-none"
                id="message"
                rows={10}
              />
            </div>
            <button className="bg-bg-2 text-xs-medium text-color-1 rounded-lg py-2 px-[17px]">
              Илгээх
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default InstructorReviewCard;
