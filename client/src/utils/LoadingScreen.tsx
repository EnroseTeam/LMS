import React, { FC } from "react";

const LoadingScreen: FC = () => (
  <div className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 grid place-items-center bg-white z-[9999]">
    <div className="lds-facebook">
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default LoadingScreen;
