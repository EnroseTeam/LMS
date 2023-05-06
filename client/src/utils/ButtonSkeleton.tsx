import { FC } from "react";

const ButtonSkeleton: FC = () => (
  <div role="status" className="space-y-2.5 animate-pulse max-w-full">
    <div className="w-full flex items-center gap-5">
      <div className="bg-gray-700 w-1/2 rounded-lg h-16" />
      <div className="bg-gray-700 w-1/2 rounded-lg h-16" />
    </div>
    <span className="sr-only">Loading...</span>
  </div>
);

export default ButtonSkeleton;
