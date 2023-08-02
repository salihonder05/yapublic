"use client";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import Logo from "@/components/parts/Logo";
import ButtonPrimary from "@/components/parts/buttons/ButtonPrimary";
import ButtonSecondaryIcon from "@/components/parts/buttons/ButtonSecondaryIcon";
import AccountMenu from "@/components/parts/AccountMenu/AccountMenu";
import { useSelector } from "react-redux";
import CitiesSelectMenu from "../../parts/addressesBreadCrumps/components/Cities";

import { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import TownsSelectMenu from "../../parts/addressesBreadCrumps/components/Towns";
import { cartActions } from "@/app/Redux/features/cart-slice";
import store from "@/app/Redux/store";
import Link from "next/link";
import Image from "next/image";

const user = {
  name: "Chelsea Hagon",
  email: "chelsea.hagon@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Calendar", href: "#", current: false },
  { name: "Teams", href: "#", current: false },
  { name: "Directory", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// const navigation = [
//   { name: "Product", href: "#" },
//   { name: "Features", href: "#" },
//   { name: "Marketplace", href: "#" },
//   { name: "Company", href: "#" },
// ];
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openCartHandler = () => {
    let cartTotalPrice = 0;

    var cartProductsList = JSON.parse(
      window.localStorage.getItem("cartProducts")
    );
    for (let index = 0; index < cartProductsList?.length; index++) {
      const element = cartProductsList[index];
      cartTotalPrice = cartTotalPrice + element?.price;
    }

    store.dispatch(cartActions.updateState({ openCart: true }));
    store.dispatch(cartActions.updateState({ cartProducts: cartProductsList }));
    store.dispatch(cartActions.updateState({ cartTotalPrice: cartTotalPrice }));
  };

  return (
    <>
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
                      <Logo classes="w-auto h-6"></Logo>
                    </Link>
                  </div>
                </div>
                <div className="flex-1 min-w-0 md:px-8 lg:px-0 xl:col-span-6">
                  <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
                    <div className="relative">
                      {/* <CitiesSelectMenu setCityId={setCityId} />
                      {cityId > 0 && <TownsSelectMenu cityId={cityId} />} */}
                    </div>
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

            <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
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
            </Popover.Panel>
          </>
        )}
      </Popover>
    </>
    // <header className="bg-white">
    //   <nav
    //     className="flex items-center justify-between p-6 mx-auto max-w-7xl gap-x-6 lg:px-8"
    //     aria-label="Global"
    //   >
    //     <div className="flex lg:flex-1">
    //       <Link  href="/" className="-m-1.5 p-1.5">
    //         <span className="sr-only">Yemek Arena Anasayfa</span>
    //         {/* <Image className="w-auto h-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" /> */}
    //         <Logo classes="w-auto h-6"></Logo>
    //       </Link>
    //     </div>
    //     <div className="hidden lg:flex lg:gap-x-12">
    //       <CitiesSelectMenu />
    //     </div>
    //     <div className="flex items-center justify-end flex-1 gap-x-6">
    //       <AccountMenu />
    //       <ButtonSecondaryIcon>
    //         <ShoppingCartIcon
    //           className="-ml-0.5 h-4 w-auto inline-flex"
    //           aria-hidden="true"
    //         />{" "}
    //         Sepet
    //       </ButtonSecondaryIcon>
    //     </div>
    //     <div className="flex lg:hidden">
    //       <button
    //         type="button"
    //         className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
    //         onClick={() => setMobileMenuOpen(true)}
    //       >
    //         <span className="sr-only">Open main menu</span>
    //         <Bars3Icon className="w-6 h-6" aria-hidden="true" />
    //       </button>
    //     </div>
    //   </nav>
    //   <Dialog
    //     as="div"
    //     className="lg:hidden"
    //     open={mobileMenuOpen}
    //     onClose={setMobileMenuOpen}
    //   >
    //     <div className="fixed inset-0 z-10" />
    //     <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
    //       <div className="flex items-center gap-x-6">
    //         <Link  href="#" className="-m-1.5 p-1.5">
    //           <span className="sr-only">Your Company</span>
    //           <Image
    //             className="w-auto h-8"
    //             src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
    //             alt=""
    //           />
    //         </Link>
    //         {/* <Link
    //           href="#"
    //           className="px-3 py-2 ml-auto text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //         >
    //           Sign up
    //         </Link> */}
    //         <ButtonPrimary>KAYIT OL</ButtonPrimary>
    //         <button
    //           type="button"
    //           className="-m-2.5 rounded-md p-2.5 text-gray-700"
    //           onClick={() => setMobileMenuOpen(false)}
    //         >
    //           <span className="sr-only">Close menu</span>
    //           <XMarkIcon className="w-6 h-6" aria-hidden="true" />
    //         </button>
    //       </div>
    //       <div className="flow-root mt-6">
    //         <div className="-my-6 divide-y divide-gray-500/10">
    //           <div className="py-6 space-y-2">
    //             {navigation.map((item) => (
    //               <Link
    //                 key={item.name}
    //                 href={item?.href}
    //                 className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50"
    //               >
    //                 {item.name}
    //               </Link>
    //             ))}
    //           </div>
    //           <div className="py-6">
    //             <Link
    //               href="#"
    //               className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
    //             >
    //               Log in
    //             </Link>
    //           </div>
    //         </div>
    //       </div>
    //     </Dialog.Panel>
    //   </Dialog>
    // </header>
  );
}
