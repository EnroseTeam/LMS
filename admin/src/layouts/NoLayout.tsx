import React, { FC, ReactNode } from "react";

interface NoLayoutProps {
  children: ReactNode;
}

const NoLayout: FC<NoLayoutProps> = ({ children }) => <>{children}</>;

export default NoLayout;
