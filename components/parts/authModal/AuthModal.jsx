"use client";

import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/app/Redux/features/auth-slice";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

export default function AuthModal() {
  const [openSignUp, setOpenSignUp] = useState(false);
  const authModalOpen = useSelector(({ auth }) => auth.authModalOpen);
  const dispatch = useDispatch();
  const cancelButtonRef = useRef(null);

  const closeModal = (event) => {
    dispatch(authActions.updateState({ authModalOpen: event }));
  };

  const openSignUpHandler = (event) => {
    setOpenSignUp(event);
  };

  return (
    <Transition.Root show={authModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={() => closeModal(false)}
      >
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
              <Dialog.Panel className="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                {openSignUp === true ? (
                  <SignUp
                    openSignUpHandler={openSignUpHandler}
                    closeModal={closeModal}
                  />
                ) : (
                  <SignIn
                    openSignUpHandler={openSignUpHandler}
                    closeModal={closeModal}
                  />
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
