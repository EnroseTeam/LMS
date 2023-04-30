import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import RatingStar from "../global/RatingStar";
import { useAuthenticate } from "@/hooks/useAuthenticate";
import Link from "next/link";
import ButtonSkeleton from "@/utils/ButtonSkeleton";
import MessageBox from "../global/MessageBox";
import axios, { isAxiosError } from "axios";

interface ReviewFormProps {
  courseId: string;
}

const ReviewForm: FC<ReviewFormProps> = ({ courseId }) => {
  const router = useRouter();
  const { user, isLoading } = useAuthenticate();
  const [isReady, setIsReady] = useState<boolean>(false);

  const [errorMsg, setErrorMsg] = useState<string>("");

  const [rating, setRating] = useState<number>(5);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [isRatingCorrect, setIsRatingCorrect] = useState<boolean>(true);
  const [isTitleExist, setIsTitleExist] = useState<boolean>(true);

  useEffect(() => {
    if (!isLoading) setIsReady(true);
  }, [isLoading]);

  const formSubmitHandler = async (): Promise<void> => {
    try {
      if (!title || rating > 5 || rating < 0) {
        if (!title) setIsTitleExist(false);
        if (rating > 5 || rating < 0) setIsRatingCorrect(false);
        return;
      }

      await axios.post(
        "http://localhost:5000/api/courses/reviews",
        {
          title,
          text: description,
          rating,
          course: courseId,
        },
        { withCredentials: true }
      );

      router.reload();
    } catch (error) {
      if (isAxiosError(error))
        setErrorMsg(
          error.response?.data.error ||
            "Тодорхойгүй алдаа гарлаа. Дахин оролдоно уу."
        );
      else setErrorMsg("Тодорхойгүй алдаа гарлаа. Дахин оролдоно уу.");
    }
  };

  return (
    <>
      {!isReady && <ButtonSkeleton />}

      {isReady && !user && (
        <div className="mb-[119px]">
          <h1 className="text-head text-lg-medium mb-5">
            Зөвхөн бүртгэлтэй хэрэглэгчид сэтгэгдэл бичих боломжтой.
          </h1>
          <div className="flex items-center gap-5">
            <Link className="btn-1 py-4" href="/auth/login">
              Нэвтрэх
            </Link>
            <Link className="btn-1-outline py-4" href="/auth/register">
              Бүртгүүлэх
            </Link>
          </div>
        </div>
      )}
      {isReady && user && (
        <form
          onSubmit={(e): void => {
            e.preventDefault();
            formSubmitHandler();
          }}
          className="text-head mb-[119px] flex flex-col gap-[30px]"
        >
          <h1 className="text-xl font-medium leading-[23px]">
            Сэтгэгдэл бичих
          </h1>

          {errorMsg && <MessageBox type="Error" message={errorMsg} />}

          <div>
            <label
              htmlFor="rating"
              className="mb-[9px] inline-block text-base-medium"
            >
              Үнэлгээ
            </label>
            <div className="flex items-center gap-4 ">
              <RatingStar count={5} rating={rating} gap={5} size={16} />
              <input
                value={rating}
                min={0}
                max={5}
                step={0.5}
                onChange={(e): void => {
                  if (Number(e.target.value) > 5) setRating(5);
                  else if (Number(e.target.value) < 0) setRating(0);
                  else setRating(Number(e.target.value));
                }}
                type="number"
                className={`py-[5px] px-[10px] border border-border-2 rounded-lg text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1 duration-150 w-[100px] ${
                  !isRatingCorrect ? "ring ring-red-500" : ""
                }`}
                id="rating"
              />
              {!isRatingCorrect && (
                <p className="text-red-500 text-md-medium mt-2">
                  Үнэлгээ 0-5 хооронд байх ёстой.
                </p>
              )}
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
              value={title}
              onChange={(e): void => {
                setTitle(e.target.value);
                setIsTitleExist(true);
              }}
              type="text"
              id="title"
              className={`w-full py-[14px] px-[22px] border border-border-2 rounded-lg text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1 duration-150 ${
                !isTitleExist ? "ring ring-red-500" : ""
              }`}
              placeholder="Сэтгэгдлийн гарчиг"
            />
            {!isTitleExist && (
              <p className="text-red-500 text-md-medium mt-2">
                Гарчиг заавал шаардлагатай.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-[9px] inline-block text-base-medium"
            >
              Тайлбар
            </label>
            <textarea
              value={description}
              onChange={(e): void => {
                setDescription(e.target.value);
              }}
              rows={10}
              placeholder="Сэтгэгдлийн тайлбар"
              className="w-full resize-none py-[14px] px-[22px] border border-border-2 rounded-lg text-md-regular text-text focus:outline-none focus:ring-2 focus:ring-color-1 duration-150"
            />
          </div>

          <button type="submit" className="btn-1 self-start py-4">
            Сэтгэгдэл нэмэх
          </button>
        </form>
      )}
    </>
  );
};

export default ReviewForm;
