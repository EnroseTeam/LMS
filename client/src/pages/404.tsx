import { FC } from "react";
import Image from "next/image";

import errorImg from "@/assets/404.svg";

const NotFoundPage: FC = () => (
  <div className="bg-[#fefbf4] py-[120px]">
    <div className="container px-[100px] grid grid-cols-1 lg:grid-cols-2 gap-[140px]">
      <div>
        <Image
          src={errorImg}
          alt="404 Error"
          width={630}
          height={480}
          className="aspect-[1.31/1]"
        />
      </div>
      <div className="flex flex-col items-center lg:block">
        <h1 className="text-[200px] font-bold text-color-2 leading-[234px]">
          40<span className="text-color-1">4</span>
        </h1>
        <h3 className="text-color-2 text-[35px] font-bold leading-[41px] whitespace-nowrap mb-[9px]">
          Oops! It looks like youre lost.
        </h3>
        <p className="text-text text-base-regular leading-[26px] mb-[20px]">
          The page youre looking for isnt available. Try to search again or use
          the go to.
        </p>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
