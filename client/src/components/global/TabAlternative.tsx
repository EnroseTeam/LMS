import { useRouter } from "next/router";
import { FC, useState } from "react";
import { TabHeaderItem } from "./Tab";

interface TabAlternativeProps {
  tabHeaders: TabHeaderItem[];
  tabContents: JSX.Element[];
}

const TabAlternative: FC<TabAlternativeProps> = ({
  tabHeaders,
  tabContents,
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>(
    (router.query.activeTab as string) || tabHeaders[0].slug
  );

  return (
    <div id="tab-alternative" className="w-full grid grid-cols-3 scroll-mt-32">
      <div className="flex flex-col items-start text-head text-xl-medium">
        {tabHeaders.map((tab, index) => (
          <button
            key={`single-course-tab-${index}`}
            onClick={(): void => {
              router.push({
                query: { ...router.query, activeTab: tab.slug },
                hash: "tab-alternative",
              });
              setActiveTab(tab.slug);
            }}
            className={`py-4 border-l border-l-border-1 pl-4 hover:text-color-1 duration-300 ${
              activeTab === tab.slug
                ? "border-l-2 border-l-color-1 text-color-1"
                : ""
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="col-span-2">
        {tabContents.map(
          (tabContent, index) =>
            activeTab === tabHeaders[index].slug && tabContent
        )}
      </div>
    </div>
  );
};

export default TabAlternative;
