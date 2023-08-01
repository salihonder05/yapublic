"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react"; 
import { useSelector } from "react-redux";
import ChooseCity from "../chooseCity/ChooseCity";
import ChooseDistrict from "../chooseDistrict/ChooseDistrict";
import ChooseTown from "../chooseTown/ChooseTown";
import ChooseNeighbourhood from "../chooseNeighbourhood/ChooseNeighbourhood"; 
import EditAddressForm from "./components/EditAddressForm";

export default function EditAddress({
  open,
  setOpen,
  fetchUserAddresses,
  address,
}) {
  const userToken = useSelector(({ auth }) => auth.userToken);
  const [createAddressState, setCreateAddressState] = useState({
    addressName: address?.address_name,
    addressPhone: address?.address_phone,
    addressText: address?.address_text,
  });
  const [city, setCity] = useState(address?.citiy?.id);
  const [district, setDistrict] = useState(address?.district?.id);
  const [town, setTown] = useState(address?.town?.id);
  const [neighbourhood, setNeighbourhood] = useState(address?.neighborhood?.id);

  const [openCitySelect, setOpenCitySelect] = useState(false);
  const [openDistrictSelect, setOpenDistrictSelect] = useState(false);
  const [openTownSelect, setOpenTownSelect] = useState(false);
  const [openNeighbourhoodSelect, setOpenNeighbourhoodSelect] = useState(false);

  const inputHandler = async (e) => {
    e.preventDefault();
    setCreateAddressState({
      ...createAddressState,
      [e.target.name]: e.target.value,
    });
  };
  const createAddress = async () => {
    // if (!user) return;
    const PROJECT_API_URL = process.env.PROJECT_API_URL;

    try {
      const response = await fetch(PROJECT_API_URL + "user/updateaddress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: address?.id,
          address_name: createAddressState.addressName,
          address_phone: createAddressState.addressPhone,
          address_city: city,
          address_town: town,
          address_district: district,
          address_neighborhood: neighbourhood,
          address_text: createAddressState.addressText,
          token: userToken,
        }),
      });

      if (response.ok) {
        const data = await response.json(); 
        fetchUserAddresses();
        setOpen(false);
      } else {
        console.error("Error fetching customer list:", response.status);
      }
    } catch (error) {
      console.error("Error fetching customer list:", error);
    }
  };

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
              <Dialog.Panel className="relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
                {openCitySelect === true ? (
                  <ChooseCity
                    setOpenCitySelect={setOpenCitySelect}
                    setCity={setCity}
                  />
                ) : openDistrictSelect === true ? (
                  <ChooseDistrict
                    setOpenDistrictSelect={setOpenDistrictSelect}
                    town={town}
                    setDistrict={setDistrict}
                  />
                ) : openTownSelect === true ? (
                  <ChooseTown
                    setOpenTownSelect={setOpenTownSelect}
                    city={city}
                    setTown={setTown}
                  />
                ) : openNeighbourhoodSelect === true ? (
                  <ChooseNeighbourhood
                    setOpenNeighbourhoodSelect={setOpenNeighbourhoodSelect}
                    district={district}
                    setNeighbourhood={setNeighbourhood}
                  />
                ) : (
                  <EditAddressForm
                    address={address}
                    createAddress={createAddress}
                    inputHandler={inputHandler}
                    setOpenDistrictSelect={setOpenDistrictSelect}
                    setOpenCitySelect={setOpenCitySelect}
                    setOpenNeighbourhoodSelect={setOpenNeighbourhoodSelect}
                    setOpenTownSelect={setOpenTownSelect}
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
