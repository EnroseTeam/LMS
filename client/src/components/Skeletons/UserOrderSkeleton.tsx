import React, { FC } from "react";

const UserOrderSkeleton: FC = () => (
  <div className="grid grid-cols-7 gap-5 py-5 animate-pulse items-center">
    <div className="h-2.5 bg-gray-200 rounded-full w-full" />
    <div className="h-2.5 bg-gray-200 rounded-full w-full col-span-2" />
    <div className="h-2.5 bg-gray-200 rounded-full w-full" />

    <div className="h-2.5 bg-gray-200 rounded-full w-full" />

    <div className="h-2.5 bg-gray-200 rounded-full w-full" />

    <div className="h-2.5 bg-gray-200 rounded-full w-full" />
  </div>
);

export default UserOrderSkeleton;
