import { FC } from "react";

const DashboardBoxSkeleton: FC = () => (
  <div className="bg-white animate-pulse rounded-2xl shadow-shadow-dashboard py-[35px] px-[30px] flex items-center justify-between">
    <div className="space-y-[14px] h-10 flex-1">
      <h4 className="bg-gray-300 h-2 rounded-full w-1/3" />
      <h1 className="bg-gray-300 h-3 rounded-full w-1/2" />
    </div>

    <div className="w-14 h-14 rounded-full bg-gray-300" />
  </div>
);

export default DashboardBoxSkeleton;
