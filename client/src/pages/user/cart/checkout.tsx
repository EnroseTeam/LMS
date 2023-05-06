import Breadcrumbs from "@/components/global/Breadcrumbs";
import { useAuthenticate } from "@/hooks/useAuthenticate";
import { useCart } from "@/hooks/useCart";
import { ICourse } from "@/interfaces/courses";
import LoadingScreen from "@/utils/LoadingScreen";
import { axiosInstance } from "@/utils/axiosInstance";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

const CheckoutPage: FC = () => {
  const router = useRouter();
  const { user, isLoading } = useAuthenticate();
  const { cartItems, totalPrice: cartTotal } = useCart();

  const [courses, setCourses] = useState<ICourse[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [isReady, setIsReady] = useState<boolean>(false);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [apartment, setApartment] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  const [paymentOption, setPaymentOption] = useState<string>("");

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
    }

    if (!isLoading && user) {
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

      setIsReady(true);
    }
  }, [user, isLoading, router, cartItems, cartTotal]);

  if (!isReady) return <LoadingScreen />;

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

        <div className="grid grid-cols-5 gap-[30px]">
          {/* User Information */}
          <div className="col-span-3">
            <h2 className="mb-[38px] text-head text-xl font-medium leading-[23px]">
              Хэрэглэгчийн мэдээлэл
            </h2>

            <form className="flex flex-col gap-[30px]">
              <div className="grid grid-cols-2 gap-[30px]">
                {/* FirstName */}
                <div>
                  <label className="text-head text-base-medium mb-[9px] block" htmlFor="firstName">
                    Нэр
                  </label>
                  <input
                    value={firstName}
                    onChange={(e): void => {
                      setFirstName(e.target.value);
                    }}
                    type="text"
                    id="firstName"
                    placeholder="Нэр"
                    className="py-3 px-[22px] rounded-lg border border-border-2 w-full text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150"
                  />
                </div>

                {/* LastName */}
                <div>
                  <label className="text-head text-base-medium mb-[9px] block" htmlFor="lastName">
                    Овог
                  </label>
                  <input
                    value={lastName}
                    onChange={(e): void => {
                      setLastName(e.target.value);
                    }}
                    type="text"
                    id="lastName"
                    placeholder="Овог"
                    className="py-3 px-[22px] rounded-lg border border-border-2 w-full text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-[30px]">
                {/* Email */}
                <div>
                  <label className="text-head text-base-medium mb-[9px] block" htmlFor="email">
                    И-мэйл
                  </label>
                  <input
                    value={email}
                    onChange={(e): void => {
                      setEmail(e.target.value);
                    }}
                    type="email"
                    id="email"
                    placeholder="И-мэйл"
                    className="py-3 px-[22px] rounded-lg border border-border-2 w-full text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="text-head text-base-medium mb-[9px] block" htmlFor="phone">
                    Утасны дугаар
                  </label>
                  <input
                    value={phone}
                    onChange={(e): void => {
                      setPhone(e.target.value);
                    }}
                    type="text"
                    id="phone"
                    placeholder="Утасны дугаар"
                    className="py-3 px-[22px] rounded-lg border border-border-2 w-full text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150"
                  />
                </div>
              </div>

              {/* Apartment */}
              <div>
                <label className="text-head text-base-medium mb-[9px] block" htmlFor="address">
                  Байр
                </label>
                <input
                  value={apartment}
                  onChange={(e): void => {
                    setApartment(e.target.value);
                  }}
                  type="text"
                  id="address"
                  placeholder="Байр"
                  className="py-3 px-[22px] rounded-lg border border-border-2 w-full text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150"
                />
              </div>

              {/* District */}
              <div>
                <label className="text-head text-base-medium mb-[9px] block" htmlFor="district">
                  Дүүрэг /Сум/
                </label>
                <input
                  value={district}
                  onChange={(e): void => {
                    setDistrict(e.target.value);
                  }}
                  type="text"
                  id="district"
                  placeholder="Дүүрэг /Сум/"
                  className="py-3 px-[22px] rounded-lg border border-border-2 w-full text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150"
                />
              </div>

              {/* City */}
              <div>
                <label className="text-head text-base-medium mb-[9px] block" htmlFor="city">
                  Хот /Аймаг/
                </label>
                <input
                  value={city}
                  onChange={(e): void => {
                    setCity(e.target.value);
                  }}
                  type="text"
                  id="city"
                  placeholder="Хот /Аймаг/"
                  className="py-3 px-[22px] rounded-lg border border-border-2 w-full text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150"
                />
              </div>

              {/* Country */}
              <div>
                <label className="text-head text-base-medium mb-[9px] block" htmlFor="country">
                  Улс
                </label>
                <input
                  value={country}
                  onChange={(e): void => {
                    setCountry(e.target.value);
                  }}
                  type="text"
                  id="country"
                  placeholder="Улс"
                  className="py-3 px-[22px] rounded-lg border border-border-2 w-full text-text text-md-regular focus:outline-none focus:ring-2 focus:ring-color-1 duration-150"
                />
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

            <button className="btn-1 w-full py-5">Захиалга хийх</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
