import Breadcrumbs from "@/components/global/Breadcrumbs";
import { useCart } from "@/hooks/useCart";
import { ICourse } from "@/interfaces/courses";
import { axiosInstance } from "@/utils/axiosInstance";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { NextPageWithLayout } from "@/pages/_app";
import MessageBox from "@/components/global/MessageBox";
import { isAxiosError } from "axios";
import { AuthContext } from "@/contexts/AuthContext";

const CheckoutPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { user, isUserLoading } = useContext(AuthContext);
  const { cartItems, totalPrice: cartTotal, removeAllCartItems } = useCart();

  const [courses, setCourses] = useState<ICourse[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [apartment, setApartment] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  const [paymentOption, setPaymentOption] = useState<string>("");

  const [isFirstNameExist, setIsFirstNameExist] = useState<boolean>(true);
  const [isLastNameExist, setIsLastNameExist] = useState<boolean>(true);
  const [isEmailExist, setIsEmailExist] = useState<boolean>(true);
  const [isPhoneExist, setIsPhoneExist] = useState<boolean>(true);
  const [isApartmentExist, setIsApartmentExist] = useState<boolean>(true);
  const [isDistrictExist, setIsDistrictExist] = useState<boolean>(true);
  const [isCityExist, setIsCityExist] = useState<boolean>(true);
  const [isCountryExist, setIsCountryExist] = useState<boolean>(true);

  const [messageType, setMessageType] = useState<"Success" | "Error">("Success");
  const [message, setMessage] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push("/auth/login");
    }

    if (!isUserLoading && user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPhone(user.phone);
      setApartment(user.address.apartment);
      setDistrict(user.address.district);
      setCity(user.address.city);
      setCountry(user.address.country);

      if (router.query.course) {
        axiosInstance.get(`/api/courses/${router.query.course as string}`).then((res) => {
          setCourses([res.data.body]);
          setTotalPrice(
            res.data.body.discountPrice > 0 ? res.data.body.discountPrice : res.data.body.price
          );
        });
      } else {
        if (cartItems.length === 0) {
          router.push("/user/cart");
        }
        setCourses(cartItems);
        setTotalPrice(cartTotal);
      }
    }
  }, [user, isUserLoading, router, cartItems, cartTotal]);

  const submitHandler = async (): Promise<void> => {
    if (!isSubmitting) {
      try {
        setMessage("");
        setIsSubmitting(true);
        if (
          !firstName ||
          !lastName ||
          !email ||
          !phone ||
          !apartment ||
          !district ||
          !city ||
          !country ||
          !paymentOption
        ) {
          !firstName && setIsFirstNameExist(false);
          !lastName && setIsLastNameExist(false);
          !email && setIsEmailExist(false);
          !phone && setIsPhoneExist(false);
          !apartment && setIsApartmentExist(false);
          !district && setIsDistrictExist(false);
          !city && setIsCityExist(false);
          !country && setIsCountryExist(false);
          if (!paymentOption) {
            setMessage("Төлбөрийн төрлөө сонгоогүй байна.");
            setMessageType("Error");
          }
          return;
        }

        const res = await axiosInstance.post("/api/users/orders", {
          courses: courses.map((course) => course._id),
          payerInformation: {
            firstName,
            lastName,
            email,
            phone,
            address: {
              apartment,
              district,
              city,
              country,
            },
          },
        });

        console.log(res);

        setMessageType("Success");
        setMessage(res.data.message);

        if (!router.query.course) {
          removeAllCartItems();
        }

        setTimeout(() => {
          router.push(`/user/orders/${res.data.body}`);
        }, 2000);
      } catch (error) {
        setMessageType("Error");
        if (isAxiosError(error))
          setMessage(error.response?.data.error || "Тодорхойгүй алдаа гарлаа. Дахин оролдоно уу.");
        else setMessage("Тодорхойгүй алдаа гарлаа. Дахин оролдоно уу.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <Breadcrumbs
        breadcrumbItems={[
          { title: "Хэрэглэгч", link: "/user/settings" },
          { title: "Сагс", link: "/user/cart" },
          { title: "Захиалга хийх", link: "/cart/checkout" },
        ]}
      />
      <div className="container mb-[120px]">
        <h1 className="text-center text-head text-4x-bold mb-1">Захиалга хийх</h1>
        <p className="text-center text-text text-lg-regular mb-[64px]">
          We’re on a mission to deliver engaging, curated courses at a reasonable price.
        </p>

        {message && <MessageBox type={messageType} message={message} className="mb-5" />}

        <div className="grid grid-cols-5 gap-[30px]">
          {/* User Information */}
          <div className="col-span-3">
            <h2 className="mb-[38px] text-head text-xl font-medium leading-[23px]">
              Хэрэглэгчийн мэдээлэл
            </h2>

            <form
              id="checkout-form"
              onSubmit={(e): void => {
                e.preventDefault();
                submitHandler();
              }}
              className="flex flex-col gap-[30px]"
            >
              <div className="grid grid-cols-2 gap-[30px]">
                {/* FirstName */}
                <div>
                  <label
                    className="text-head text-base-medium mb-[9px] block after:content-['*'] after:text-red-500 after:ml-1"
                    htmlFor="firstName"
                  >
                    Нэр
                  </label>
                  <input
                    value={firstName}
                    onChange={(e): void => {
                      setFirstName(e.target.value);
                      setIsFirstNameExist(true);
                    }}
                    type="text"
                    id="firstName"
                    placeholder="Нэр"
                    className={classNames(
                      "py-3 px-[22px] rounded-lg border border-border-2 w-full text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150",
                      { "ring-2 ring-red-500": !isFirstNameExist }
                    )}
                  />
                  {!isFirstNameExist && (
                    <p className="text-red-500 text-md-medium mt-2">Нэр заавал шаардлагатай.</p>
                  )}
                </div>

                {/* LastName */}
                <div>
                  <label
                    className="text-head text-base-medium mb-[9px] block after:content-['*'] after:text-red-500 after:ml-1"
                    htmlFor="lastName"
                  >
                    Овог
                  </label>
                  <input
                    value={lastName}
                    onChange={(e): void => {
                      setLastName(e.target.value);
                      setIsLastNameExist(true);
                    }}
                    type="text"
                    id="lastName"
                    placeholder="Овог"
                    className={classNames(
                      "py-3 px-[22px] rounded-lg border border-border-2 w-full text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150",
                      { "ring-2 ring-red-500": !isLastNameExist }
                    )}
                  />
                  {!isLastNameExist && (
                    <p className="text-red-500 text-md-medium mt-2">Овог заавал шаардлагатай.</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-[30px]">
                {/* Email */}
                <div>
                  <label
                    className="text-head text-base-medium mb-[9px] block after:content-['*'] after:text-red-500 after:ml-1"
                    htmlFor="email"
                  >
                    И-мэйл
                  </label>
                  <input
                    value={email}
                    onChange={(e): void => {
                      setEmail(e.target.value);
                      setIsEmailExist(true);
                    }}
                    type="email"
                    id="email"
                    placeholder="И-мэйл"
                    className={classNames(
                      "py-3 px-[22px] rounded-lg border border-border-2 w-full text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150",
                      { "ring-2 ring-red-500": !isEmailExist }
                    )}
                  />
                  {!isEmailExist && (
                    <p className="text-red-500 text-md-medium mt-2">И-мэйл заавал шаардлагатай.</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    className="text-head text-base-medium mb-[9px] block after:content-['*'] after:text-red-500 after:ml-1"
                    htmlFor="phone"
                  >
                    Утасны дугаар
                  </label>
                  <input
                    value={phone}
                    onChange={(e): void => {
                      setPhone(e.target.value);
                      setIsPhoneExist(true);
                    }}
                    type="text"
                    id="phone"
                    placeholder="Утасны дугаар"
                    className={classNames(
                      "py-3 px-[22px] rounded-lg border border-border-2 w-full text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150",
                      { "ring-2 ring-red-500": !isPhoneExist }
                    )}
                  />
                  {!isPhoneExist && (
                    <p className="text-red-500 text-md-medium mt-2">
                      Утасны дугаар заавал шаардлагатай.
                    </p>
                  )}
                </div>
              </div>

              {/* Apartment */}
              <div>
                <label
                  className="text-head text-base-medium mb-[9px] block after:content-['*'] after:text-red-500 after:ml-1"
                  htmlFor="apartment"
                >
                  Байр
                </label>
                <input
                  value={apartment}
                  onChange={(e): void => {
                    setApartment(e.target.value);
                    setIsApartmentExist(true);
                  }}
                  type="text"
                  id="apartment"
                  placeholder="Байр"
                  className={classNames(
                    "py-3 px-[22px] rounded-lg border border-border-2 w-full text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150",
                    { "ring-2 ring-red-500": !isApartmentExist }
                  )}
                />
                {!isApartmentExist && (
                  <p className="text-red-500 text-md-medium mt-2">Байр заавал шаардлагатай.</p>
                )}
              </div>

              {/* District */}
              <div>
                <label
                  className="text-head text-base-medium mb-[9px] block after:content-['*'] after:text-red-500 after:ml-1"
                  htmlFor="district"
                >
                  Дүүрэг /Сум/
                </label>
                <input
                  value={district}
                  onChange={(e): void => {
                    setDistrict(e.target.value);
                    setIsDistrictExist(true);
                  }}
                  type="text"
                  id="district"
                  placeholder="Дүүрэг /Сум/"
                  className={classNames(
                    "py-3 px-[22px] rounded-lg border border-border-2 w-full text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150",
                    { "ring-2 ring-red-500": !isDistrictExist }
                  )}
                />
                {!isDistrictExist && (
                  <p className="text-red-500 text-md-medium mt-2">
                    Дүүрэг /Сум/ заавал шаардлагатай.
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label
                  className="text-head text-base-medium mb-[9px] block after:content-['*'] after:text-red-500 after:ml-1"
                  htmlFor="city"
                >
                  Хот /Аймаг/
                </label>
                <input
                  value={city}
                  onChange={(e): void => {
                    setCity(e.target.value);
                    setIsCityExist(true);
                  }}
                  type="text"
                  id="city"
                  placeholder="Хот /Аймаг/"
                  className={classNames(
                    "py-3 px-[22px] rounded-lg border border-border-2 w-full text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150",
                    { "ring-2 ring-red-500": !isCityExist }
                  )}
                />
                {!isCityExist && (
                  <p className="text-red-500 text-md-medium mt-2">
                    Хот /Аймаг/ заавал шаардлагатай.
                  </p>
                )}
              </div>

              {/* Country */}
              <div>
                <label
                  className="text-head text-base-medium mb-[9px] block after:content-['*'] after:text-red-500 after:ml-1"
                  htmlFor="country"
                >
                  Улс
                </label>
                <input
                  value={country}
                  onChange={(e): void => {
                    setCountry(e.target.value);
                    setIsCountryExist(true);
                  }}
                  type="text"
                  id="country"
                  placeholder="Улс"
                  className={classNames(
                    "py-3 px-[22px] rounded-lg border border-border-2 w-full text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150",
                    { "ring-2 ring-red-500": !isCountryExist }
                  )}
                />
                {!isCountryExist && (
                  <p className="text-red-500 text-md-medium mt-2">Улс заавал шаардлагатай.</p>
                )}
              </div>
            </form>
          </div>

          <div className="col-span-2">
            {/* Order Information */}
            <div className="bg-bg-1 border border-border-1 rounded-lg mb-[30px]">
              <h3 className="p-[30px] text-head text-xl font-medium leading-[23px]">
                Таны захиалга
              </h3>

              <div className="flex items-center justify-between px-[30px] pb-[15px] border-b border-b-border-1 text-head text-md-medium">
                <h5>Сургалт</h5>
                <h5>Үнэ</h5>
              </div>

              <div className="px-[30px] py-3 border-b border-b-border-1 flex flex-col gap-5 text-text text-md-regular">
                {courses.map((course) => (
                  <div key={course._id} className="flex items-center justify-between">
                    <Link
                      className="hover:text-color-1 duration-300"
                      href={`/courses/${course._id}`}
                    >
                      {course.name}
                    </Link>
                    <span>₮{course.discountPrice > 0 ? course.discountPrice : course.price}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-head text-md-medium px-[30px] py-5">
                <h5>Нийт үнэ</h5>
                <span>₮{totalPrice}</span>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-bg-1 border border-border-1 rounded-lg p-[30px] mb-[30px]">
              <h2 className="text-head text-xl font-medium leading-[23px] mb-[34px]">
                Төлбөрийн төрөл
              </h2>

              <div className="flex items-start gap-4">
                <input
                  checked={paymentOption === "transfer"}
                  onChange={(e): void => {
                    if (e.target.checked) {
                      setPaymentOption("transfer");
                    }
                  }}
                  type="radio"
                  name="payment-option"
                  id="transfer"
                  className="w-4 h-4 rounded-full"
                />

                <div>
                  <label htmlFor="transfer" className="block text-head text-md-medium mb-6">
                    Банкны шилжүүлэг
                  </label>
                  <p className="text-text text-sm-regular">
                    Та манай байгуулгын дансруу өөрийн захиалгын дугаараа гүйлгээний утган дээрээ
                    бичэн мөнгөө шилжүүлснээр таны сургалт үзэх эрх нээгдэх болно.
                  </p>
                </div>
              </div>
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              form="checkout-form"
              className="btn-1 w-full py-5"
            >
              Захиалга хийх
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
