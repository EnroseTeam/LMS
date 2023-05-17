import Link from "next/link";
import React, { FC } from "react";

const InstructorFooter: FC = () => (
  <footer className="my-[30px] px-10 flex items-center justify-between text-text text-xs-regular">
    <p>© 2023 IntelliSense. Бүх эрх хуулиар хамгаалагдсан.</p>
    <div className="flex items-center gap-5">
      <Link className="hover:text-icon duration-300" href={"/"}>
        Тусламж
      </Link>
      <Link className="hover:text-icon duration-300" href={"/"}>
        Дотоод журам
      </Link>
      <Link className="hover:text-icon duration-300" href={"/"}>
        Үйлчилгээний нөхцөл
      </Link>
      <Link className="hover:text-icon duration-300" href={"/"}>
        Холбоо барих
      </Link>
    </div>
  </footer>
);

export default InstructorFooter;
