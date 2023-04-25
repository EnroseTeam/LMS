import Link from "next/link";
import { FC } from "react";

const FooterAlternate: FC = () => (
  <footer className="border-t border-t-border-1 py-12">
    <div className="container flex items-center justify-between">
      <p className="text-text text-xs-regular">© 2023 IntelliSense. All Right Reserved.</p>
      <ul className="flex items-center gap-[10px] text-text text-xs-regular">
        <li>
          <Link className="hover:text-text/70 duration-300" href="/">
            Help
          </Link>
        </li>
        <li>
          <Link className="hover:text-text/70 duration-300" href="/">
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link className="hover:text-text/70 duration-300" href="/">
            Cookie Notice
          </Link>
        </li>
        <li>
          <Link className="hover:text-text/70 duration-300" href="/">
            Security
          </Link>
        </li>
        <li>
          <Link className="hover:text-text/70 duration-300" href="/">
            Terms of Use
          </Link>
        </li>
      </ul>
    </div>
  </footer>
);

export default FooterAlternate;
