import { ICourseReviewAnswer } from "@/interfaces/courses";
import Image from "next/image";
import React, { FC } from "react";

interface ReviewAnswerCardProps {
  answer: ICourseReviewAnswer;
}

const ReviewAnswerCard: FC<ReviewAnswerCardProps> = ({ answer }) => (
  <div className="flex items-center gap-3 pb-2 border-b border-b-border-1 w-full">
    <div className="w-14 h-14 rounded-full overflow-hidden">
      <Image
        src={answer.instructor.avatar}
        alt={answer.instructor.fullName}
        width={112}
        height={112}
        className="w-full h-full aspect-square object-cover"
      />
    </div>

    <div className="flex-1">
      <div className="flex items-center gap-3 mb-1">
        <span className="text-head text-base-medium">{answer.instructor.fullName}</span>
        <span className="text-icon text-sm-regular">
          {new Date(answer.updatedAt).toLocaleDateString()}
        </span>
      </div>
      <p className="text-head text-md-regular">{answer.text}</p>
    </div>
  </div>
);

export default ReviewAnswerCard;
