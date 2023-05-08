import { Roboto } from "next/font/google";
import { FC, ReactNode } from "react";

interface NoLayoutProps {
  children: ReactNode;
}

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin", "cyrillic"],
});

const NoLayout: FC<NoLayoutProps> = ({ children }) => (
  <div className={roboto.className}>{children}</div>
);

export default NoLayout;
