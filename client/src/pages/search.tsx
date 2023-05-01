import SearchCard from "@/components/Search/SearchCard";
import Breadcrumbs from "@/components/global/Breadcrumbs";
import Pagination from "@/components/global/Pagination";
import { FC } from "react";
import { ISearch } from "@/interfaces/search";
import { GetServerSideProps } from "next";
import axios from "axios";

interface SearchPageProps {
  searchItems: ISearch[];
}

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async ({
  query,
}) => {
  const { qAll: search = "" } = query;
  const searchRes = await axios.get(
    `http://localhost:5000/api/search?q=${search}`
  );
  return {
    props: {
      searchItems: searchRes.data.body,
    },
  };
};

const SearchPage: FC<SearchPageProps> = ({ searchItems }) => {
  return (
    <>
      <Breadcrumbs breadcrumbItems={[{ title: "Хайлт", link: "/search" }]} />
      <div className="container">
        <h1 className="text-center text-head font-[700] text-[40px] leading-[47px] mb-1">
          Хайлтын үр дүн
        </h1>
        <p className="text-center text-lg-regular text-text mb-[100px]">
          We’re on a mission to deliver engaging, curated courses at a
          reasonable price.
        </p>
        <div className="grid grid-cols-3 gap-[30px] mb-[60px]">
          {searchItems.map((searchItem) => (
            <SearchCard searchItem={searchItem} key={searchItem._id} />
          ))}
        </div>
        <div className="mb-[178px]">
          <Pagination totalPage={1} />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
