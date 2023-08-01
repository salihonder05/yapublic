"use client";
import { StarIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getRestaurantsProducts } from "../data/query/query";
import ProductsList from "./components/ProductsList";

const products = [
  {
    id: 1,
    name: "Organize Basic Set (Walnut)",
    price: "$149",
    rating: 5,
    reviewCount: 38,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-01.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 2,
    name: "Organize Pen Holder",
    price: "$15",
    rating: 5,
    reviewCount: 18,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-02.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 3,
    name: "Organize Sticky Note Holder",
    price: "$15",
    rating: 5,
    reviewCount: 14,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-03.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 4,
    name: "Organize Phone Holder",
    price: "$15",
    rating: 4,
    reviewCount: 21,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-04.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 1,
    name: "Organize Basic Set (Walnut)",
    price: "$149",
    rating: 5,
    reviewCount: 38,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-01.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 2,
    name: "Organize Pen Holder",
    price: "$15",
    rating: 5,
    reviewCount: 18,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-02.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 3,
    name: "Organize Sticky Note Holder",
    price: "$15",
    rating: 5,
    reviewCount: 14,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-03.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  {
    id: 4,
    name: "Organize Phone Holder",
    price: "$15",
    rating: 4,
    reviewCount: 21,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-04.jpg",
    imageAlt: "TODO",
    href: "#",
  },
  // More products...
];

export default function RestaurantProducts({ restaurantsProducts }) {
  // const [restaurantsProducts, setRestaurantsProducts] = useState();

  // const getRestaurantsProducts = async (accountId) => {
  //   try {
  //     const response = await fetch(
  //       "http://localhost:3000/api/accountproducts",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ accountId: accountId }),
  //       }
  //     );
  //     const data = await response.json(); // response.json() işlemini await anahtar kelimesiyle kullanın
  //     if (response.ok) {
  //       // const notNullCity = await data.data.data.delivery_point_city.filter(
  //       //   (neigh) => neigh.point_account !== null
  //       // );
  //       setRestaurantsProducts(data?.token?.data?.product_groups);
  //       // console.log("notNullCity: ", data?.token?.data?.product_groups);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching customer list:", error);
  //   }
  // };

  useEffect(() => {
    const accountId = localStorage.getItem("accountId");
    getRestaurantsProducts(accountId);
  }, []);

  return (
    <div className="bg-white">
      {/* <div className="mx-auto overflow-hidden max-w-7xl sm:px-6 lg:px-8"> */}
      {/* <h2 className="sr-only">RestaurantProducts</h2> */}
      <div className="grid grid-cols-1 -mx-px rounded-md sm:mx-0 md:grid-cols-1 lg:grid-cols-1">
        {restaurantsProducts?.map((product) => (
          <ProductsList product={product} key={product.id} />
        ))}
      </div>
      {/* </div> */}
    </div>
  );
}
