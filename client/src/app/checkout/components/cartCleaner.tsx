"use client";
import React from "react";
import { clearCart } from "@/redux/slice";
import { useAppDispatch } from "@/redux/store";

const CartCleaner = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(clearCart());
  }, []);
  return null;
};

export default CartCleaner;
