import { ICourse } from "@/interfaces/courses";
import { Dispatch, FC, SetStateAction, createContext, useState, useEffect } from "react";

interface CartProviderProps {
  children: JSX.Element | JSX.Element[];
}

interface CartContextTypes {
  cartItems: ICourse[];
  setCartItems: Dispatch<SetStateAction<ICourse[]>>;
  totalPrice: number;
  setTotalPrice: Dispatch<SetStateAction<number>>;
}

export const CartContext = createContext<CartContextTypes>({} as CartContextTypes);

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<ICourse[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (localStorage.getItem("cartItems")) {
      setCartItems(JSON.parse(localStorage.getItem("cartItems") as string));
    }

    if (localStorage.getItem("cartTotalPrice")) {
      setTotalPrice(JSON.parse(localStorage.getItem("cartTotalPrice") as string));
    }
  }, []);

  const value = { cartItems, setCartItems, totalPrice, setTotalPrice };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
