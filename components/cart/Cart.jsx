"use client";

import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import store from "@/app/Redux/store";
import { cartActions } from "@/app/Redux/features/cart-slice";
import { useSelector } from "react-redux";
import { getAccountDetail } from "../data/query/query";
import CartItem from "./components/CartItem";
import Link from "next/link";
import CartHeader from "./components/CartHeader";
import Logo from "../parts/Logo";
import Lottie from "react-lottie";
import animationData from "../../components/lotties/empty-cart";
import { TrashIcon } from "@heroicons/react/20/solid";
import Swal from "sweetalert2";
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
if (typeof window !== "undefined") {
  var cartProductsList = JSON.parse(
    window.localStorage.getItem("cartProducts")
  );
  var shopCartL = JSON.parse(window.localStorage.getItem("shop_cart"));
  var accountId = JSON.parse(window.localStorage.getItem("accountId"));
  var active_shop_account_id = JSON.parse(
    window.localStorage.getItem("active_shop_card_account")
  );
}

export default function Cart() {
  const openCart = useSelector(({ cart }) => cart.openCart);
  const cartProducts = useSelector(({ cart }) => cart.cartProducts);
  const cartTotalPrice = useSelector(({ cart }) => cart.cartTotalPrice);
  const shopCart = useSelector(({ cart }) => cart.shopCart);
  const activeCardAccount = useSelector(
    ({ restaurants }) => restaurants.activeCardAccount
  );
  const [cartAccountId, setCartAccountId] = useState(active_shop_account_id);

  const closeCartHandler = () => {
    store.dispatch(cartActions.updateState({ openCart: false }));
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      var active_shop_account_idL = JSON.parse(
        window.localStorage.getItem("active_shop_card_account")
      );
      setCartAccountId(active_shop_account_idL);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      cartProductsList = JSON.parse(
        window.localStorage.getItem("cartProducts")
      );
    }
    changeTotalPrice();
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
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const removeCart = () => {
    Swal.fire({
      title: "Emin misiniz?",
      text: "Sepetinizdeki tüm ürünleri kaybedeceksiniz ve bu işlem geri alınamaz.",
      icon: "error",
      showCancelButton: true,
      cancelButtonColor: "#AD3A41",
      confirmButtonColor: "#13B15C",
      confirmButtonText: "SEPETİ SİL",
      cancelButtonText: "İPTAL",
    }).then(async (result) => {
      // Redirect the user
      if (result.isConfirmed) {
        if (typeof window !== "undefined") {
          window.localStorage.removeItem("active_shop_card_account");
          window.localStorage.removeItem("shop_cart");
        }
        store.dispatch(cartActions.updateState({ cartTotalPrice: 0 }));
        setCartAccountId();
      }
    });
  };

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
                    {cartAccountId ? (
                      <div className="flex-1 px-2 py-2 overflow-y-auto sm:px-6">
                        <div className="flex items-center justify-center p-2 my-2 rounded-md bg-ya-red hover:bg-ya-dark-red">
                          <TrashIcon className="w-5 h-5 text-white" />
                          <button
                            onClick={() => removeCart()}
                            className="p-2 text-white rounded-md"
                          >
                            SEPETİ TEMİZLE
                          </button>
                        </div>

                        <CartHeader account={activeCardAccount} />
                        <div>
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="divide-y divide-gray-200"
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
                    ) : (
                      <Lottie options={defaultOptions} />
                    )}
                    <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
                      <div className="flex justify-between p-2 text-base font-medium rounded-md text-ya-yellow bg-ya-soft-black">
                        <p>Toplam Tutar</p>
                        <p>{cartTotalPrice ? cartTotalPrice.toFixed(2) : 0}₺</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        kargo ücreti ödeme sırasında dahil edilecektir
                      </p>
                      <div className="mt-6">
                        <Link
                          href="/siparisiTamamla"
                          className="flex items-center justify-center px-6 py-3 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-ya-green hover:bg-ya-dark-green"
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
