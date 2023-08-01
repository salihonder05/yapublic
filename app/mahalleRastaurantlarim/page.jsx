"use client";
import Cart from "@/components/cart/Cart";
import Restaurants from "@/components/mahalleRastaurantlarim/Restaurants";
import { useSelector } from "react-redux";

const MahalleRastaurantlarim = () => {
  const openCart = useSelector(({ cart }) => cart.openCart);
  return (
    <>
      <Restaurants />
      {openCart === true && <Cart />}
    </>
  );
};

export default MahalleRastaurantlarim;
