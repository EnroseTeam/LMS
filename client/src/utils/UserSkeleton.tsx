import { FC } from "react";

const UserSkeleton: FC = () => (
  <div role="status" className="animate-pulse">
    <div className="h-4 bg-gray-700 rounded-full  w-48" />
    <span className="sr-only">Loading...</span>
  </div>
);

export default UserSkeleton;
