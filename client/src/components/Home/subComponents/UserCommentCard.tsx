import { FC } from "react";
import Image from "next/image";

import { ICourseReview } from "@/interfaces/courses";

interface UserCommentCardProps {
  testimonial: ICourseReview;
}

const UserCommentCard: FC<UserCommentCardProps> = ({ testimonial }) => (
  <div className="bg-white rounded-lg overflow-hidden p-[30px] pb-[20px]">
    <h1 className="text-color-1 text-xl-medium mb-[14px]">{testimonial.title}</h1>
    <p className="text-head text-md-medium leading-[30px] mb-[26px]">{testimonial.text}</p>

    <div className="flex items-center gap-5 border-t border-t-border-1 pt-5">
      <div className="w-[60px] h-[60px] rounded-full overflow-hidden">
        <Image
          src={testimonial.user.avatar}
          alt={testimonial.user.fullName}
          width={120}
          height={120}
          className="w-full h-full object-cover aspect-square"
        />
      </div>
      <div>
        <h1 className="text-head text-md-medium mb-1">{testimonial.user.fullName}</h1>
        <p className="text-text text-xs-regular">Сурагч</p>
      </div>
    </div>
  </div>
);

export default UserCommentCard;
