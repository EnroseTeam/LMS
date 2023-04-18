import React, { FC } from 'react';
import { Roboto } from 'next/font/google';

import Header from './Header';
import Footer from './Footer';
import { ICourseCategory } from '@/interfaces/courses';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: JSX.Element;
  props: {
    categories: ICourseCategory[];
  };
}

const roboto = Roboto({ weight: ['100', '300', '400', '500', '700', '900'], subsets: ['latin'] });

const Layout: FC<LayoutProps> = ({ children, props }) => {
  const router = useRouter();

  if (router.pathname.includes('lessons')) {
    return <div className={roboto.className}>{children}</div>;
  }

  return (
    <div className={roboto.className}>
      <Header />
      <main>{children}</main>
      <Footer categories={props.categories} />
    </div>
  );
};

export default Layout;
