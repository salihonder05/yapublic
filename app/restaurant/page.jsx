"use client";
import Cart from "@/components/cart/Cart";
import { getRestaurantsProducts } from "@/components/data/query/query";
import Categories from "@/components/restaurant/Categories";
import Informations from "@/components/restaurant/Informations";
import RestaurantHeader from "@/components/restaurant/RestaurantHeader";
import RestaurantProducts from "@/components/restaurant/RestaurantProducts";
import Tabs from "@/components/restaurant/Tabs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const tabs = [
  { name: "KATEGORİLER", href: "#", current: false },
  { name: "MENÜ", href: "#", current: true },
  { name: "BİLGİLER", href: "#", current: false },
];
const Restaurant = () => {
  const restaurantsProducts = useSelector(
    ({ restaurants }) => restaurants.restaurantsProducts
  );

  useEffect(() => {
    const accountId = window.localStorage.getItem("accountId");
    getRestaurantsProducts(accountId);
  }, []);

  const openCart = useSelector(({ cart }) => cart.openCart);
  const [currentTab, setCurrentTab] = useState("MENÜ");
  return (
    <div className="mx-auto overflow-hidden max-w-7xl sm:px-6 lg:px-8">
      <RestaurantHeader />
      <hr className="w-full h-1 mx-auto my-4 border-0 rounded bg-ya-red md:my-10 dark:bg-ya-dark-red " />
      <Tabs tabs={tabs} setCurrentTab={setCurrentTab} currentTab={currentTab} />
      {currentTab === "KATEGORİLER" ? (
        <Categories
          restaurantsProducts={restaurantsProducts}
          setCurrentTab={setCurrentTab}
        />
      ) : currentTab === "MENÜ" ? (
        <RestaurantProducts restaurantsProducts={restaurantsProducts} />
      ) : (
        <Informations restaurantsProducts={restaurantsProducts} />
      )}
      {openCart === true && <Cart />}
    </div>
  );
};

export default Restaurant;
