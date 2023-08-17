"use client";
import { ClockIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";

export default function Informations() {
  const singleAccount = useSelector(
    ({ restaurants }) => restaurants.singleAccount
  );
  const workHours = [
    {
      day: "PAZARTESİ",
      hours:
        singleAccount?.account_work_hours?.monday_opening +
        " - " +
        singleAccount?.account_work_hours?.monday_closing,
    },
    {
      day: "SALI",
      hours:
        singleAccount?.account_work_hours?.tuesday_opening +
        " - " +
        singleAccount?.account_work_hours?.tuesday_closing,
    },
    {
      day: "ÇARŞAMBA",
      hours:
        singleAccount?.account_work_hours?.wednesday_opening +
        " - " +
        singleAccount?.account_work_hours?.wednesday_closing,
    },
    {
      day: "PERŞEMBE",
      hours:
        singleAccount?.account_work_hours?.thursday_opening +
        " - " +
        singleAccount?.account_work_hours?.thursday_closing,
    },
    {
      day: "CUMA",
      hours:
        singleAccount?.account_work_hours?.friday_opening +
        " - " +
        singleAccount?.account_work_hours?.friday_closing,
    },
    {
      day: "CUMARTESİ",
      hours:
        singleAccount?.account_work_hours?.saturday_opening +
        " - " +
        singleAccount?.account_work_hours?.saturday_closing,
    },
    {
      day: "PAZAR",
      hours:
        singleAccount?.account_work_hours?.sunday_opening +
        " - " +
        singleAccount?.account_work_hours?.sunday_closing,
    },
  ];
  return (
    <div>
      <fieldset className="border-t border-b border-gray-200">
        <div className="divide-y divide-gray-200">
          <div className="relative flex items-start pb-4 pt-3.5">
            <div className="flex-1 min-w-0 text-sm leading-6">
              <label
                htmlFor="comments"
                className="font-medium text-gray-900 text-md"
              >
                İŞLETME ADRESİ
              </label>
              <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                {singleAccount?.address?.address_text}{" "}
                {singleAccount?.address?.neighborhood?.name} {" / "}{" "}
                {singleAccount?.address?.citiy?.name}
              </p>
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          <div className="relative flex items-start pb-4 pt-3.5">
            <div className="flex-1 min-w-0 text-sm leading-6">
              <label
                htmlFor="comments"
                className="font-medium text-gray-900 text-md"
              >
                İŞLETME TELEFON NUMARASI
              </label>
              <p className="p-2 mt-1 text-xs leading-5 text-black truncate rounded-md bg-ya-dark-white-1">
                {singleAccount?.account_gsm_no}
              </p>
            </div>
          </div>
        </div>
        {/* <div className="divide-y divide-gray-200">
          <div className="relative flex items-start pb-4 pt-3.5">
            <div className="flex-1 min-w-0 text-sm leading-6">
              <label
                htmlFor="comments"
                className="font-medium text-gray-900 text-md"
              >
                KABUL EDİLEN ÖDEME TİPLERİ
              </label>
              <p className="mt-1 text-xs leading-5 text-gray-500 truncate">
                {singleAccount?.account_gsm_no}
              </p>
            </div>
          </div>
        </div> */}
        <div className="divide-y divide-gray-200">
          <div className="relative flex items-start pb-4 pt-3.5">
            <div className="flex-1 min-w-0 text-sm leading-6">
              <label
                htmlFor="comments"
                className="font-medium text-gray-900 text-md"
              >
                ÇALIŞMA SAATLERİ
              </label>
              <div>
                <ul role="list" className="divide-y divide-gray-100">
                  {workHours?.map((day) => (
                    <li
                      key={day?.day}
                      className="flex items-center justify-between py-1 gap-x-6"
                    >
                      <div className="flex gap-x-4">
                        <div className="flex items-center min-w-0">
                          <p className="text-xs font-semibold leading-6 text-gray-500">
                            {day?.day}
                          </p>
                        </div>
                      </div>
                      <span className="px-5 py-1 text-xs font-semibold text-black rounded-md shadow-sm bg-ya-dark-white-3 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        {day?.hours}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  );
}
 