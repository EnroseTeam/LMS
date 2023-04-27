import { useRouter } from "next/router";
import { FC, useState } from "react";
import RatingStar from "../global/RatingStar";

const ReviewForm: FC = () => {
  const router = useRouter();
  const [rating, setRating] = useState<number>(5);

  return (
    <form className="text-head mb-[119px] flex flex-col gap-[30px]">
      <h1 className="text-xl font-medium leading-[23px]">Сэтгэгдэл бичих</h1>

      <div>
        <label
          htmlFor="rating"
          className="mb-[9px] inline-block text-base-medium"
        >
          Үнэлгээ
        </label>
        <div className="flex items-center gap-4">
          <RatingStar count={5} rating={rating} gap={5} size={16} />
          <input
            value={rating}
            min={0}
            max={5}
            step={0.5}
            onChange={(e): void => {
              setRating(Number(e.target.value));
            }}
            type="number"
            className=" py-[5px] px-[10px] border border-border-2 rounded-lg text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1 duration-150 w-[100px]"
            id="rating"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="title"
          className="mb-[9px] inline-block text-base-medium"
        >
          Гарчиг
        </label>
        <input
          type="text"
          id="title"
          className="w-full py-[14px] px-[22px] border border-border-2 rounded-lg text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1 duration-150"
          placeholder="Сэтгэгдлийн гарчиг"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="mb-[9px] inline-block text-base-medium"
        >
          Тайлбар
        </label>
        <textarea
          rows={10}
          placeholder="Сэтгэгдлийн тайлбар"
          className="w-full resize-none py-[14px] px-[22px] border border-border-2 rounded-lg text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1 duration-150"
        />
      </div>

      <button type="submit" className="btn-1 self-start">
        Сэтгэгдэл нэмэх
      </button>
    </form>
  );
};

export default ReviewForm;
