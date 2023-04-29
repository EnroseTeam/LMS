import { FC } from "react";
import Image from "next/image";
import placeholder from "../../assets/placeholder.png";

const SearchCard: FC = () => (
  <div className="flex flex-col">
    <div className="w-full rounded-lg overflow-hidden mb-5">
      <Image
        src={placeholder}
        alt=""
        className="w-full aspect-auto object-cover"
      />
    </div>
    <span className="text-sm-medium text-color-1 mb-[10px]">EDUCATION</span>
    <h3 className="text-[#242239] font-[500] leading-[35px] text-[20px] mb-2">
      Engendering a culture of professional development
    </h3>
    <span className="text-text text-md-regular">April 29, 2023</span>
  </div>
);

export default SearchCard;
