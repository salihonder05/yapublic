"use client";

import Cart from "@/components/cart/Cart";
import { getCityRestaurants } from "@/components/data/query/query";
import AddressesBreadCrumps from "@/components/parts/addressesBreadCrumps/AddressesBreadCrumps";
import NeighborhoodList from "@/components/parts/neighbourhoodsList/NeighborhoodList";
import RestaurantsCard from "@/components/parts/RestaurantsCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Lottie from "react-lottie";
import animationData from "../components/lotties/catal-bicak-loading";
import OrderTypeChoices from "@/components/parts/OrderTypeChoices";


export default function Home() {
  // const [restaurants, setRestaurants] = useState();
  const [selectedType, setSelectedType] = useState(1);

  const restaurants = useSelector(({ restaurants }) => restaurants.restaurants);
  const [loading, setLoading] = useState(true);
  const openCart = useSelector(({ cart }) => cart.openCart);
  if (typeof window !== 'undefined') {
    var localStorageCity = JSON.parse(window.localStorage.getItem("selectedCity"));
  }
  const activeCardAccount = useSelector(
    ({ restaurants }) => restaurants.activeCardAccount
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("ChoseeType", JSON.stringify(selectedType));
    }
    // 2 saniye sonra yükleniyor durumunu kapat
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);



  useEffect(() => {
    getCityRestaurants(selectedType);
  }, [selectedType]);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      {!loading ? (
        <main>
          <div className="bg-white">
            <div className="max-w-2xl px-4 mx-auto sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
              <div className="max-w-full mx-auto lg:mx-0">
                <OrderTypeChoices
                  selectedType={selectedType}
                  setSelectedType={setSelectedType}
                />
                <AddressesBreadCrumps mainSelectedType={selectedType} />
                <NeighborhoodList />
                {/* Buraya mahalle gelebilir */}
              </div>
              {/* <div className="max-w-full mx-auto lg:mx-0">
            <h1>{localStorageCity?.name}</h1>
          </div> */}
              <div className="grid grid-cols-1 mt-8 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                {restaurants?.map((restaurant, index) => (
                  <RestaurantsCard restaurant={restaurant} key={restaurant?.id} />
                ))}
              </div>
            </div>
          </div>
          {
            openCart === true && (
              <Cart />
            )
          }
        </main>
      ) : (
        <div>
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      )}
    </div>
  )
}