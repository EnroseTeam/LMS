import { FC, useState } from "react";

import { BsChevronDown } from "react-icons/bs";

interface Item {
  content?: JSX.Element | string;
  count?: number;
}

interface RadioButtonFilterProps {
  title: string;
  items?: Item[];
}

const RadioButtonFilter: FC<RadioButtonFilterProps> = ({
  title,
  items = [],
}) => {
  const [show, setShow] = useState(true);
  const [displayItems, setDisplayItems] = useState(items.slice(0, 5));

  return (
    <div>
      <button
        onClick={(): void => setShow(!show)}
        className="flex w-full justify-between items-center text-head font-medium leading-[23px] text-[20px]"
      >
        {title}
        <BsChevronDown
          size={15}
          className={`${show ? "rotate-[-180deg]" : "rotate-0"} duration-300`}
        />
      </button>
      <div
        className={`${
          show
            ? "max-h-[1000px] opacity-100 py-[30px]"
            : "max-h-0 opacity-0 pointer-events-none"
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
                id={`button-${index}`}
                className="w-[15px] h-[15px] border-2 border-2-icon text-black"
                name="default-radio"
              />
              <label
                htmlFor={`button-${index}`}
                className="select-none w-[20ch]"
              >
                {item.content}
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
            {displayItems.length > 5 ? "Show Less" : "Show More"}
          </button>
        )}
      </div>
    </div>
  );
};
export default RadioButtonFilter;
