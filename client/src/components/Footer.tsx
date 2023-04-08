import { FC } from "react";
import { ImFacebook, ImTwitter, ImLinkedin2 } from "react-icons/im";
import { BsInstagram } from "react-icons/bs";
import Link from "next/link";

export const Footer: FC = () => (
  <div className="bg-[#140342]">
    <div className="max-w-[1290px] mx-auto">
      <div className="py-[60px] text-white flex justify-between border-b-yellow-200">
        <div className="grid grid-cols-8">LOGO</div>
        <div>
          <ul className="flex grid-cols-4 justify-between gap-4">
            <li>Follow Us On Social Media</li>
            <li>
              <Link href="/">
                <ImFacebook />
              </Link>
            </li>
            <li>
              <Link href="/">
                <ImTwitter />
              </Link>
            </li>
            <li>
              <Link href="/">
                <BsInstagram />
              </Link>
            </li>
            <li>
              <Link href="/">
                <ImLinkedin2 />
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="py-60">2</div>
      <div className="py-48">3</div>
    </div>
  </div>
);
