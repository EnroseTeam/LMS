import Link from "next/link";
import React, { FC } from "react";

interface SubLinkChild {
  name: string;
  link: string;
}

interface SubLink {
  Head: string;
  sublinks: SubLinkChild[];
}

interface NavbarDroprownProps {
  links: SubLink[];
}

const NavbarDroprown: FC<NavbarDroprownProps> = ({ links }) => (
  <div>
    <div className="absolute top-15 hidden group-hover:block hover:block">
      <div className="py-3">
        <div className="w-4 h-4 left-3 absolute mt-1 bg-white rotate-45" />
      </div>
      <ul className="bg-white text-head p-3.5 grid grid-cols-2 gap-10">
        {links.map((mysublinks, index) => (
          <div key={`dropdown-${index}`}>
            <h1 className="hover:text-white/70 duration-300">{mysublinks.Head}</h1>
            {mysublinks.sublinks.map((slink, index) => (
              <li className="hover:text-white/70 duration-300" key={`mysublinks-${index}`}>
                <Link href={slink.link} className="hover:text-color-6">
                  {slink.name}
                </Link>
              </li>
            ))}
          </div>
        ))}
      </ul>
    </div>
  </div>
);

export default NavbarDroprown;
