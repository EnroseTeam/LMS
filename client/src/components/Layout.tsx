import React, { FC } from 'react';
import Header from './Header';
import { Roboto } from 'next/font/google';
import { Footer } from './Footer';
import { ICourseCategory } from '@/interfaces/courses';

interface LayoutProps {
  children: JSX.Element;
  props: {
    categories: ICourseCategory[];
  };
}

const roboto = Roboto({ weight: ['100', '300', '400', '500', '700', '900'], subsets: ['latin'] });

const Layout: FC<LayoutProps> = ({ children, props }) => (
  <div className={roboto.className}>
    <Header />
    <main>{children}</main>
    <Footer categories={props.categories} />
  </div>
);

export default Layout;
