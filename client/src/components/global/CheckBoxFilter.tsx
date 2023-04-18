import { ICourseCategory } from '@/interfaces/courses';
import { FC, useState } from 'react';

import { BsChevronDown } from 'react-icons/bs';

interface CheckBoxFilterProps {
  title: string;
  items?: ICourseCategory[];
}

const CheckBoxFilter: FC<CheckBoxFilterProps> = ({ title, items = [] }) => {
  const [show, setShow] = useState(true);
  const [displayItems, setDisplayItems] = useState(items.slice(0, 5));

  return (
    <div>
      <button
        onClick={(): void => setShow(!show)}
        className="text-head font-medium leading-[23px] text-[20px] flex justify-between w-full items-center"
      >
        {title}
        <BsChevronDown
          className={`duration-300 ${show ? 'rotate-[-180deg]' : 'rotate-0'} `}
          size={15}
        />
      </button>
      <div
        className={`${
          show
            ? 'max-h-[1000px] opacity-100 py-[30px]'
            : 'max-h-0 opacity-0 pointer-events-none'
        } z-[10] duration-150 border-b`}
      >
        {displayItems.map((item) => (
          <div
            key={item._id}
            className="w-full flex items-center justify-between text-color-2 py-[5px] text-sm-regular"
          >
            <div className="flex items-center gap-[15px]">
              <input
                type="checkbox"
                id={item.name}
                className="w-[15px] h-[15px] border-2 border-2-icon rounded-none text-black"
              />
              <label className="w-[20ch] select-none" htmlFor={item.name}>
                {item.name}
              </label>
            </div>
            <div className="text-text select-none">({item.courseCount})</div>
          </div>
        ))}
        {items.length > 5 && (
          <button
            className="text-sm-medium text-color-1 underline mt-[22px]"
            onClick={() =>
              displayItems.length > 5
                ? setDisplayItems(items.slice(0, 5))
                : setDisplayItems(items)
            }
          >
            {displayItems.length > 5 ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckBoxFilter;
