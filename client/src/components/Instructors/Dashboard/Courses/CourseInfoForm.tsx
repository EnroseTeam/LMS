import { ICourse, ICourseCategory, ICourseLevel } from "@/interfaces/courses";
import { axiosInstance } from "@/utils/axiosInstance";
import { isAxiosError } from "axios";
import { useRouter } from "next/router";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { HiChevronDown } from "react-icons/hi";
import { toast } from "react-toastify";

interface CourseInfoFormProps {
  levels: ICourseLevel[];
  categories: ICourseCategory[];
  setActiveStage: Dispatch<SetStateAction<"Info" | "Media">>;
  setCourseId?: Dispatch<SetStateAction<string>>;
  setMessage: Dispatch<SetStateAction<string>>;
  setMessageType: Dispatch<SetStateAction<"Success" | "Error">>;
  course?: ICourse;
}

const CourseInfoForm: FC<CourseInfoFormProps> = ({
  levels,
  categories,
  setActiveStage,
  setCourseId,
  setMessage,
  setMessageType,
  course,
}) => {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [discountPrice, setDiscountPrice] = useState<number>(0);

  const [levelDropDownShow, setLevelDropDownShow] = useState<boolean>(false);
  const [categoryDropDownShow, setCategoryDropDownShow] =
    useState<boolean>(false);

  const [selectedLevel, setSelectedLevel] = useState<{
    name: string;
    _id: string;
  }>({
    name: "",
    _id: "",
  });
  const [selectedCategory, setSelectedCategory] = useState<{
    name: string;
    _id: string;
  }>({ name: "", _id: "" });

  const [goals, setGoals] = useState<string[]>([]);
  const newGoal = useRef<HTMLInputElement>(null);

  const [requirements, setRequirements] = useState<string[]>([]);
  const newRequirement = useRef<HTMLInputElement>(null);

  const [isNameExist, setIsNameExist] = useState<boolean>(true);
  const [isDescriptionExist, setIsDescriptionExist] = useState<boolean>(true);
  const [isLevelExist, setIsLevelExist] = useState<boolean>(true);
  const [isCategoryExist, setIsCategoryExist] = useState<boolean>(true);
  const [isGoalsExist, setIsGoalsExist] = useState<boolean>(true);
  const [isRequirementsExist, setIsRequirementsExist] = useState<boolean>(true);
  const [isPriceExist, setIsPriceExist] = useState<boolean>(true);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (course) {
      setName(course.name);
      setDescription(course.description);
      setPrice(course.price);
      course.discountPrice > 0 && setDiscountPrice(course.discountPrice);
      setSelectedCategory({
        name: course.category.name,
        _id: course.category._id,
      });
      setSelectedLevel({ name: course.level.name, _id: course.level._id });
      setGoals(course.goals);
      setRequirements(course.requirements);
    }
  }, [course]);

  const submitHandler = async (): Promise<void> => {
    if (!isSubmitting) {
      try {
        setMessage("");
        setIsSubmitting(true);

        if (
          !name ||
          !description ||
          !selectedLevel._id ||
          !selectedCategory._id ||
          goals.length === 0 ||
          requirements.length === 0 ||
          !price
        ) {
          !name && setIsNameExist(false);
          !description && setIsDescriptionExist(false);
          !selectedLevel._id && setIsLevelExist(false);
          !selectedCategory._id && setIsCategoryExist(false);
          goals.length === 0 && setIsGoalsExist(false);
          requirements.length === 0 && setIsRequirementsExist(false);
          !price && setIsPriceExist(false);

          return;
        }

        if (setCourseId) {
          const res = await axiosInstance.post("/api/courses", {
            name,
            description,
            level: selectedLevel._id,
            category: selectedCategory._id,
            requirements,
            goals,
            price,
            discountPrice,
          });

          toast.success(res.data.message);
          setCourseId(res.data.body._id);
          setActiveStage("Media");
        }

        if (course) {
          const res = await axiosInstance.patch<{ message: string }>(
            `/api/courses/${course._id}`,
            {
              name,
              description,
              level: selectedLevel._id,
              category: selectedCategory._id,
              requirements,
              goals,
              price,
              discountPrice,
            }
          );

          toast.success(res.data.message);
          setActiveStage("Media");
        }
      } catch (error) {
        console.log(error);
        setMessageType("Error");
        if (isAxiosError(error)) {
          setMessage(
            error.response?.data.error ||
              "Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу."
          );
        } else {
          setMessage("Тодорхойгүй алдаа гарлаа. Та дахин оролдоно уу.");
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="rounded-2xl shadow-shadow-dashboard bg-white">
      <div className="px-[30px] py-5 border-b border-b-border-1">
        <h2 className="text-head text-lg-medium">Сургалтын ерөнхий мэдээлэл</h2>
      </div>
      <div className="p-[30px]">
        <form
          onSubmit={(e): void => {
            e.preventDefault();
            submitHandler();
          }}
          id="course-create-form"
          className="grid grid-cols-2 gap-[30px] mb-[30px]"
        >
          {/* Name */}
          <div className="col-span-2">
            <label
              htmlFor="name"
              className="block mb-[9px] text-head text-base-medium after:content-['*'] after:text-red-500 after:ml-1"
            >
              Сургалтын нэр
            </label>
            <input
              value={name}
              onChange={(e): void => {
                setName(e.target.value);
                setIsNameExist(true);
              }}
              type="text"
              id="name"
              className={`w-full border border-border-2 rounded-lg py-3 px-[22px] text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150 ${
                !isNameExist ? "ring-2 ring-red-500" : ""
              }`}
              placeholder="Сургалтын нэр"
            />
            {!isNameExist && (
              <p className="mt-2 text-red-500 text-md-medium">
                Сургалтын нэр заавал шаардлагатай.
              </p>
            )}
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label
              htmlFor="description"
              className="block mb-[9px] text-head text-base-medium after:content-['*'] after:text-red-500 after:ml-1"
            >
              Тайлбар
            </label>
            <textarea
              value={description}
              onChange={(e): void => {
                setIsDescriptionExist(true);
                setDescription(e.target.value);
              }}
              id="description"
              className={`w-full border border-border-2 rounded-lg py-3 px-[22px] text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150 resize-none overflow-y-auto ${
                !isDescriptionExist ? "ring-2 ring-red-500" : ""
              }`}
              placeholder="Тайлбар"
              rows={10}
            />
            {!isDescriptionExist && (
              <p className="mt-2 text-red-500 text-md-medium">
                Тайлбар заавал шаардлагатай.
              </p>
            )}
          </div>

          {/* Level */}
          <div className="relative col-span-2 md:col-span-1">
            <label
              htmlFor="level"
              className="block mb-[9px] text-head text-base-medium after:content-['*'] after:text-red-500 after:ml-1"
            >
              Түвшин
            </label>
            <button
              onClick={(): void => {
                setLevelDropDownShow(!levelDropDownShow);
              }}
              id="level"
              type="button"
              className={`w-full border border-border-2 rounded-lg py-3 px-[22px] text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150 flex items-center justify-between ${
                !isLevelExist ? "ring-2 ring-red-500" : ""
              }`}
            >
              {selectedLevel.name ? selectedLevel.name : "Түвшин сонгох"}
              <HiChevronDown
                className={
                  levelDropDownShow
                    ? "-rotate-180 duration-300"
                    : "duration-300"
                }
                size={18}
              />
            </button>
            {!isLevelExist && (
              <p className="mt-2 text-red-500 text-md-medium">
                Түвшин заавал сонгох шаардалагатай.
              </p>
            )}

            <div
              className={`absolute top-full right-0 left-0 w-full bg-white border border-border-2 p-5 rounded-lg mt-2 text-text text-md-regular flex flex-col gap-5 items-start overflow-hidden ${
                levelDropDownShow ? "block" : "hidden"
              } duration-150`}
            >
              {levels.map((level) => (
                <button
                  type="button"
                  onClick={(): void => {
                    setIsLevelExist(true);
                    setSelectedLevel({ name: level.name, _id: level._id });
                    setLevelDropDownShow(false);
                  }}
                  className="hover:text-color-1 duration-300"
                  key={level._id}
                >
                  {level.name}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="relative col-span-2 md:col-span-1">
            <label
              htmlFor="category"
              className="block mb-[9px] text-head text-base-medium after:content-['*'] after:text-red-500 after:ml-1"
            >
              Ангилал
            </label>
            <button
              onClick={(): void => {
                setCategoryDropDownShow(!categoryDropDownShow);
              }}
              id="category"
              type="button"
              className={`w-full border border-border-2 rounded-lg py-3 px-[22px] text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150 flex items-center justify-between ${
                !isCategoryExist ? "ring-2 ring-red-500" : ""
              }`}
            >
              {selectedCategory.name ? selectedCategory.name : "Ангилал сонгох"}
              <HiChevronDown
                className={
                  categoryDropDownShow
                    ? "-rotate-180 duration-300"
                    : "duration-300"
                }
                size={18}
              />
            </button>
            {!isCategoryExist && (
              <p className="mt-2 text-red-500 text-md-medium">
                Ангилал заавал сонгох шаардалагатай.
              </p>
            )}

            <div
              className={`absolute top-full right-0 left-0 w-full bg-white border border-border-2 p-5 rounded-lg mt-2 text-text text-md-regular flex flex-col gap-5 items-start overflow-hidden  ${
                categoryDropDownShow ? "block" : "hidden"
              } duration-150`}
            >
              {categories.map((category) => (
                <button
                  onClick={(): void => {
                    setIsCategoryExist(true);
                    setSelectedCategory({
                      name: category.name,
                      _id: category._id,
                    });
                    setCategoryDropDownShow(false);
                  }}
                  type="button"
                  className="hover:text-color-1 duration-300"
                  key={category._id}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Goals */}
          <div className="col-span-2 md:col-span-1">
            <label
              htmlFor="newGoal"
              className="block mb-[9px] text-head text-base-medium after:content-['*'] after:text-red-500 after:ml-1"
            >
              Сургалтын зорилго
            </label>
            <div
              className={`w-full h-[130px] overflow-auto border border-border-2 rounded-lg py-3 px-[22px] text-text text-md-regular mb-4 ${
                !isGoalsExist ? "ring-2 ring-red-500" : ""
              }`}
            >
              <ol className="list-decimal ml-3">
                {goals.map((goal, index) => (
                  <li key={`goal-${index}`}>{goal}</li>
                ))}
              </ol>
            </div>
            {!isGoalsExist && (
              <p className="my-2 text-red-500 text-md-medium">
                Сургалтын зорилго заавал шаардалагатай.
              </p>
            )}
            <div className="flex flex-col smallest:flex-row smallest:items-center gap-5">
              <div className="flex-1 flex items-center gap-2">
                <input
                  ref={newGoal}
                  className="flex-1 border border-border-2 rounded-lg py-[14px] px-4 text-text text-sm-medium focus:outline-none focus:ring-2 focus:ring-color-1 duration-150"
                  type="text"
                  id="newGoal"
                  placeholder="Шинэ зорилго"
                  onKeyDown={(e): void => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (newGoal.current !== null && newGoal.current.value) {
                        setIsGoalsExist(true);
                        setGoals([...goals, newGoal.current.value]);
                        newGoal.current.value = "";
                        newGoal.current.focus();
                      }
                    }
                  }}
                />
              </div>
              <button
                onClick={(): void => {
                  if (newGoal.current !== null && newGoal.current.value) {
                    setIsGoalsExist(true);
                    setGoals([...goals, newGoal.current.value]);
                    newGoal.current.value = "";
                    newGoal.current.focus();
                  }
                }}
                type="button"
                className="btn-1-outline py-3 px-4 text-sm-medium"
              >
                Нэмэх
              </button>
            </div>
          </div>

          {/* Requirements */}
          <div className="col-span-2 md:col-span-1">
            <label
              htmlFor="newRequirement"
              className="block mb-[9px] text-head text-base-medium after:content-['*'] after:text-red-500 after:ml-1"
            >
              Тавигдах шаардлага
            </label>
            <div
              className={`w-full h-[130px] overflow-auto border border-border-2 rounded-lg py-3 px-[22px] text-text text-md-regular mb-4 ${
                !isRequirementsExist ? "ring-2 ring-red-500" : ""
              }`}
            >
              <ol className="list-decimal ml-3">
                {requirements.map((requirement, index) => (
                  <li key={`requirement-${index}`}>{requirement}</li>
                ))}
              </ol>
            </div>
            {!isRequirementsExist && (
              <p className="my-2 text-red-500 text-md-medium">
                Тавигдах шаардлага заавал хэрэгтэй.
              </p>
            )}
            <div className="flex flex-col smallest:flex-row smallest:items-center gap-5">
              <div className="flex-1 flex items-center gap-2">
                <input
                  ref={newRequirement}
                  className="flex-1 border border-border-2 rounded-lg py-[14px] px-4 text-text text-sm-medium focus:outline-none focus:ring-2 focus:ring-color-1 duration-150"
                  type="text"
                  id="newRequirement"
                  placeholder="Шинэ шаардлага"
                  onKeyDown={(e): void => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (
                        newRequirement.current !== null &&
                        newRequirement.current.value
                      ) {
                        setIsRequirementsExist(true);
                        setRequirements([
                          ...requirements,
                          newRequirement.current.value,
                        ]);
                        newRequirement.current.value = "";
                        newRequirement.current.focus();
                      }
                    }
                  }}
                />
              </div>
              <button
                onClick={(): void => {
                  if (
                    newRequirement.current !== null &&
                    newRequirement.current.value
                  ) {
                    setIsRequirementsExist(true);
                    setRequirements([
                      ...requirements,
                      newRequirement.current.value,
                    ]);
                    newRequirement.current.value = "";
                    newRequirement.current.focus();
                  }
                }}
                type="button"
                className="btn-1-outline py-3 px-4 text-sm-medium"
              >
                Нэмэх
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="col-span-2 md:col-span-1">
            <label
              htmlFor="price"
              className="block mb-[9px] text-head text-base-medium after:content-['*'] after:text-red-500 after:ml-1"
            >
              Үндсэн үнэ
            </label>
            <input
              value={price}
              onChange={(e): void => {
                setIsPriceExist(true);
                setPrice(Number(e.target.value));
              }}
              type="number"
              id="price"
              className={`w-full border border-border-2 rounded-lg py-3 px-[22px] text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150 ${
                !isPriceExist ? "ring-2 ring-red-500" : ""
              }`}
              placeholder="Үндсэн үнэ"
            />
            {!isPriceExist && (
              <p className="mt-2 text-red-500 text-md-medium">
                Үндсэн үнэ заавал шаардалагатай.
              </p>
            )}
          </div>

          {/* Discount Price */}
          <div className="col-span-2 md:col-span-1">
            <label
              htmlFor="discountPrice"
              className="block mb-[9px] text-head text-base-medium"
            >
              Хямдралтай үнэ
            </label>
            <input
              value={discountPrice}
              onChange={(e): void => {
                setDiscountPrice(Number(e.target.value));
              }}
              type="number"
              id="discountPrice"
              className="w-full border border-border-2 rounded-lg py-3 px-[22px] text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150"
              placeholder="Хямдралтай үнэ"
            />
          </div>
        </form>

        {/* Action Buttons */}
        <div className="flex flex-col smallest:flex-row gap-5  items-center justify-between">
          <button
            disabled={isSubmitting}
            type="submit"
            form="course-create-form"
            className="btn-1 py-4 w-full smallest:w-fit"
          >
            Дараах
          </button>
          <button
            disabled={isSubmitting}
            onClick={(): void => {
              router.back();
            }}
            type="button"
            className="btn-1-outline py-4 w-full smallest:w-fit"
          >
            Болих
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseInfoForm;
