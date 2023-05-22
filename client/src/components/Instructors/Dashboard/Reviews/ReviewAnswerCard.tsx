import { ICourseReviewAnswer } from "@/interfaces/courses";
import Image from "next/image";
import { FC } from "react";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";

interface ReviewAnswerCardProps {
  answer: ICourseReviewAnswer;
  avatar?: string;
}

const ReviewAnswerCard: FC<ReviewAnswerCardProps> = ({ answer, avatar }) => (
  <div className="py-3 flex items-center justify-between border-b border-b-border-1">
    <div className="flex items-center gap-3">
      {avatar && (
        <div className="w-14 h-14 rounded-full overflow-hidden">
          <Image
            src={avatar}
            alt=""
            width={96}
            height={96}
            className="w-full h-full aspect-square object-cover"
          />
        </div>
      )}

      <div>
        <span className="block mb-2 text-icon text-sm-regular">
          {new Date(answer.updatedAt).toLocaleDateString()}
        </span>
        <p className="text-head text-base-regular leading-none">{answer.text}</p>
      </div>
    </div>

    <div className="flex items-center gap-5 text-icon">
      <button className="hover:text-color-1 duration-300">
        <HiOutlinePencilAlt size={20} />
      </button>

      <button className="hover:text-color-1 duration-300">
        <HiOutlineTrash size={20} />
      </button>
    </div>
  </div>
);

export default ReviewAnswerCard;
