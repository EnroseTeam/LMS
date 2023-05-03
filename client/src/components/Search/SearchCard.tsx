import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { ISearch } from "@/interfaces/search";
import Link from "next/link";
interface SearchCardProps {
  searchItem: ISearch;
}

const SearchCard: FC<SearchCardProps> = ({ searchItem }) => {
  const [link, setLink] = useState<string>("");

  useEffect(() => {
    if (searchItem.type === "Instructor")
      setLink(`/instructors/${searchItem._id}`);
    if (searchItem.type === "Course") setLink(`/courses/${searchItem._id}`);
  }, [searchItem]);
  return (
    <div className="flex flex-col">
      <Link href={link}>
        <div className="w-full rounded-lg overflow-hidden mb-5 group relative">
          <Image
            src={searchItem.image}
            alt=""
            width={410}
            height={334}
            className="w-full aspect-[1.2/1] object-cover"
          />
          <div className="absolute w-full h-full top-0 right-0 left-0 bottom-0 bg-head/0 opacity-0 group-hover:bg-head/50 group-hover:opacity-100 duration-300 " />
        </div>
      </Link>
      <span className="text-sm-medium text-color-1 mb-[10px]">
        {searchItem.type === "Instructor" && "Багш"}
        {searchItem.type === "Course" && "Хичээл"}
      </span>
      <Link href={link}>
        <h3 className="text-[#242239] font-[500] leading-[35px] text-[20px] mb-2">
          {searchItem.name}
        </h3>
      </Link>
      <span className="text-text text-md-regular">
        {new Date(searchItem.updatedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </span>
    </div>
  );
};

export default SearchCard;
