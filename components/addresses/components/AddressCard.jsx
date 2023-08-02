"use client";

import ButtonPrimary from "@/components/parts/buttons/ButtonPrimary";
import ButtonSecondary from "@/components/parts/buttons/ButtonSecondary";
import { useState } from "react";
import DeleteAddress from "./DeleteAddress";
import EditAddress from "./editAddress/EditAddress"; 
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const selectedAddresIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12.75l6 6 9-13.5"
    />
  </svg>
);

export default function AddressCard({
  address,
  key,
  userToken,
  fetchUserAddresses,
  selectedAdressHandler,
  lSelectedNeighbourhood,
}) {
  const [editAdress, seteditAdress] = useState(false);
  const [deleteAddress, setdeleteAddress] = useState(false);

  const editHandler = () => {
    seteditAdress(true);
  };
  const deleteHandler = () => {
    setdeleteAddress(true);
  };

  return (
    <div
      key={key}
      className={`px-4 py-5 mt-5 ${
        parseInt(lSelectedNeighbourhood) === address?.neighborhood?.id
          ? "bg-ya-green text-white"
          : "bg-ya-dark-white-1 text-gray-900"
      } sm:px-6 rounded-md`}
    >
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 ${
                parseInt(lSelectedNeighbourhood) === address?.neighborhood?.id
                  ? " text-ya-green"
                  : "text-white"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold ">
            <Link href="#" className="hover:underline">
              {address?.address_name}
            </Link>
          </p>
          <p
            className={`text-sm${
              parseInt(lSelectedNeighbourhood) === address?.neighborhood?.id
                ? "text-white"
                : "text-gray-500"
            } `}
            onClick={() => selectedAdressHandler(address)}
            style={{ cursor: "pointer" }}
          >
            <Link href="#" className="hover:underline">
              {address?.address_text + " / "}
            </Link>
            <Link href="#" className="hover:underline">
              {"  " + address?.citiy?.name + " / "}
            </Link>
            <Link href="#" className="hover:underline">
              {"  " + address?.town?.name + " / "}
            </Link>
            <Link href="#" className="hover:underline">
              {"  " + address?.district?.name + " / "}
            </Link>
            <Link href="#" className="hover:underline">
              {"  " + address?.neighborhood?.name}
            </Link>
          </p>
        </div>
        <div className="flex self-center flex-shrink-0">
          {/* <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="flex items-center p-2 -m-2 text-gray-400 rounded-full hover:text-gray-600">
                <span className="sr-only">Open options</span>
                <EllipsisVerticalIcon className="w-5 h-5" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link 
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "flex px-4 py-2 text-sm"
                        )}
                      >
                        <StarIcon
                          className="w-5 h-5 mr-3 text-gray-400"
                          aria-hidden="true"
                        />
                        <span>Add to favorites</span>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link 
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "flex px-4 py-2 text-sm"
                        )}
                      >
                        <CodeBracketIcon
                          className="w-5 h-5 mr-3 text-gray-400"
                          aria-hidden="true"
                        />
                        <span>Embed</span>
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link 
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "flex px-4 py-2 text-sm"
                        )}
                      >
                        <FlagIcon
                          className="w-5 h-5 mr-3 text-gray-400"
                          aria-hidden="true"
                        />
                        <span>Report content</span>
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu> */}
        </div>
        <div className="flex justify-around">
          <ButtonSecondary className={"mx-2"} handleOnClick={editHandler}>
            DÜZENLE
          </ButtonSecondary>
          <ButtonPrimary className={"mx-2 px-8"} handleOnClick={deleteHandler}>
            SİL
          </ButtonPrimary>
        </div>
      </div>
      {editAdress === true && (
        <EditAddress
          address={address}
          open={editAdress}
          setOpen={seteditAdress}
          fetchUserAddresses={fetchUserAddresses}
        />
      )}
      {deleteAddress === true && (
        <DeleteAddress
          fetchUserAddresses={fetchUserAddresses}
          setOpen={setdeleteAddress}
          open={deleteAddress}
          address={address}
          userToken={userToken}
        />
      )}
    </div>
  );
}
