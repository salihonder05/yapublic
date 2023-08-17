"use client";
import { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

var filteredAddresses = {};

export default function TownsSelectMenu({ setTown, town, cityId }) {
  const [towns, setTowns] = useState(); 
  const [query, setQuery] = useState(""); 

  const getCities = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/townsx", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cityId: cityId }),
      });
      const data = await response.json(); // response.json() işlemini await anahtar kelimesiyle kullanın
      if (response.ok) {
        setTowns(data.data.data.townsx);
      }
    } catch (error) {
      console.error("Error fetching customer list:", error);
    }
  };
  filteredAddresses =
    query === ""
      ? towns
      : towns?.filter((city) => {
          const cityName = `${city.name}`;
          const lowercaseQuery = query.toLocaleLowerCase("tr-TR");

          return cityName.toLocaleLowerCase("tr-TR").includes(lowercaseQuery);
        });
  useEffect(() => {
    getCities();
  }, [cityId]); 

  return (
    <Combobox
      as="div"
      value={town}
      onChange={setTown}
    >
      <div className="relative mt-2">
        <Combobox.Input
          placeholder="Bir Semt giriniz"
          className="ml-1 w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  sm:text-sm sm:leading-6"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(person) => person?.name}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-2 rounded-r-md focus:outline-none">
          <ChevronUpDownIcon
            className="w-5 h-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredAddresses?.length > 0 && (
          <Combobox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredAddresses?.map((person) => (
              <Combobox.Option
                key={person.id}
                value={person}
                className={({ active }) =>
                  classNames(
                    "relative cursor-pointer select-none py-2 pl-3 pr-9",
                    active ? "bg-ya-green text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected && "font-semibold"
                      )}
                    >
                      {person.name}
                    </span>
                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-ya-green"
                        )}
                      >
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
