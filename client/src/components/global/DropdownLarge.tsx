import Link from "next/link";
import React, { FC } from "react";

const DropdownLarge: FC = () => {
  const links = [
    {
      name: "Explore",
      submenu: true,
      sublinks: [
        {
          Head: "Courses",
          sublinks: [
            { name: "Menu1", link: "/" },
            { name: "Menu2", link: "/" },
            { name: "Menu3", link: "/" },
            { name: "Menu4", link: "/" },
            { name: "Menu5", link: "/" },
          ],
        },
        {
          Head: "Courses2",
          sublinks: [
            { name: "Menu1", link: "/" },
            { name: "Menu2", link: "/" },
            { name: "Menu3", link: "/" },
            { name: "Menu4", link: "/" },
            { name: "Menu5", link: "/" },
          ],
        },
        {
          Head: "Courses2",
          sublinks: [
            { name: "Menu1", link: "/" },
            { name: "Menu2", link: "/" },
            { name: "Menu3", link: "/" },
            { name: "Menu4", link: "/" },
            { name: "Menu5", link: "/" },
          ],
        },
        {
          Head: "Courses2",
          sublinks: [
            { name: "Menu1", link: "/" },
            { name: "Menu2", link: "/" },
            { name: "Menu3", link: "/" },
            { name: "Menu4", link: "/" },
            { name: "Menu5", link: "/" },
          ],
        },
      ],
    },
  ];

  return (
    <>
      <div className="flex items-center gap-10 text-md-regular cursor-pointer ">
        {links.map((link, index) => (
          <div key={`dropdown-${index}`}>
            <div className=" px-3 text-left group">
              <h1 className="hover:text-color-6">{link.name}</h1>
              {link.submenu && (
                <div>
                  <div className="absolute top-15 hidden group-hover:block hover:block">
                    <div className="py-3">
                      <div className="w-4 h-4 left-3 absolute mt-1 bg-white rotate-45" />
                    </div>
                    <div className="w-[800px] h-[430px] bg-white text-head p-3.5 grid grid-cols-4 gap-5">
                      {link.sublinks.map((mysublinks) => (
                        <div key={`dropdown-${index}`}>
                          <h1 className="hover:text-white/70 duration-300">
                            {mysublinks.Head}
                          </h1>
                          {mysublinks.sublinks.map((slink, index) => (
                            <li
                              className="hover:text-white/70 duration-300"
                              key={`mysublinks-${index}`}
                            >
                              <Link
                                href={slink.link}
                                className="hover:text-color-6"
                              >
                                {slink.name}
                              </Link>
                            </li>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DropdownLarge;
