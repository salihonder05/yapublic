"use client";

import { Fragment } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/app/Redux/features/auth-slice";
import AuthModal from "../authModal/AuthModal";
import Link from "next/link";

const logg = [
  { name: "Giriş Yap", href: "#" },
  { name: "Kayıt Ol", href: "#" },
  // { name: "Çıkış yap", href: "#" },
];
const account = [
  { name: "Hesabım", href: "/hesabim" },
  { name: "Adresler", href: "/adresler" },
  { name: "Geçmiş siparişlerim", href: "/siparisler" },
  { name: "Aktif siparişlerim", href: "/aktifSiparislerim" },
  // { name: "Ürün Detayı", href: "/urunDetayi" },
  { name: "Yardım merkezi", href: "/yardim" },
  // { name: "mahalleRastaurantlarim", href: "/mahalleRastaurantlarim" },
  // { name: "sehirRestaurantlarim", href: "/sehirRestaurantlarim" },
  // { name: "yaLayoutComponents", href: "/yaLayoutComponents" },
  // { name: "restaurant", href: "/restaurant" },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const AccountMenu = ({ className }) => {
  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);
  const authModalOpen = useSelector(({ auth }) => auth.authModalOpen);
  // const user = useSelector(({ auth }) => auth.user);
  const dispatch = useDispatch();

  const openAuthModal = () => {
    dispatch(authActions.updateState({ authModalOpen: true }));
  };
  const logOut = () => {
    dispatch(authActions.updateState({ user: {} }));
    dispatch(authActions.updateState({ isLoggedIn: false }));
    localStorage.removeItem("userToken");
  };

  return (
    <>
      {isLoggedIn === true ? (
        // <Menu as="div" className="relative flex-shrink-0 ml-5">
        //   <div>
        //     <Menu.Button className="flex bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        //       <span className="sr-only">Open user menu</span>
        //       <span>Hesabım</span>
        //       <ChevronDownIcon className="w-5 h-5" aria-hidden="true" />
        //     </Menu.Button>
        //   </div>
        //   <Transition
        //     as={Fragment}
        //     enter="transition ease-out duration-100"
        //     enterFrom="transform opacity-0 scale-95"
        //     enterTo="transform opacity-100 scale-100"
        //     leave="transition ease-in duration-75"
        //     leaveFrom="transform opacity-100 scale-100"
        //     leaveTo="transform opacity-0 scale-95"
        //   >
        //     <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        //       {account.map((item) => (
        //         <Menu.Item key={item.name}>
        //           {({ active }) => (
        //             <a
        //               href={item?.href}
        //               className={classNames(
        //                 active ? "bg-gray-100" : "",
        //                 "block px-4 py-2 text-sm text-gray-700"
        //               )}
        //             >
        //               {item.name}
        //             </a>
        //           )}
        //         </Menu.Item>
        //       ))}
        //     </Menu.Items>
        //   </Transition>
        // </Menu>
        <Popover className={`relative ` + `${className}`}>
          <Popover.Button className="inline-flex items-center text-sm font-normal leading-6 text-gray-900 ">
            <span>Hesabım</span>
            <ChevronDownIcon className="w-5 h-5" aria-hidden="true" />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute z-10 flex w-screen px-4 mt-5 -translate-x-1/2 left-1/2 max-w-min">
              <div className="w-56 p-4 text-sm font-semibold leading-6 text-gray-900 bg-white shadow-lg shrink rounded-xl ring-1 ring-gray-900/5">
                {account.map((item) => (
                  <Link
                    key={item.name}
                    href={item?.href}
                    className="block p-2 hover:text-ya-dark-red"
                  >
                    {item.name}
                  </Link>
                ))}
                <span
                style={{cursor:"pointer"}}
                  // href={item?.href}
                  onClick={logOut}
                  className="block p-2 hover:text-ya-dark-red"
                >
                  Çıkış yap
                </span>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      ) : (
        <button onClick={openAuthModal}>Giriş</button>
      )}
      {authModalOpen === true && <AuthModal />}
    </>
  );
};
export default AccountMenu;

// <Popover className="relative">
//   <Popover.Button
//     onClick={openAuthModal}
//     className="inline-flex items-center text-sm font-normal leading-6 text-gray-900"
//   >
//     <span>Giriş</span>
//     <ChevronDownIcon className="w-5 h-5" aria-hidden="true" />
//   </Popover.Button>

//   <Transition
//     as={Fragment}
//     enter="transition ease-out duration-200"
//     enterFrom="opacity-0 translate-y-1"
//     enterTo="opacity-100 translate-y-0"
//     leave="transition ease-in duration-150"
//     leaveFrom="opacity-100 translate-y-0"
//     leaveTo="opacity-0 translate-y-1"
//   >
//     <Popover.Panel className="absolute z-10 flex w-screen px-4 mt-5 -translate-x-1/2 left-1/2 max-w-min">
//       <div className="w-56 p-4 text-sm font-semibold leading-6 text-gray-900 bg-white shadow-lg shrink rounded-xl ring-1 ring-gray-900/5">
//         {logg.map((item) => (
//           <a
//             key={item.name}
//             href={item?.href}
//             className="block p-2 hover:text-ya-dark-red"
//           >
//             {item.name}
//           </a>
//         ))}
//       </div>
//     </Popover.Panel>
//   </Transition>
// </Popover>
