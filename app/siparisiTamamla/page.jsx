"use client";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import CartAddressCard from "@/components/siparisiTamamla/CartAddressCard";
import PaymentTypes from "@/components/siparisiTamamla/PaymentTypes";
import OrderText from "@/components/siparisiTamamla/OrderText";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
  { name: "Reports", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SiparisiTamamla = () => {
  return (
    <>
      {/* <div className="min-h-full">   */}
      <main>
        <div className="flex flex-col max-w-3xl py-6 mx-auto sm:px-6 lg:px-8 bg-ya-red/10 gap-y-4">
          <CartAddressCard />
          <PaymentTypes />
          <OrderText />
        </div>
      </main>
      {/* </div> */}
    </>
  );
};

export default SiparisiTamamla;
