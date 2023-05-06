import { useRouter } from "next/router";
import { FC, useState } from "react";

export interface TabHeaderItem {
  name: string;
  slug: string;
}

interface TabProps {
  tabHeaders: TabHeaderItem[];
  tabContents: JSX.Element[];
}

const Tab: FC<TabProps> = ({ tabHeaders, tabContents }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>(
    (router.query.activeTab as string) || tabHeaders[0].slug
  );

  return (
    <div id="tab" className="w-full scroll-mt-36">
      <div className="mb-[60px] relative">
        <div className="w-full text-text text-md-medium flex items-center gap-[30px]">
          {tabHeaders.map((header, index) => (
            <button
              onClick={(): void => {
                setActiveTab(header.slug);
                router.push({
                  query: { ...router.query, activeTab: header.slug },
                  hash: "tab",
                });
              }}
              key={`tab-header-${index}`}
              className={`pb-3 border-b-2 hover:text-color-1 duration-300 z-[2] ${
                activeTab === header.slug ? "border-b-color-1 text-color-1" : "border-b-transparent"
              }`}
            >
              {header.name}
            </button>
          ))}
        </div>
        <div className="absolute bottom-0 w-full h-[2px] bg-border-1 z-[1]" />
      </div>
      <div>
        {tabContents.map((tabContent, index) => activeTab === tabHeaders[index].slug && tabContent)}
      </div>
    </div>
  );
};

export default Tab;
