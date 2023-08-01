"use client";

import Cart from "@/components/cart/Cart";
import { getCityRestaurants } from "@/components/data/query/query";
import AddressesBreadCrumps from "@/components/parts/addressesBreadCrumps/AddressesBreadCrumps";
import NeighborhoodList from "@/components/parts/neighbourhoodsList/NeighborhoodList";
import RestaurantsCard from "@/components/parts/RestaurantsCard";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
  // const [restaurants, setRestaurants] = useState();
  const restaurants = useSelector(({ restaurants }) => restaurants.restaurants);
  const openCart = useSelector(({ cart }) => cart.openCart);
  const localStorageCity = JSON.parse(localStorage.getItem("selectedCity"));

  useEffect(() => {
    getCityRestaurants();
  }, []);

  return (
    <main>
      <div className="bg-white">
        <div className="max-w-2xl px-4 mx-auto sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
          <div className="max-w-full mx-auto lg:mx-0">
            <AddressesBreadCrumps />
            <NeighborhoodList />
            {/* Buraya mahalle gelebilir */}
          </div>
          {/* <div className="max-w-full mx-auto lg:mx-0">
            <h1>{localStorageCity?.name}</h1>
          </div> */}
          <div className="grid grid-cols-1 mt-8 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {restaurants?.map((restaurant, index) => (
              <RestaurantsCard restaurant={restaurant} key={index} />
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
  )
}