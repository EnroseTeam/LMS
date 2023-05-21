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
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-0">
      <div className="flex flex-row lg:flex-col items-center lg:items-start text-head text-xl-medium col-span-1 overflow-x-auto lg:overflow-x-hidden">
        {tabHeaders.map((tab, index) => (
          <button
            key={`single-course-tab-${index}`}
            onClick={(): void => {
              setActiveTab(tab.slug);
            }}
            className={classNames(
              "py-4 border-b-2 border-b-border-1 lg:border-b-0 lg:border-l lg:border-l-border-1 pr-3 pl-3 lg:pl-4 lg:pr-0 hover:text-color-1 duration-300 whitespace-nowrap",
              {
                "border-b-2 border-b-color-1 lg:border-l-2 lg:border-l-color-1 text-color-1":
                  activeTab === tab.slug,
              }
            )}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="col-span-1 lg:col-span-2">
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
