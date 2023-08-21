"use client";

import { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/app/Redux/features/auth-slice";
import AuthModal from "../authModal/AuthModal";
import Link from "next/link";

import Lottie from "react-lottie";
import animationData from "../../../components/lotties/header-account-loading";
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
const AccountMenu = ({ className }) => {
  const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);
  const authModalOpen = useSelector(({ auth }) => auth.authModalOpen);
  const [isLogged, setIsLogged] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 2 saniye sonra yükleniyor durumunu kapat
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLogged(isLoggedIn);
    }, 1000);
  }, [isLoggedIn]);

  const openAuthModal = () => {
    dispatch(authActions.updateState({ authModalOpen: true }));
  };
  const logOut = () => {
    dispatch(authActions.updateState({ user: {} }));
    dispatch(authActions.updateState({ isLoggedIn: false }));
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("userToken");
    }
  };

  return (
    <div>
      {isLogged ? (
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
                  style={{ cursor: "pointer" }}
                  onClick={logOut}
                  className="block p-2 hover:text-ya-dark-red"
                >
                  Çıkış yap
                </span>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      ) : loading ? (
        <div>
          <Lottie options={defaultOptions} height={35} width={70} />
        </div>
      ) : (
        <button onClick={openAuthModal}>Giriş</button>
      )}
      {authModalOpen === true && <AuthModal />}
    </div>
  );
};
export default AccountMenu;
