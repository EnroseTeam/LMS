import { CartContext } from "@/contexts/CartContext";
import { ICourse } from "@/interfaces/courses";
import { useContext } from "react";
import { toast } from "react-toastify";

interface useCartReturn {
  cartItems: ICourse[];
  addCartItem: (course: ICourse) => void;
  removeCartItem: (course: ICourse) => void;
  removeAllCartItems: () => void;
  totalPrice: number;
}

export const useCart = (): useCartReturn => {
  const { cartItems, setCartItems, totalPrice, setTotalPrice } = useContext(CartContext);

  const addCartItem = (course: ICourse): void => {
    for (const item of cartItems) {
      if (course._id === item._id) {
        toast.warning("Энэ сургалтыг аль хэдийн сагсалсан байна.");
        return;
      }
    }
    setCartItems([...cartItems, course]);
    setTotalPrice(
      course.discountPrice > 0 ? totalPrice + course.discountPrice : totalPrice + course.price
    );
    localStorage.setItem("cartItems", JSON.stringify([...cartItems, course]));
    localStorage.setItem(
      "cartTotalPrice",
      JSON.stringify(
        course.discountPrice > 0 ? totalPrice + course.discountPrice : totalPrice + course.price
      )
    );
    toast.success("Сургалт сагсанд нэмэгдлээ.");
  };

  const removeCartItem = (course: ICourse): void => {
    setCartItems(cartItems.filter((curCourse) => curCourse._id !== course._id));
    setTotalPrice(
      course.discountPrice > 0 ? totalPrice - course.discountPrice : totalPrice - course.price
    );
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems.filter((curCourse) => curCourse._id !== course._id))
    );
    localStorage.setItem(
      "cartTotalPrice",
      JSON.stringify(
        course.discountPrice > 0 ? totalPrice - course.discountPrice : totalPrice - course.price
      )
    );
  };

  const removeAllCartItems = (): void => {
    setCartItems([]);
    setTotalPrice(0);
    localStorage.removeItem("cartItems");
    localStorage.removeItem("cartTotalPrice");
  };

  return { cartItems, addCartItem, removeCartItem, removeAllCartItems, totalPrice };
};
