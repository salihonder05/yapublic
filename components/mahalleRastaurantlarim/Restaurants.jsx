"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getNeighborhoodRestaurants,
  getNeighbourhoods,
} from "../data/query/query";
import RestaurantsCard from "../parts/RestaurantsCard";
import Lottie from "react-lottie";
import animationData from "../../components/lotties/no-result";
import OrderTypeChoices from "../parts/OrderTypeChoices";
import AddressesBreadCrumps from "../parts/addressesBreadCrumps/AddressesBreadCrumps";
import NeighborhoodList from "../parts/neighbourhoodsList/NeighborhoodList";

export default function Restaurants({
  selectedType,
  setSelectedType,
  restaurants,
  noRestaurant,
}) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      {!noRestaurant ? (
        <div className="bg-white">
          <div className="max-w-2xl px-4 mx-auto sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
            <OrderTypeChoices
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
            <AddressesBreadCrumps />
            <NeighborhoodList />
            <div className="grid grid-cols-1 mt-8 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {restaurants?.map((restaurant) => (
                <RestaurantsCard restaurant={restaurant} key={restaurant?.id} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white">
          <div className="max-w-2xl px-4 mx-auto sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
            <Lottie options={defaultOptions} height={400} width={400} />
            <div className="flex flex-col justify-center">
              <label className="font-semibold text-center text-ya-red">
                Hay aksi!
              </label>
              <label className="font-semibold text-center text-ya-red">
                Konumuna yakın bir aktif restaurant olmadığını fark ettik.
              </label>
              <label className="font-semibold text-center text-ya-green">
                Merak etme en yakın zamanda bulunduğun konumda bir restaurant
                olması için elimizden geleni yapıyor olacağız.
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
