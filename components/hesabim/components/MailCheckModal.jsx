"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import ButtonBlockPrimary from "@/components/parts/buttons/ButtonBlockPrimary";

export default function MailCheckModal({
  setMailCheck,
  mailCheck,
  setPassword,
}) {
  const passwordHandler = (e) => {
    e.preventDefault();
    console.log("setPassword: ", e.target.value);
    setPassword(e?.target?.value);
  };

  return (
    <Transition.Root show={mailCheck} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setMailCheck}>
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
              <Dialog.Panel className="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-ya-red">
                    <LockClosedIcon
                      className="w-8 h-8 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <Dialog.Title
                      as="h3"
                      className="mb-5 text-base font-semibold leading-6 text-center text-gray-900"
                    >
                      Bilgilerinizi düzenlemek için lütfen şifrenizi girin
                    </Dialog.Title>
                    <div className="rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2">
                      <label
                        htmlFor="name"
                        className="block text-xs font-medium text-ya-yellow"
                      >
                        ŞİFRE
                      </label>
                      <input
                        type="text"
                        onChange={(e) => passwordHandler(e)}
                        name="name"
                        id="name"
                        className="block w-full p-0 text-gray-900 border-0 placeholder:text-gray-400 focus:ring- sm:text-sm sm:leading-6"
                        placeholder="***********"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <ButtonBlockPrimary
                    type="button"
                    className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    handleOnClick={() => setMailCheck(false)}
                  >
                    Devam
                  </ButtonBlockPrimary>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
