"use client";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MinusIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import ButtonBlockPrimary from "../buttons/ButtonBlockPrimary";
import { PlusIcon } from "@heroicons/react/24/outline";
import OrderSelectionButtonList from "./components/OrderSelectionButtonList";
import OrderSelectionSceneByType from "./components/OrderSelectionSceneByType";
import { orderSelectionActions } from "@/app/Redux/features/orderSelection-slice";
import store from "@/app/Redux/store";
import OrderSelectionProductHeader from "./components/OrderSelectionProductHeader";

export default function OrderSelectionsModal({ open, setOpen, product }) {
  const [productCount, setProductCount] = useState(1);
  const [openSelectionList, setOpenSelectionList] = useState(false);

  console.log("product: ", product);

  useEffect(() => {
    store.dispatch(
      orderSelectionActions.updateState({ orderedProduct: product })
    );
  }, []);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-4 sm:w-full sm:max-w-xl sm:p-2">
                header buraya
                {openSelectionList ? (
                  <OrderSelectionSceneByType
                    orderType={"Single"}
                    openSelectionList={openSelectionList}
                    setOpenSelectionList={setOpenSelectionList}
                  />
                ) : (
                  <>
                    <OrderSelectionProductHeader product={product} />
                    <div>
                      <div className="flex items-center justify-between p-2 mt-5 rounded-md sm:mt-4 sm:flex bg-ya-yellow">
                        <div className="flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() =>
                              productCount > 1
                                ? setProductCount(productCount - 1)
                                : 1
                            }
                            className="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-white rounded-md shadow-sm hover:bg-ya-red/20 sm:w-auto"
                          >
                            <MinusIcon className="w-5 h-5 text-ya-red" />
                          </button>
                          <button
                            type="button"
                            className="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 sm:w-auto"
                          >
                            {productCount}
                          </button>
                          <button
                            type="button"
                            onClick={() => setProductCount(productCount + 1)}
                            className="inline-flex items-center justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm hover:bg-ya-green/20 sm:ml-3 sm:mt-0 sm:w-auto"
                          >
                            <PlusIcon className="w-5 h-5 text-ya-red" />
                          </button>
                        </div>
                        <div>
                          <span className="text-ya-white">
                            {product?.product_price?.price_value * productCount}{" "}
                            ₺
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <OrderSelectionButtonList
                          openSelectionList={openSelectionList}
                          setOpenSelectionList={setOpenSelectionList}
                        />
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6">
                      <ButtonBlockPrimary
                        className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        handleOnClick={() => setOpen(false)}
                      >
                        Sepete Ekle
                      </ButtonBlockPrimary>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
