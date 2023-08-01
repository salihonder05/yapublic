"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCityRestaurants } from "../data/query/query";
import AddressesBreadCrumps from "../parts/addressesBreadCrumps/AddressesBreadCrumps";
import NeighborhoodList from "../parts/neighbourhoodsList/NeighborhoodList";
import RestaurantsCard from "../parts/RestaurantsCard";

export default function CitiesRestaurants() {
  // const [restaurants, setRestaurants] = useState();
  const restaurants = useSelector(({ restaurants }) => restaurants.restaurants);
  const localStorageCity = JSON.parse(localStorage.getItem("selectedCity"));
  // console.log("localStorageCity: ", localStorageCity);
  // const getCityRestaurants = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/api/cityrestaurant", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ cityId: localStorageCity?.id }),
  //     });
  //     const data = await response.json(); // response.json() işlemini await anahtar kelimesiyle kullanın
  //     if (response.ok) {
  //       const notNullCity = await data.data.data.delivery_point_city.filter(
  //         (neigh) => neigh.point_account !== null
  //       );
  //       setRestaurants(notNullCity);
  //       console.log("notNullCity: ", notNullCity);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching customer list:", error);
  //   }
  // };

  useEffect(() => {
    getCityRestaurants();
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 mx-auto sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <div className="max-w-full mx-auto lg:mx-0">
          <AddressesBreadCrumps />
          <NeighborhoodList />
          {/* Buraya mahalle gelebilir */}
        </div>
        <div className="max-w-full mx-auto lg:mx-0">
          <h1>{localStorageCity?.name}</h1>
        </div>
        <div className="grid grid-cols-1 mt-8 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {restaurants?.map((restaurant, index) => (
            <RestaurantsCard restaurant={restaurant} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
