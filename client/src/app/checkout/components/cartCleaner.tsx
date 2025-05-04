"use client";
import React from "react";
import { clearCart } from "@/redux/slice";
import { useAppDispatch } from "@/redux/store";

const CartCleaner = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(clearCart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  return null;
};

export default CartCleaner;
