import { FC } from "react";
import Button from "../global/Button";

import placeholder from "@/assets/backimg.svg";

const OpenCart: FC = () => (
  <div className="absolute -right-2 top-7">
    <div className="bg-white w-[10px] h-[10px] rotate-45 ml-9" />
    <div className="bg-white rounded-lg shadow-shadow-4 max-content -mt-[6px] text-head">
      <div className="flex flex-col gap-5 px-[30px] pt-[30px] mb-[30px]">
        <div></div>
      </div>
      <div className="pt-[20px] pb-[30px] px-[30px] border-t border-t-border-1">
        <div className="flex items-center justify-between text-xl-medium mb-[30px]">
          <h3>Нийт дүн:</h3>
          <p>₮25,000</p>
        </div>
        <div className="flex items-center justify-between gap-5">
          <Button className="text-white bg-head">Сагс үзэх</Button>
          <Button className="text-white bg-color-1">Худалдаж авах</Button>
        </div>
      </div>
    </div>
  </div>
);

export default OpenCart;
