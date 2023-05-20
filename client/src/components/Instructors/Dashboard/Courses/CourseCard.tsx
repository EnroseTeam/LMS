import RatingStar from "@/components/global/RatingStar";
import { ICourse } from "@/interfaces/courses";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdPublishedWithChanges, MdEdit, MdDelete, MdUnpublished } from "react-icons/md";
import classNames from "classnames";
import { useRouter } from "next/router";
import { axiosInstance } from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

interface CourseCardProps {
  course: ICourse;
}

const CourseCard: FC<CourseCardProps> = ({ course }) => {
  const [dropDownShow, setDropDownShow] = useState<boolean>(false);
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const requestPublish = async (): Promise<void> => {
    if (!isSubmitting) {
      try {
        setIsSubmitting(true);

        const res = await axiosInstance.post("/api/courses/requests", { course: course._id });
        toast.success(res.data.message);
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error.response?.data.error);
        } else {
          toast.error("Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу.");
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div>
      <Link href={"/"} className="w-full rounded-lg overflow-hidden mb-3 group relative block">
        <Image
          src={course.picture}
          alt={course.name}
          width={500}
          height={500}
          className="w-full aspect-[1.4/1] object-cover group-hover:scale-110 duration-300"
        />

        <div className="absolute top-[10px] right-[10px] z-[10]">
          <button
            onClick={(e): void => {
              e.preventDefault();
              setDropDownShow(!dropDownShow);
            }}
            className="p-3 bg-white rounded-lg shadow-shadow-1 text-icon  hover:text-white hover:bg-icon duration-300"
          >
            <BiDotsVerticalRounded size={20} />
          </button>

          <div
            className={classNames(
              "absolute top-full right-0 mt-2 duration-300 z-10",
              { "opacity-100": dropDownShow },
              { "opacity-0 pointer-events-none": !dropDownShow }
            )}
          >
            <div className="border-t border-l border-border-1 w-[10px] h-[10px] rotate-45 bg-white absolute right-5" />

            <div className="bg-white border border-border-1  rounded-lg py-5 px-8 mt-[5px] flex flex-col gap-5 text-text text-lg-medium shadow-shadow-dashboard">
              {!course.isPublished && (
                <button
                  disabled={isSubmitting}
                  onClick={(e): void => {
                    e.preventDefault();
                    requestPublish();
                  }}
                  className="flex items-center gap-3 hover:text-color-1 duration-300 group/button disabled:pointer-events-none"
                >
                  <MdPublishedWithChanges
                    size={20}
                    className="text-icon group-hover/button:text-color-1 duration-300"
                  />
                  Нийтлэх
                </button>
              )}

              {course.isPublished && (
                <button
                  disabled={isSubmitting}
                  className="flex items-center gap-3 hover:text-color-1 duration-300 group/button disabled:pointer-events-none"
                >
                  <MdUnpublished
                    size={20}
                    className="text-icon group-hover/button:text-color-1 duration-300"
                  />
                  Нийтлэхээ болих
                </button>
              )}

              <Link
                href={`/instructors/dashboard/my-courses/edit/${course._id}`}
                className={classNames(
                  "flex items-center gap-3 hover:text-color-1 duration-300 group/button",
                  { "pointer-events-none": isSubmitting }
                )}
              >
                <MdEdit
                  size={20}
                  className="text-icon group-hover/button:text-color-1 duration-300"
                />
                Засах
              </Link>

              <button
                disabled={isSubmitting}
                className="flex items-center gap-3 hover:text-color-1 duration-300 group/button disabled:pointer-events-none"
              >
                <MdDelete
                  size={20}
                  className="text-icon group-hover/button:text-color-1 duration-300"
                />
                Устгах
              </button>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full group-hover:bg-head/50 duration-300" />
      </Link>

      <Link
        className="block text-head text-base-medium hover:text-head/50 duration-300 mb-2"
        href={"/"}
      >
        {course.name}
      </Link>
      <div className="flex items-center gap-[10px]">
        <span className="text-[#E59819] text-sm-regular">{course.avgRating.toFixed(1)}</span>
        <RatingStar count={5} rating={course.avgRating} gap={3} size={13} />
      </div>
    </div>
  );
};

export default CourseCard;
