import { FC, useState } from "react";
import Image from "next/image";

import RatingStar from "@/components/global/RatingStar";
import { BsFlag } from "react-icons/bs";
import classNames from "classnames";
import { ICourseReview, ICourseReviewAnswer } from "@/interfaces/courses";
import ReviewAnswerCard from "./ReviewAnswerCard";
import { axiosInstance } from "@/utils/axiosInstance";
import { toast } from "react-toastify";

interface InstructorReviewCardProps {
  review: ICourseReview;
  avatar?: string;
}

const InstructorReviewCard: FC<InstructorReviewCardProps> = ({ review, avatar }) => {
  const [answers, setAnswers] = useState<ICourseReviewAnswer[]>(review.answer);
  const [showReply, setShowReply] = useState<boolean>(false);

  const [text, setText] = useState<string>("");
  const [isTextExist, setIsTextExist] = useState<boolean>(true);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const submitAnswer = async (): Promise<void> => {
    if (!isSubmitting) {
      try {
        setIsSubmitting(true);
        if (!text) {
          setIsTextExist(false);
          return;
        }

        const res = await axiosInstance.post<{ message: string; body: ICourseReviewAnswer }>(
          "/api/courses/reviews/answers",
          {
            text,
            review: review._id,
          }
        );

        setAnswers([...answers, res.data.body]);
        toast.success(res.data.message);
        setShowReply(false);
      } catch (error) {
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div>
      <div className="flex gap-5 pb-[30px] border-b">
        <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
          <Image
            src={review.user.avatar}
            alt={review.user.fullName}
            className="w-full h-full object-cover"
            width={120}
            height={120}
          />
        </div>
        <div className="flex-1 flex-col">
          <div className="flex justify-between items-center mb-[10px]">
            <div className="flex gap-[5px] items-center">
              <h2 className="text-lg-medium text-head">{review.user.fullName}</h2>
              <span className="text-xs-regular">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            <BsFlag className="text-icon" />
          </div>
          <div className="flex items-center gap-2">
            <RatingStar rating={review.rating} gap={4} size={15} />
            <span className="text-sm-medium text-[#E59819]">{review.rating}</span>
          </div>
          <p className="text-md-medium text-head mt-[15px] mb-[9px]">{review.title}</p>
          <p className="text-md-regular text-text mb-5">{review.text}</p>

          {answers.length !== 0 && (
            <div className="mb-5 ml-5">
              <h5 className="text-head text-md-medium pb-3">Хариултууд</h5>
              <div className="flex flex-col gap-4">
                {answers.map((answer) => (
                  <ReviewAnswerCard key={answer._id} answer={answer} avatar={avatar} />
                ))}
              </div>
            </div>
          )}

          <button
            onClick={(): void => setShowReply(!showReply)}
            className={`bg-bg-2 text-xs-medium text-color-1 rounded-lg py-2 px-[17px] mb-2 hover:bg-color-1 hover:text-white duration-300`}
          >
            {showReply ? "Болих" : "Хариулах"}
          </button>
          <form
            onSubmit={(e): void => {
              e.preventDefault();
              submitAnswer();
            }}
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
                value={text}
                onChange={(e): void => {
                  setText(e.target.value);
                  setIsTextExist(true);
                }}
                className={classNames(
                  "appearance-none border rounded-lg w-full py-[15px] px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-color-1 resize-none",
                  { "ring-2 ring-red-500": !isTextExist }
                )}
                id="message"
                rows={10}
              />
              {!isTextExist && (
                <p className="text-md-medium text-red-500 mb-4 -mt-2">Текст заавал шаардлагатай.</p>
              )}
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className="bg-bg-2 text-xs-medium text-color-1 rounded-lg py-2 px-[17px] hover:bg-color-1 hover:text-white duration-300 disabled:pointer-events-none disabled:bg-gray-200 "
            >
              Илгээх
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default InstructorReviewCard;
