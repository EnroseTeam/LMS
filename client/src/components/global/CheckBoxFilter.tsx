import { ICheckBoxFilterItem } from "@/interfaces/components";
import { useRouter } from "next/router";
import { FC, useState, useEffect } from "react";

import { BsChevronDown } from "react-icons/bs";

interface CheckBoxFilterProps {
  title: {
    name: string;
    slug: string;
  };
  items?: ICheckBoxFilterItem[];
}

const CheckBoxFilter: FC<CheckBoxFilterProps> = ({ title, items = [] }) => {
  const [show, setShow] = useState(true);
  const [displayItems, setDisplayItems] = useState(items.slice(0, 5));
  const router = useRouter();

  const [checkedItems, setCheckedItems] = useState<string[]>(
    router.query[title.slug.toLowerCase()] !== undefined
      ? (router.query[title.slug.toLowerCase()] as string).split(",")
      : []
  );

  useEffect(() => {
    if (checkedItems.length > 0) {
      router.push({
        query: {
          ...router.query,
          [title.slug.toLowerCase()]: checkedItems.join(","),
        },
      });
    } else {
      delete router.query[title.slug.toLowerCase()];
      router.push({
        query: router.query,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedItems]);

  return (
    <div>
      <button
        onClick={(): void => setShow(!show)}
        className="text-head font-medium leading-[23px] text-[20px] flex justify-between w-full items-center"
      >
        {title.name}
        <BsChevronDown
          className={`duration-300 ${show ? "rotate-[-180deg]" : "rotate-0"} `}
          size={15}
        />
      </button>
      <div
        className={`${
          show
            ? "max-h-[1000px] opacity-100 py-[30px]"
            : "max-h-0 opacity-0 pointer-events-none"
        } z-[10] duration-150 border-b`}
      >
        {displayItems.map((item, index) => (
          <div
            key={`checkbox-filter-${index}`}
            className="w-full flex items-center justify-between text-color-2 py-[5px] text-sm-regular"
          >
            <div className="flex items-center gap-[15px]">
              <input
                checked={checkedItems.includes(item.slug)}
                type="checkbox"
                id={item.title}
                onChange={(e): void => {
                  if (e.target.checked)
                    setCheckedItems([...checkedItems, item.slug]);
                  else
                    setCheckedItems(
                      checkedItems.filter((checked) => checked !== item.slug)
                    );
                }}
                className="w-[15px] h-[15px] border-2 border-2-icon rounded-none text-black"
              />
              <label className="w-[20ch] select-none" htmlFor={item.title}>
                {item.title}
              </label>
            </div>
            <div className="text-text select-none">({item.count})</div>
          </div>
        ))}
        {items.length > 5 && (
          <button
            className="text-sm-medium text-color-1 underline mt-[22px]"
            onClick={(): void =>
              displayItems.length > 5
                ? setDisplayItems(items.slice(0, 5))
                : setDisplayItems(items)
            }
          >
            {displayItems.length > 5 ? "Хураангуй" : "Дэлгэрэнгүй"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckBoxFilter;
