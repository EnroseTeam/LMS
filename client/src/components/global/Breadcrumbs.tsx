import Link from "next/link";
import { FC } from "react";
import classNames from "classnames";

interface BreadcrumbItem {
  title: string;
  link: string;
}

interface BreadcrumbsProps {
  transparent?: boolean;
  breadcrumbItems?: BreadcrumbItem[];
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({ breadcrumbItems, transparent }) => (
  <div className={`py-4 text-xs-regular mb-[90px] ${transparent ? "bg-transparent" : "bg-bg-3"}`}>
    <div
      className={classNames(
        "container flex items-center gap-[10px]",
        { "text-icon": transparent },
        { "text-text": !transparent }
      )}
    >
      <div className="flex items-center gap-[10px]">
        <Link href="/">Нүүр хуудас</Link>
        <div
          className={classNames(
            "w-1 h-1 rounded-full",
            { "bg-icon": transparent },
            { "bg-text": !transparent }
          )}
        />
      </div>

      {breadcrumbItems?.map((item, index) => (
        <div key={`breadcrumb-item-${index}`} className="flex items-center gap-[10px]">
          <Link
            className={`${
              index === breadcrumbItems.length - 1
                ? `${transparent ? "text-white" : "text-head"} pointer-events-none`
                : ""
            }`}
            href={item.link}
          >
            {item.title}
          </Link>
          {index !== breadcrumbItems.length - 1 && (
            <div
              className={classNames(
                "w-1 h-1 rounded-full",
                { "bg-icon": transparent },
                { "bg-text": !transparent }
              )}
            />
          )}
        </div>
      ))}
    </div>
  </div>
);

export default Breadcrumbs;
