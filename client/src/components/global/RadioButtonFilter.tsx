import { IRadioButtonFilterItem } from "@/interfaces/components";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import { BsChevronDown } from "react-icons/bs";

interface RadioButtonFilterProps {
  title: {
    name: string;
    slug: string;
  };
  items?: IRadioButtonFilterItem[];
}

const RadioButtonFilter: FC<RadioButtonFilterProps> = ({ title, items = [] }) => {
  const router = useRouter();

  const [show, setShow] = useState(true);
  const [displayItems, setDisplayItems] = useState(items.slice(0, 5));

  const [selected, setSelected] = useState<string>(
    router.query[title.slug.toLowerCase()] !== undefined
      ? (router.query[title.slug.toLowerCase()] as string)
      : ""
  );

  useEffect(() => {
    if (selected) {
      router.push({
        query: { ...router.query, [title.slug.toLowerCase()]: selected },
      });
    } else {
      delete router.query[title.slug.toLowerCase()];
      router.push({ query: router.query });
    }
  }, [selected]);

  return (
    <div>
      <button
        onClick={(): void => setShow(!show)}
        className="flex w-full justify-between items-center text-head font-medium leading-[23px] text-[20px]"
      >
        {title.name}
        <BsChevronDown
          size={15}
          className={`${show ? "rotate-[-180deg]" : "rotate-0"} duration-300`}
        />
      </button>
      <div
        className={`${
          show ? "max-h-[1000px] opacity-100 py-[30px]" : "max-h-0 opacity-0 pointer-events-none"
        } z-10 border-b duration-150`}
      >
        {displayItems.map((item, index) => (
          <div
            key={`radio-button-${index}`}
            className="text-color-2 py-[5px] text-sm-regular w-full flex justify-between items-center"
          >
            <div className="flex items-center gap-[15px]">
              <input
                type="radio"
                value={item.slug}
                checked={item.slug === selected}
                onChange={(e): void => {
                  setSelected(e.target.value);
                }}
                id={`button-${index}`}
                className="w-[15px] h-[15px] border-2 border-2-icon text-black"
                name={title.slug}
              />
              <label htmlFor={`button-${index}`} className="select-none w-[20ch]">
                {item.content}
              </label>
            </div>
            <div className="text-text select-none">({item.count})</div>
          </div>
        ))}
        <div
          className={`flex items-center ${
            items.length > 5 ? "justify-between" : "justify-end"
          } w-full mt-[22px]`}
        >
          {items.length > 5 && (
            <button
              className="text-sm-medium text-color-1 underline"
              onClick={(): void =>
                displayItems.length > 5
                  ? setDisplayItems(items.slice(0, 5))
                  : setDisplayItems(items)
              }
            >
              {displayItems.length > 5 ? "Хураангуй" : "Дэлгэрэнгүй"}
            </button>
          )}
          <button
            onClick={(): void => {
              setSelected("");
            }}
            className="text-sm-medium text-color-1 underline"
          >
            Цэвэрлэх
          </button>
        </div>
      </div>
    </div>
  );
};
export default RadioButtonFilter;
