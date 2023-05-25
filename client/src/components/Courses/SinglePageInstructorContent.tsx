import Image from "next/image";
import { FC } from "react";
import RatingStar from "../global/RatingStar";
import { IUser } from "@/interfaces/user";

interface SinglePageInstructorContentProps {
  instuctor: IUser;
}

const SinglePageInstructorContent: FC<SinglePageInstructorContentProps> = ({ instuctor }) => (
  <div className="flex flex-col gap-[30px]">
    <h1 className="text-head text-xl font-medium leading-[23px]">Багш</h1>
    <div className="flex flex-col smallest:flex-row items-start smallest:items-center gap-5">
      <div className="w-[120px] h-[120px] rounded-full overflow-hidden">
        <Image
          alt={instuctor.fullName}
          src={instuctor.avatar}
          width={120}
          height={120}
          className="object-cover w-full aspect-square"
        />
      </div>
      <div className="smallest:flex-1">
        <h2 className="text-head text-lg-medium mb-[5px]">{instuctor.fullName}</h2>
        <p className="text-text text-md-regular mb-[11px]">{instuctor.title}</p>
        <div className="flex items-center gap-5 text-text text-xs-regular">
          <span className="flex items-center gap-[5px]">
            <RatingStar count={1} rating={1} />
            <span className="text-[#E59819] text-sm-medium">{instuctor.avgRating.toFixed(1)}</span>
            <span>Дундаж үнэлгээ</span>
          </span>
          <span>{instuctor.reviewCount} сэтгэгдэл</span>
          <span>{instuctor.studentCount} сурагчид</span>
          <span>{instuctor.ownPublishedCourses.length} сургалт</span>
        </div>
      </div>
    </div>
    <p className="text-text text-md-regular">{instuctor.bio}</p>
  </div>
);

export default SinglePageInstructorContent;
