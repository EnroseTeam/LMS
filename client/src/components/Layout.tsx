import React, { FC } from 'react';
import Header from './Header';
import { Roboto } from 'next/font/google';

interface LayoutProps {
  children: JSX.Element;
}

const roboto = Roboto({ weight: ['100', '300', '400', '500', '700', '900'], subsets: ['latin'] });

const Layout: FC<LayoutProps> = ({ children }) => (
  <div className={roboto.className}>
    <Header />
    <main>{children}</main>
  </div>
);

export default Layout;
