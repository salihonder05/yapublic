"use client";
import { cartActions } from "@/app/Redux/features/cart-slice";
import store from "@/app/Redux/store";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

if (typeof window !== "undefined") {
  var cartProductsList = JSON.parse(window.localStorage.getItem("shop_cart"));
}
const CartItem = (product, key, index) => {
  const openCart = useSelector(({ cart }) => cart.openCart);
  const cartProducts = useSelector(({ cart }) => cart.cartProducts);
  const cartTotalPrice = useSelector(({ cart }) => cart.cartTotalPrice);
  const [openDetail, setOpenDetail] = useState(false);

  useEffect(() => {
    console.log("productproductproduct: ", product);
    if (typeof window !== "undefined") {
      cartProductsList = JSON.parse(window.localStorage.getItem("shop_cart"));
    }
  }, [cartProducts]);

  const changeTotalPrice = () => {
    let cartTotalPrice = 0;
    if (typeof window !== "undefined") {
      var cartProductsList = JSON.parse(
        window.localStorage.getItem("shop_cart")
      );
    }
    for (let index = 0; index < cartProductsList?.length; index++) {
      const element = cartProductsList[index];
      cartTotalPrice += element?.total_price * element.piece;
    }
    store.dispatch(cartActions.updateState({ cartTotalPrice: cartTotalPrice }));
  };

  const deleteFromCart = (productId) => {
    if (typeof window !== "undefined") {
      const cartProductsList = JSON.parse(
        window.localStorage.getItem("shop_cart")
      );
    }
    let newCart = [];
    let changedProd = [];

    for (let index = 0; index < cartProductsList.length; index++) {
      const element = cartProductsList[index];
      if (element?.id === productId && element?.piece > 1) {
        changedProd = { ...cartProductsList[index] };
        changedProd.piece = parseInt(element?.piece) - 1;
        newCart.push(changedProd);
      } else if (element?.id !== productId) {
        newCart.push(element);
      }
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem("shop_cart", JSON.stringify(newCart));
    }
    store.dispatch(cartActions.updateState({ cartProducts: newCart }));
    changeTotalPrice();
  };

  const changeCartProductCount = (productId, event) => {
    if (typeof window !== "undefined") {
      var cartProductsList = JSON.parse(
        window.localStorage.getItem("shop_cart")
      );
    }
    let newCart = [];
    let changedProd = [];

    for (let index = 0; index < cartProductsList.length; index++) {
      const element = cartProductsList[index];
      if (element?.id === productId || cartProductsList?.length < 1) {
        changedProd = { ...cartProductsList[index] };
        changedProd.piece = parseInt(event?.target?.value);
        newCart.push(changedProd);
      } else {
        newCart.push(element);
      }
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem("shop_cart", JSON.stringify(newCart));
    }
    store.dispatch(cartActions.updateState({ cartProducts: newCart }));
    changeTotalPrice();
  };

  return (
    <li
      key={product?.productId}
      className="p-2 my-2 rounded-md shadow-md bg-ya-yellow/10"
    >
      <div className="flex">
        <div className="flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md">
          <Image
            width={100}
            height={100}
            src={product?.product?.img_url}
            alt={product?.product?.img_url}
            priority
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div className="flex flex-col flex-1 ml-4">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <span>{product?.product?.product_name}</span>
              </h3>
              <p className="ml-4">{product?.product?.product_price}</p>
            </div>
            {/* <p className="mt-1 text-sm text-gray-500">
              {product?.product?.product?.product?.color}
            </p> */}
          </div>
          <div className="flex items-end justify-between flex-1 text-sm text-gray-500">
            <p>{product?.product?.piece}</p>
            <p>
              Total Ücret:{" "}
              {(
                product?.product?.total_price * product?.product?.piece
              ).toFixed(2)}
            </p>

            <div className="flex">
              {/* <label htmlFor={`quantity-${index}`} className="sr-only">
              Quantity, {product.name}
            </label> */}
              <select
                onChange={(event) =>
                  changeCartProductCount(product?.product?.id, event)
                }
                id={`quantity-${index}`}
                name={`quantity-${index}`}
                className="block max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-ya-yellow focus:outline-none focus:ring-1 focus:ring-ya-yellow sm:text-sm"
              >
                <option value={product?.product?.piece} selected>
                  {product?.product?.piece}
                </option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </select>
              <button
                type="button"
                className="ml-8 font-medium text-ya-red hover:text-ya-dark-red"
                onClick={() => deleteFromCart(product?.product?.id)}
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex items-center justify-center w-1/5 mx-auto mt-2 text-white rounded-md cursor-pointer bg-ya-yellow"
        onClick={() => setOpenDetail(!openDetail)}
      >
        <span className="ml-1">detay</span>
        {openDetail ? (
          <ChevronUpIcon className="w-4 h-4" />
        ) : (
          <ChevronDownIcon className="w-4 h-4" />
        )}
      </div>

      {openDetail && (
        <div>
          {product?.product?.selected?.map((pr, index) => (
            <div key={index}>
              <span className="font-semibold text-md">{pr?.menu_name}:</span>
              {pr?.menu_type === 3 ? (
                <>
                  <span className="ml-1 text-sm font-semibold text-ya-dark-yellow">
                    {pr?.selected?.product?.product_name}
                  </span>
                  {pr?.selected?.selected?.map((prS, index) => (
                    <div className="flex flex-col" key={index}>
                      <span className="text-sm font-semibold text-ya-red">
                        {prS.menu_name}:{" "}
                      </span>
                      {Array.isArray(prS.selected) ? (
                        <>
                          {prS.selected.map((lpr) => (
                            <div
                              key={lpr?.id}
                              className="text-xs font-semibold"
                            >
                              {lpr?.product?.product_name}
                            </div>
                          ))}
                        </>
                      ) : (
                        <div className="text-xs font-semibold">
                          {prS?.selected?.product?.product_name}
                        </div>
                      )}
                    </div>
                  ))}
                </>
              ) : pr?.menu_type === 2 || pr?.menu_type === 4 ? (
                <>
                  <div>{pr?.selected?.product?.product_name}</div>
                  {pr?.selected?.map((prS) => (
                    <span
                      key={prS?.id}
                      className="text-xs font-semibold text-ya-dark-yellow"
                    >
                      {prS?.product?.product_name}
                    </span>
                  ))}
                </>
              ) : (
                <div className="text-sm font-semibold text-ya-dark-yellow">
                  {pr?.selected?.product?.product_name}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </li>
  );
};

export default CartItem;
