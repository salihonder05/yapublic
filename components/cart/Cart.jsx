"use client";

import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import store from "@/app/Redux/store";
import { cartActions } from "@/app/Redux/features/cart-slice";
import { useSelector } from "react-redux";
import { getSingleProduct } from "../data/query/query";
import CartItem from "./components/CartItem";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Çikolata Füzyonu",
    href: "#",
    color: "Salmon",
    price: "₺120.00",
    quantity: 1,
    imageSrc:
      "https://www.kikkoman.com.tr/fileadmin/_processed_/e/f/csm_WEB_Chocolate_soy_sauce_candy_1a77f2f5e2.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Taze Deniz Ürünleri Salatası",
    href: "#",
    color: "Blue",
    price: "₺110.00",
    quantity: 1,
    imageSrc:
      "https://balikdunyasi.com.tr/wp-content/uploads/2021/06/deniz-urunleri-salatasi-2.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];
let cartProductsList = JSON.parse(localStorage.getItem("cartProducts"));
export default function Cart() {
  const openCart = useSelector(({ cart }) => cart.openCart);
  const cartProducts = useSelector(({ cart }) => cart.cartProducts);
  const cartTotalPrice = useSelector(({ cart }) => cart.cartTotalPrice);

  const closeCartHandler = () => {
    store.dispatch(cartActions.updateState({ openCart: false }));
  };

  useEffect(() => {
    cartProductsList = JSON.parse(localStorage.getItem("cartProducts"));
  }, [cartProducts]);

  return (
    <Transition.Root show={openCart} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeCartHandler}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="w-screen max-w-md pointer-events-auto">
                  <div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 px-4 py-6 overflow-y-auto sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="flex items-center ml-3 h-7">
                          <button
                            type="button"
                            className="p-2 -m-2 text-gray-400 hover:text-gray-500"
                            onClick={closeCartHandler}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cartProducts?.map((product, index) => (
                              <CartItem
                                key={index}
                                product={product}
                                index={index}
                              />
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Toplam</p>
                        <p>{cartTotalPrice}₺</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        kargo ücreti ödeme sırasında dahil edilecektir
                      </p>
                      <div className="mt-6">
                        <Link
                          href="/siparisiTamamla"
                          className="flex items-center justify-center px-6 py-3 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-ya-red hover:bg-ya-dark-red"
                        >
                          Siparişi tamamla
                        </Link>
                      </div>
                      <div className="flex justify-center mt-6 text-sm text-center text-gray-500">
                        <p>
                          ya da
                          <button
                            type="button"
                            className="ml-1 font-medium text-ya-yellow hover:text-ya-dark-yellow"
                            onClick={closeCartHandler}
                          >
                            alışverişe devam et
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
