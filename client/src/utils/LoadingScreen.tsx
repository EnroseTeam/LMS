import { FC } from "react";
import classNames from "classnames";

interface LoadingScreenProps {
  state: boolean;
}

const LoadingScreen: FC<LoadingScreenProps> = ({ state }) => (
  <div
    className={classNames(
      "min-w-screen min-h-screen fixed top-0 left-0 right-0 bottom-0 grid place-items-center bg-white z-[9999]",
      { block: state },
      { hidden: !state }
    )}
  >
    <div className="lds-facebook">
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default LoadingScreen;
