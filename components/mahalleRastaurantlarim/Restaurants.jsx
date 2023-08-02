"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getNeighborhoodRestaurants,
  getNeighbourhoods,
} from "../data/query/query";
import AddressesBreadCrumps from "../parts/addressesBreadCrumps/AddressesBreadCrumps";
import NeighborhoodList from "../parts/neighbourhoodsList/NeighborhoodList";
import RestaurantsCard from "../parts/RestaurantsCard";

const products = [
  {
    id: 1,
    name: "Zip Tote Basket",
    color: "White and black",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "$140",
  },
  {
    id: 1,
    name: "Zip Tote Basket",
    color: "White and black",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "$140",
  },
  {
    id: 1,
    name: "Zip Tote Basket",
    color: "White and black",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "$140",
  },
  {
    id: 1,
    name: "Zip Tote Basket",
    color: "White and black",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "$140",
  },
  {
    id: 1,
    name: "Zip Tote Basket",
    color: "White and black",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "$140",
  },
  {
    id: 1,
    name: "Zip Tote Basket",
    color: "White and black",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "$140",
  },
  // More products...
];
if (typeof window !== "undefined") {
  var selectedNeighbourhood = window.localStorage?.getItem(
    "selectedNeighbourhood"
  );
}
export default function Restaurants() {
  // const [restaurants, setRestaurants] = useState();
  const restaurants = useSelector(({ restaurants }) => restaurants.restaurants);

  const neighbourhoods = useSelector(
    ({ restaurants }) => restaurants.neighbourhoods
  );
  // console.log(
  //   "selectedNeighbourhoodselectedNeighbourhood:",
  //   selectedNeighbourhood.id
  // );

  // const getNeighborhoodRestaurants = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://yapublic.vercel.app/api/neighborhoodrestaurants",
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
    getNeighborhoodRestaurants(selectedNeighbourhood);
    getNeighbourhoods();
  }, []);

  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 mx-auto sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <AddressesBreadCrumps />
        <NeighborhoodList />
        <div className="grid grid-cols-1 mt-8 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {restaurants?.map((restaurant) => (
            <RestaurantsCard restaurant={restaurant} key={restaurant?.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
