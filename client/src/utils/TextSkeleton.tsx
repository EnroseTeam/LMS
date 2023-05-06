import { FC } from "react";

const TextSkeleton: FC = () => (
  <div role="status" className="space-y-2.5 animate-pulse max-w-lg">
    <div className="flex items-center w-full space-x-2">
      <div className="h-2.5 bg-gray-200 rounded-full  w-32" />
      <div className="h-2.5 bg-gray-300 rounded-full  w-24" />
      <div className="h-2.5 bg-gray-300 rounded-full  w-full" />
    </div>
    <div className="flex items-center w-full space-x-2 max-w-[480px]">
      <div className="h-2.5 bg-gray-200 rounded-full  w-full" />
      <div className="h-2.5 bg-gray-300 rounded-full  w-full" />
      <div className="h-2.5 bg-gray-300 rounded-full  w-24" />
    </div>
    <div className="flex items-center w-full space-x-2 max-w-[400px]">
      <div className="h-2.5 bg-gray-300 rounded-full  w-full" />
      <div className="h-2.5 bg-gray-200 rounded-full  w-80" />
      <div className="h-2.5 bg-gray-300 rounded-full  w-full" />
    </div>
    <div className="flex items-center w-full space-x-2 max-w-[480px]">
      <div className="h-2.5 bg-gray-200 rounded-full  w-full" />
      <div className="h-2.5 bg-gray-300 rounded-full  w-full" />
      <div className="h-2.5 bg-gray-300 rounded-full  w-24" />
    </div>
    <div className="flex items-center w-full space-x-2 max-w-[440px]">
      <div className="h-2.5 bg-gray-300 rounded-full  w-32" />
      <div className="h-2.5 bg-gray-300 rounded-full  w-24" />
      <div className="h-2.5 bg-gray-200 rounded-full  w-full" />
    </div>
    <div className="flex items-center w-full space-x-2 max-w-[360px]">
      <div className="h-2.5 bg-gray-300 rounded-full  w-full" />
      <div className="h-2.5 bg-gray-200 rounded-full  w-80" />
      <div className="h-2.5 bg-gray-300 rounded-full  w-full" />
    </div>
    <span className="sr-only">Loading...</span>
  </div>
);

export default TextSkeleton;
