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
import Lottie from "react-lottie";
import animationData from "../../components/lotties/food-upload-gif";

const tabs = [
  { name: "KATEGORİLER", href: "#", current: false },
  { name: "MENÜ", href: "#", current: true },
  { name: "BİLGİLER", href: "#", current: false },
];
const Restaurant = () => {
  const restaurantsProducts = useSelector(
    ({ restaurants }) => restaurants.restaurantsProducts
  );
  const singleAccount = useSelector(
    ({ restaurants }) => restaurants.singleAccount
  );
  const [loading, setLoading] = useState(true);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    // 2 saniye sonra yükleniyor durumunu kapat
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      var accountId = window.localStorage.getItem("accountId");
    }
    getRestaurantsProducts(accountId);
  }, []);

  const openCart = useSelector(({ cart }) => cart.openCart);
  const [currentTab, setCurrentTab] = useState("MENÜ");
  return (
    <>
      {!loading ? (
        <div className="mx-auto overflow-hidden max-w-7xl sm:px-6 lg:px-8">
          <RestaurantHeader />
          <hr className="w-full h-1 mx-auto my-4 border-0 rounded bg-ya-red md:my-10 dark:bg-ya-dark-red " />
          <Tabs
            tabs={tabs}
            setCurrentTab={setCurrentTab}
            currentTab={currentTab}
          />
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
      ) : (
        <div>
          <Lottie options={defaultOptions} height={500} width={500} />
        </div>
      )}
    </>
  );
};

export default Restaurant;
