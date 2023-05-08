import { FC } from "react";
import classNames from "classnames";

interface LoadingAltScreenProps {
  state: boolean;
}

const LoadingAltScreen: FC<LoadingAltScreenProps> = ({ state }) => (
  <div
    className={classNames(
      "fixed min-w-screen min-h-screen top-0 right-0 left-0 bg-gray-400/60 z-[1000] grid place-items-center",
      { block: state },
      { hidden: !state }
    )}
  >
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default LoadingAltScreen;
