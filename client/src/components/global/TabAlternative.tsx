import { FC, useState } from "react";
import { TabHeaderItem } from "./Tab";
import classNames from "classnames";

interface TabAlternativeProps {
  tabHeaders: TabHeaderItem[];
  tabContents: JSX.Element[];
}

const TabAlternative: FC<TabAlternativeProps> = ({ tabHeaders, tabContents }) => {
  const [activeTab, setActiveTab] = useState<string>(tabHeaders[0].slug);

  return (
    <div className="w-full grid grid-cols-3">
      <div className="flex flex-col items-start text-head text-xl-medium">
        {tabHeaders.map((tab, index) => (
          <button
            key={`single-course-tab-${index}`}
            onClick={(): void => {
              setActiveTab(tab.slug);
            }}
            className={classNames(
              "py-4 border-l-2 border-l-border-1 pl-4 hover:text-color-1 duration-300",
              { "border-l-2 border-l-color-1 text-color-1": activeTab === tab.slug }
            )}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="col-span-2">
        {tabContents.map((tabContent, index) => (
          <div
            key={`tab-alternative-content-${index}`}
            className={classNames(
              { block: activeTab === tabHeaders[index].slug },
              { hidden: activeTab !== tabHeaders[index].slug }
            )}
          >
            {tabContent}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabAlternative;
