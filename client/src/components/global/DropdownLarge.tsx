import Link from "next/link";
import React, { FC } from "react";

interface SubLinks {
  name: string;
  link: string;
}

interface DropDownLargeItem {
  Head: string;
  sublinks: SubLinks[];
}

interface DropdownLargeProps {
  items: DropDownLargeItem[];
}

const DropdownLarge: FC<DropdownLargeProps> = ({ items }) => (
  <>
    <div>
      <div className="absolute top-15 hidden group-hover:block hover:block w-[1390px] left-[50%] -translate-x-[50%] rounded-lg">
        {/* <div className="py-3">
          <div className="w-4 h-4 left-3 absolute mt-1 bg-white rotate-45" />
        </div> */}
        <ul className="bg-white/95 text-head p-3.5 grid grid-cols-5 gap-10 mt-10">
          {items.map((mysublinks, index) => (
            <div key={`dropdown-${index}`}>
              <h1 className="hover:text-head duration-300 text-left pb-5 uppercase">
                {mysublinks.Head}
              </h1>
              {mysublinks.sublinks.map((slink, index) => (
                <li
                  className="hover:text-head duration-300 text-left pb-3"
                  key={`mysublinks-${index}`}
                >
                  <Link href={slink.link} className="hover:text-head">
                    {slink.name}
                  </Link>
                </li>
              ))}
            </div>
          ))}
        </ul>
      </div>
    </div>
  </>
);

export default DropdownLarge;
