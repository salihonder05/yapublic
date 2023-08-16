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
if (typeof window !== "undefined") {
  var selectedNeighbourhood = window.localStorage?.getItem(
    "selectedNeighbourhood"
  );
}
export default function Restaurants() {
  const [loading, setLoading] = useState(true);
  // const [restaurants, setRestaurants] = useState();
  const restaurants = useSelector(({ restaurants }) => restaurants.restaurants);
  const neighbourhoods = useSelector(
    ({ restaurants }) => restaurants.neighbourhoods
  );
  useEffect(() => {
    // 2 saniye sonra yükleniyor durumunu kapat
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  // console.log(
  //   "selectedNeighbourhoodselectedNeighbourhood:",
  //   selectedNeighbourhood.id
  // );

  // const getNeighborhoodRestaurants = async () => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:3000/api/neighborhoodrestaurants",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ neighborhoodId: selectedNeighbourhood }),
  //       }
  //     );
  //     const data = await response.json(); // response.json() işlemini await anahtar kelimesiyle kullanın
  //     if (response.ok) {
  //       const notNullNeighborhood =
  //         await data.data.data.delivery_point_neighborhood.filter(
  //           (neigh) => neigh.point_account !== null
  //         );
  //       store.dispatch(
  //         restaurantsActions.updateState({ restaurants: notNullNeighborhood })
  //       );
  //       // console.log("notNullNeighborhood: ", notNullNeighborhood);

  //       // Auth();
  //       // dispatch(authActions.updateState({ authModalOpen: false }));
  //     }
  //   } catch (error) {
  //     console.error("Error fetching customer list:", error);
  //   }
  // };

  useEffect(() => {
    getNeighborhoodRestaurants(selectedNeighbourhood).finally(
      setLoading(false)
    );
    getNeighbourhoods();
  }, []);

  console.log("restaurantsrestaurants:  ", restaurants);

  return (
    <>
      {restaurants.length > 0 && !loading ? (
        <div className="bg-white">
          <div className="max-w-2xl px-4 mx-auto sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
            {/* <OrderTypeChoices
          selectedType={selectedType}
          setselectedType={setselectedType}
        /> */}
            {/* <AddressesBreadCrumps /> */}
            {/* <NeighborhoodList /> */}
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
            <div className="flex-col flex justify-center">
              <label className="text-center font-semibold text-ya-red">
                Hay aksi!
              </label>
              <label className="text-center font-semibold text-ya-red">
                Konumuna yakın bir restaurant olmadığını fark ettim.
              </label>
              <label className="text-center font-semibold text-ya-green">
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
