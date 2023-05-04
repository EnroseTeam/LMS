import Image from "next/image";
import { FC } from "react";
import { HiChevronDown } from "react-icons/hi";
import imagePlaceholder from "@/assets/ph-image.webp";
import MessageBox from "@/components/global/MessageBox";

const InstructorCreateCoursePage: FC = () => {
  console.log(imagePlaceholder.src);

  return (
    <>
      <h1 className="text-head text-3xl-bold mb-[9px]">Сургалт нэмэх</h1>
      <p className="text-text text-md-regular mb-[30px]">
        Шинээр сургалт нэмэх
      </p>

      <MessageBox
        type="Warning"
        message="Сургалтаа нэмэхээс өмнө хуудсаа дахин ачааллавал таны оруулсан бүх мэдээлэл устах болно."
        className="mb-[30px]"
      />

      <div className="rounded-2xl shadow-shadow-dashboard bg-white mb-[60px]">
        <div className="px-[30px] py-5 border-b border-b-border-1">
          <h2 className="text-head text-lg-medium">Зураг болон бичлэг</h2>
        </div>
        <div className="p-[30px] flex flex-col gap-[60px]">
          <div className="grid grid-cols-7 gap-[30px]">
            <div className="col-span-2 rounded-lg overflow-hidden">
              <Image
                src={imagePlaceholder}
                alt="Image"
                width={520}
                height={430}
                className="block w-full aspect-[1.2/1] object-cover"
              />
            </div>
            <div className="col-span-5">
              <label
                htmlFor="image"
                className="block mb-[9px] text-head text-base-medium after:content-['*'] after:text-red-500 after:ml-1"
              >
                Зураг
              </label>
              <div className="flex items-center focus-within:ring-2 focus-within:ring-color-1 rounded-lg overflow-hidden duration-150 mb-3">
                <input
                  disabled
                  type="text"
                  id="image"
                  className="flex-1 border border-border-2 rounded-l-lg py-3 px-[22px] text-text text-md-regular focus:outline-none  "
                  placeholder="Зураг"
                />
                <label className="bg-icon py-[11px] px-[28px] text-white rounded-r-lg cursor-pointer text-md-regular border-2 border-transparent hover:border-icon hover:text-icon hover:bg-transparent duration-300">
                  <input type="file" className="sr-only" />
                  Зураг хуулах
                </label>
              </div>
              <p className="text-text text-md-regular">
                Сургалтын зургаа энд оруулна уу. Энэхүү зураг нь зөвхөн .jpg,
                .jpeg, .png өргөтгөлтэй байх ёстойг анхаарна уу.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-[30px]">
            <div className="col-span-2 rounded-lg overflow-hidden">
              <video
                className="block w-full aspect-[1.2/1] object-cover"
                poster={imagePlaceholder.src}
                controls={false}
              >
                <source src="video.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="col-span-5">
              <label
                htmlFor="video"
                className="block mb-[9px] text-head text-base-medium after:content-['*'] after:text-red-500 after:ml-1"
              >
                Танилцуулга бичлэг
              </label>
              <div className="flex items-center focus-within:ring-2 focus-within:ring-color-1 rounded-lg overflow-hidden duration-150 mb-3">
                <input
                  disabled
                  type="text"
                  id="video"
                  className="flex-1 border border-border-2 rounded-l-lg py-3 px-[22px] text-text text-md-regular focus:outline-none  "
                  placeholder="Танилцуулга бичлэг"
                />
                <label className="bg-icon py-[11px] px-[28px] text-white rounded-r-lg cursor-pointer text-md-regular border-2 border-transparent hover:border-icon hover:text-icon hover:bg-transparent duration-300">
                  <input type="file" className="sr-only" />
                  Бичлэг хуулах
                </label>
              </div>
              <p className="text-text text-md-regular">
                Танилцуулга бичлэг хийснээр таны сургалтыг илүү их хүн үзэх
                магадлал ихсэх болно.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl shadow-shadow-dashboard bg-white">
        <div className="px-[30px] py-5 border-b border-b-border-1">
          <h2 className="text-head text-lg-medium">
            Сургалтын ерөнхий мэдээлэл
          </h2>
        </div>
        <div className="p-[30px]">
          <form
            id="course-create-form"
            className="grid grid-cols-2 gap-[30px] mb-[30px]"
          >
            <div className="col-span-2">
              <label
                htmlFor="name"
                className="block mb-[9px] text-head text-base-medium after:content-['*'] after:text-red-500 after:ml-1"
              >
                Сургалтын нэр
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-border-2 rounded-lg py-3 px-[22px] text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150"
                placeholder="Сургалтын нэр"
              />
            </div>

            <div className="col-span-2">
              <label
                htmlFor="description"
                className="block mb-[9px] text-head text-base-medium after:content-['*'] after:text-red-500 after:ml-1"
              >
                Тайлбар
              </label>
              <textarea
                id="description"
                className="w-full border border-border-2 rounded-lg py-3 px-[22px] text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150 resize-none"
                placeholder="Тайлбар"
                rows={10}
              />
            </div>

            <div>
              <label
                htmlFor="newGoal"
                className="block mb-[9px] text-head text-base-medium after:content-['*'] after:text-red-500 after:ml-1"
              >
                Сургалтын зорилго
              </label>
              <textarea
                id="goals"
                className="w-full border border-border-2 rounded-lg py-3 px-[22px] text-text text-md-regular disabled:bg-white mb-3 resize-none"
                disabled
                rows={4}
              />
              <div className="flex items-center gap-5">
                <div className="flex-1 flex items-center gap-2">
                  <input
                    className="flex-1 border border-border-2 rounded-lg py-[14px] px-4 text-text text-sm-medium focus:outline-none focus:ring-2 focus:ring-color-1 duration-150"
                    type="text"
                    id="newGoal"
                    placeholder="Шинэ зорилго"
                  />
                </div>
                <button
                  type="button"
                  className="btn-1-outline py-3 px-4 text-sm-medium"
                >
                  Нэмэх
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="newRequirement"
                className="block mb-[9px] text-head text-base-medium after:content-['*'] after:text-red-500 after:ml-1"
              >
                Тавигдах шаардлага
              </label>
              <textarea
                id="requirements"
                className="w-full border border-border-2 rounded-lg py-3 px-[22px] text-text text-md-regular disabled:bg-white mb-3 resize-none"
                disabled
                rows={4}
              />
              <div className="flex items-center gap-5">
                <div className="flex-1 flex items-center gap-2">
                  <input
                    className="flex-1 border border-border-2 rounded-lg py-[14px] px-4 text-text text-sm-medium focus:outline-none focus:ring-2 focus:ring-color-1 duration-150"
                    type="text"
                    id="newRequirement"
                    placeholder="Шинэ шаардлага"
                  />
                </div>
                <button
                  type="button"
                  className="btn-1-outline py-3 px-4 text-sm-medium"
                >
                  Нэмэх
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="level"
                className="block mb-[9px] text-head text-base-medium after:content-['*'] after:text-red-500 after:ml-1"
              >
                Түвшин
              </label>
              <button
                id="level"
                type="button"
                className="w-full border border-border-2 rounded-lg py-3 px-[22px] text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150 flex items-center justify-between"
              >
                Түвшин сонгох
                <HiChevronDown size={18} />
              </button>
            </div>

            <div>
              <label
                htmlFor="category"
                className="block mb-[9px] text-head text-base-medium after:content-['*'] after:text-red-500 after:ml-1"
              >
                Ангилал
              </label>
              <button
                id="category"
                type="button"
                className="w-full border border-border-2 rounded-lg py-3 px-[22px] text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150 flex items-center justify-between"
              >
                Ангилал сонгох
                <HiChevronDown size={18} />
              </button>
            </div>

            <div>
              <label
                htmlFor="price"
                className="block mb-[9px] text-head text-base-medium after:content-['*'] after:text-red-500 after:ml-1"
              >
                Үндсэн үнэ
              </label>
              <input
                type="number"
                id="price"
                className="w-full border border-border-2 rounded-lg py-3 px-[22px] text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150"
                placeholder="Үндсэн үнэ"
              />
            </div>

            <div>
              <label
                htmlFor="discountPrice"
                className="block mb-[9px] text-head text-base-medium"
              >
                Хямдралтай үнэ
              </label>
              <input
                type="number"
                id="discountPrice"
                className="w-full border border-border-2 rounded-lg py-3 px-[22px] text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150"
                placeholder="Хямдралтай үнэ"
              />
            </div>
          </form>
          <div className="flex items-center justify-between">
            <button type="button" className="btn-1-outline py-4">
              Болих
            </button>
            <button
              type="submit"
              form="course-create-form"
              className="btn-1 py-4"
            >
              Нэмэх
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstructorCreateCoursePage;
