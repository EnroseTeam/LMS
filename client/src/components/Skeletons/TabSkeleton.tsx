import { FC } from "react";

const TabSkeleton: FC = () => (
  <div className="w-full animate-pulse">
    <div className="mb-[30px] relative">
      <div className="w-full text-text text-md-medium flex items-center gap-[30px]">
        <div className="pb-3 border-b-2 z-[2] rounded-full w-28 h-1 bg-gray-200" />
        <div className="pb-3 border-b-2 z-[2] rounded-full w-28 h-1 bg-gray-200" />
        <div className="pb-3 border-b-2 z-[2] rounded-full w-28 h-1 bg-gray-200" />
        <div className="pb-3 border-b-2 z-[2] rounded-full w-28 h-1 bg-gray-200" />
      </div>
      <div className="absolute -bottom-3 w-full h-[2px] bg-border-1 z-[1]" />
    </div>
    <div className="w-full h-2 rounded-full bg-gray-200 mb-2" />
    <div className="w-2/3 h-2 rounded-full bg-gray-200 mb-2" />
    <div className="w-1/3 h-2 rounded-full bg-gray-200 mb-2" />
    <div className="w-1/2 h-2 rounded-full bg-gray-200 mb-2" />
    <div className="w-1/4 h-2 rounded-full bg-gray-200" />
  </div>
);

export default TabSkeleton;
