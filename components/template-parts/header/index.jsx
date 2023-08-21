"use client"; 
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import Logo from "@/components/parts/Logo";
import ButtonSecondaryIcon from "@/components/parts/buttons/ButtonSecondaryIcon";
import AccountMenu from "@/components/parts/AccountMenu/AccountMenu";

import { Popover } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { cartActions } from "@/app/Redux/features/cart-slice";
import store from "@/app/Redux/store";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Header() {
  
  const openCartHandler = () => {
    let cartTotalPrice = 0;

    if (typeof window !== "undefined") {
      var cartProductsList = JSON.parse(
        window.localStorage.getItem("shop_cart")
      );
    }
    for (let index = 0; index < cartProductsList?.length; index++) {
      const element = cartProductsList[index];
      cartTotalPrice = cartTotalPrice + element?.price;
    }

    store.dispatch(cartActions.updateState({ openCart: true }));
    store.dispatch(cartActions.updateState({ cartProducts: cartProductsList }));
    store.dispatch(cartActions.updateState({ cartTotalPrice: cartTotalPrice }));
  };


  return (
    <nav className="sticky top-0 z-10">
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <Popover
        as="header"
        className={({ open }) =>
          classNames(
            open ? "fixed inset-0 z-40 overflow-y-auto" : "",
            "bg-white py-2 shadow-sm lg:static lg:overflow-y-visible"
          )
        }
      >
        {({ open }) => (
          <>
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
                <div className="flex md:absolute md:inset-y-0 md:left-0 lg:static xl:col-span-2">
                  <div className="flex items-center flex-shrink-0">
                    <Link href="/">
                      <Logo classes="w-auto h-6" />
                    </Link>
                  </div>
                </div>
                <div className="flex-1 min-w-0 md:px-8 lg:px-0 xl:col-span-6">
                  <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
                    <div className="relative"></div>
                  </div>
                </div>
                <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="inline-flex items-center justify-center p-2 -mx-2 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>
                <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
                  {/* <Link
                    href="#"
                    className="flex-shrink-0 p-1 ml-5 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="w-6 h-6" aria-hidden="true" />
                  </Link> */}
                  <AccountMenu className="ml-5" />
                  <ButtonSecondaryIcon
                    className="px-3 ml-5"
                    handleOnClick={openCartHandler}
                  >
                    <ShoppingCartIcon
                      className="-ml-0.5 h-4 w-auto inline-flex"
                      aria-hidden="true"
                    />{" "}
                    Sepet
                  </ButtonSecondaryIcon>
                </div>
              </div>
            </div>

            {/* <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
              <div className="max-w-3xl px-2 pt-2 pb-3 mx-auto space-y-1 sm:px-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item?.href}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-100 text-gray-900"
                        : "hover:bg-gray-50",
                      "block rounded-md py-2 px-3 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center max-w-3xl px-4 mx-auto sm:px-6">
                  <div className="flex-shrink-0">
                    <Image
                      width={100}
                      height={100}
                      className="w-10 h-10 rounded-full"
                      src={user.imageUrl}
                      priority
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="flex-shrink-0 p-1 ml-auto text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="max-w-3xl px-2 mx-auto mt-3 space-y-1 sm:px-4">
                  {userNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item?.href}
                      className="block px-3 py-2 text-base font-medium text-gray-500 rounded-md hover:bg-gray-50 hover:text-gray-900"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </Popover.Panel> */}
          </>
        )}
      </Popover>
    </nav>
  );
}
