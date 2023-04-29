import SearchCard from "@/components/Search/SearchCard";
import Breadcrumbs from "@/components/global/Breadcrumbs";
import Pagination from "@/components/global/Pagination";
import { FC } from "react";

const SearchPage: FC = () => (
  <>
    <Breadcrumbs breadcrumbItems={[{ title: "Хайлт", link: "/search" }]} />
    <div className="container">
      <h1 className="text-center text-head font-[700] text-[40px] leading-[47px] mb-1">
        Хайлтын үр дүн
      </h1>
      <p className="text-center text-lg-regular text-text mb-[100px]">
        We’re on a mission to deliver engaging, curated courses at a reasonable
        price.
      </p>
      <div className="grid grid-cols-3 gap-[30px] mb-[60px]">
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
      </div>
      <div className="mb-[178px]">
        <Pagination totalPage={1} />
      </div>
    </div>
  </>
);

export default SearchPage;
