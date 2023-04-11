import Link from 'next/link';
import { FC } from 'react';

interface BreadcrumbItem {
  title: string;
  link: string;
}

interface BreadcrumbsProps {
  transparent?: boolean;
  breadcrumbItems?: BreadcrumbItem[];
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ breadcrumbItems, transparent }) => (
  <div className={`py-4 text-xs-regular mb-[90px] ${transparent ? 'bg-transparent' : 'bg-bg-3'}`}>
    <div
      className={`container flex items-center gap-[10px] ${
        transparent ? 'text-icon' : 'text-text'
      }`}
    >
      <Link href="/">Нүүр хуудас</Link>
      <div className={`w-1 h-1 rounded-full ${transparent ? 'bg-icon' : 'bg-text'}`} />

      {breadcrumbItems?.map((item, index) => (
        <>
          <Link
            key={`breadcrumb-item-${index}`}
            className={`${
              index === breadcrumbItems.length - 1
                ? `${transparent ? 'text-white' : 'text-head'} pointer-events-none`
                : ''
            }`}
            href={item.link}
          >
            {item.title}
          </Link>
          {index !== breadcrumbItems.length - 1 && (
            <div className={`w-1 h-1 rounded-full ${transparent ? 'bg-icon' : 'bg-text'}`} />
          )}
        </>
      ))}
    </div>
  </div>
);

export default Breadcrumbs;
