"use client";
import { useSelector } from "react-redux";

export default function Categories({ setCurrentTab }) {
  const restaurantsProducts = useSelector(
    ({ restaurants }) => restaurants.restaurantsProducts
  );
  const goToCategory = (category) => {
    setCurrentTab("MENÜ");
  };
  return (
    <div>
      <ul role="list" className="divide-y divide-gray-100">
        {restaurantsProducts?.map((products) => (
          <li
            key={products?.product_group_main?.main_group_name}
            className="flex items-center justify-between py-5 gap-x-6"
          >
            <div className="flex gap-x-4">
              <div className="flex items-center min-w-0">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {products?.product_group_main?.main_group_name}
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                goToCategory(products?.product_group_main?.main_group_name)
              }
              className="px-5 py-1 text-xs font-semibold text-black rounded-full shadow-sm bg-ya-dark-white-3 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              {products?.products.length} Ürün
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
