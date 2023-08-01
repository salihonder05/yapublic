"use client";
import { cartActions } from "@/app/Redux/features/cart-slice";
import store from "@/app/Redux/store";
import Image from "next/image";
import { useEffect } from "react";
import { useSelector } from "react-redux";

let cartProductsList = JSON.parse(localStorage.getItem("cartProducts"));
const CartItem = (product, key, index) => {
  const openCart = useSelector(({ cart }) => cart.openCart);
  const cartProducts = useSelector(({ cart }) => cart.cartProducts);
  const cartTotalPrice = useSelector(({ cart }) => cart.cartTotalPrice);

  console.log("CartItem product: ", product);

  useEffect(() => {
    cartProductsList = JSON.parse(localStorage.getItem("cartProducts"));
  }, [cartProducts]);

  const deleteFromCart = (productId) => {
    const cartProductsList = JSON.parse(localStorage.getItem("cartProducts"));
    let newCart = [];
    let changedProd = [];

    for (let index = 0; index < cartProductsList.length; index++) {
      const element = cartProductsList[index];
      if (element?.productId === productId && element?.adet > 1) {
        changedProd = {
          accountId: element.accountId,
          img: element.img,
          adet: parseInt(element?.adet) - 1,
          price: element.singlePrice * (parseInt(element?.adet) - 1),
          singlePrice: element.singlePrice,
          productId: element.productId,
          productName: element.productName,
        };
        newCart.push(changedProd);
      } else if (element?.productId !== productId) {
        newCart.push(element);
      }
    }

    localStorage.setItem("cartProducts", JSON.stringify(newCart));
    store.dispatch(cartActions.updateState({ cartProducts: newCart }));
    changeTotalPrice();
  };

  const changeTotalPrice = () => {
    let cartTotalPrice = 0;

    var cartProductsList = JSON.parse(localStorage.getItem("cartProducts"));
    for (let index = 0; index < cartProductsList?.length; index++) {
      const element = cartProductsList[index];
      cartTotalPrice = cartTotalPrice + element?.price;
    }
    store.dispatch(cartActions.updateState({ cartTotalPrice: cartTotalPrice }));
  };

  const changeCartProductCount = (productId, event) => {
    const cartProductsList = JSON.parse(localStorage.getItem("cartProducts"));
    let newCart = [];
    let changedProd = [];

    for (let index = 0; index < cartProductsList.length; index++) {
      const element = cartProductsList[index];
      if (element?.productId === productId || cartProductsList?.length < 1) {
        changedProd = {
          accountId: element.accountId,
          img: element.img,
          adet: event?.target?.value,
          price: element.singlePrice * event?.target?.value,
          singlePrice: element.singlePrice,
          productId: element.productId,
          productName: element.productName,
        };
        newCart.push(changedProd);
      } else {
        newCart.push(element);
      }
    }

    localStorage.setItem("cartProducts", JSON.stringify(newCart));
    store.dispatch(cartActions.updateState({ cartProducts: newCart }));
    changeTotalPrice();
  };

  return (
    <li key={product?.product?.productId} className="flex py-6">
      <div className="flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md">
        <Image
          width={100}
          height={100}
          src={product?.product?.img}
          alt={product?.product?.img}
          priority
          className="object-cover object-center w-full h-full"
        />
      </div>

      <div className="flex flex-col flex-1 ml-4">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <span>{product?.product?.productName}</span>
            </h3>
            <p className="ml-4">{product?.product?.price}</p>
          </div>
          {/* <p className="mt-1 text-sm text-gray-500">
              {product?.product?.color}
            </p> */}
        </div>
        <div className="flex items-end justify-between flex-1 text-sm">
          <p className="text-gray-500">{product?.product?.adet}</p>

          <div className="flex">
            <label htmlFor={`quantity-${index}`} className="sr-only">
              Quantity, {product.name}
            </label>
            <select
              onChange={(event) =>
                changeCartProductCount(product?.product?.productId, event)
              }
              id={`quantity-${index}`}
              name={`quantity-${index}`}
              className="block max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            >
              <option value={product?.product?.adet} selected>
                {product?.product?.adet}
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
              onClick={() => deleteFromCart(product?.product?.productId)}
            >
              Sil
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
