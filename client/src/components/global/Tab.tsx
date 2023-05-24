import { FC, ReactNode, useState } from "react";
import classNames from "classnames";

export interface TabHeaderItem {
  name: string;
  slug: string;
}

interface TabProps {
  tabHeaders: TabHeaderItem[];
  tabContents: ReactNode[];
}

const Tab: FC<TabProps> = ({ tabHeaders, tabContents }) => {
  const [activeTab, setActiveTab] = useState<string>(tabHeaders[0].slug);

  return (
    <div className="w-full">
      <div className="mb-[60px] relative">
        <div className="w-full text-text text-md-medium flex items-center gap-[30px] overflow-x-auto">
          {tabHeaders.map((header, index) => (
            <button
              onClick={(): void => {
                setActiveTab(header.slug);
              }}
              key={`tab-header-${index}`}
              className={classNames(
                "pb-3 border-b-2 hover:text-color-1 duration-300 z-[2]",
                { "border-b-color-1 text-color-1": activeTab === header.slug },
                { "border-b-transparent": activeTab !== header.slug }
              )}
            >
              {header.name}
            </button>
          ))}
        </div>
        <div className="absolute bottom-0 w-full h-[2px] bg-border-1 z-[1]" />
      </div>
      <div className="overflow-x-auto overflow-y-hidden">
        {tabContents.map((tabContent, index) => (
          <div
            key={`tab-content-${index}`}
            className={classNames(
              { block: activeTab === tabHeaders[index].slug },
              { hidden: activeTab !== tabHeaders[index].slug },
              ""
            )}
          >
            {" "}
            {tabContent}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tab;
