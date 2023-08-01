"use client";

import ButtonBlockPrimary from "@/components/parts/buttons/ButtonBlockPrimary";
import YaFormInput from "@/components/parts/inputs/YaFormInput";

const EditAddressForm = ({
  setOpenDistrictSelect,
  setOpenCitySelect,
  setOpenNeighbourhoodSelect,
  setOpenTownSelect,
  inputHandler,
  createAddress,
  address,
}) => {
  return (
    <div>
      <h2 className="p-1 font-semibold text-center text-gray-900 rounded-md bg-ya-yellow">
        ADRES BİLGİ FORMU
      </h2>

      <div className="grid grid-cols-1 mt-4 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
        <div className="sm:col-span-2">
          <YaFormInput
            value={address?.address_name}
            handleOnChange={inputHandler}
            name="addressName"
            title={"ADRES BAŞLIĞI"}
          />
        </div>

        <div className="sm:col-span-2">
          <YaFormInput
            value={address?.address_phone}
            handleOnChange={inputHandler}
            name="addressPhone"
            title={"TELEFON NUMARASI"}
          />
        </div>

        <div className="rounded-md sm:col-span-2">
          <div className="mt-1 ">
            <ButtonBlockPrimary handleOnClick={() => setOpenCitySelect(true)}>
              Şehir Seç
            </ButtonBlockPrimary>
          </div>
        </div>

        <div className="rounded-md sm:col-span-2">
          <div className="mt-1 ">
            <ButtonBlockPrimary handleOnClick={() => setOpenTownSelect(true)}>
              İLÇE SEÇ
            </ButtonBlockPrimary>
          </div>
        </div>

        <div className="rounded-md sm:col-span-2">
          <div className="mt-1 ">
            <ButtonBlockPrimary
              handleOnClick={() => setOpenDistrictSelect(true)}
            >
              SEMT SEÇ
            </ButtonBlockPrimary>
          </div>
        </div>

        <div className="rounded-md sm:col-span-2">
          <div className="mt-1 ">
            <ButtonBlockPrimary
              handleOnClick={() => setOpenNeighbourhoodSelect(true)}
            >
              MAHALLE SEÇ
            </ButtonBlockPrimary>
          </div>
        </div>

        <div className="sm:col-span-2">
          <YaFormInput
            handleOnChange={inputHandler}
            title={"Cd. Sk. No."}
          />
        </div>

        <div className="sm:col-span-2">
          <YaFormInput handleOnChange={inputHandler} title={"BİNA NO"} />
        </div>

        <div className="sm:col-span-2">
          <YaFormInput handleOnChange={inputHandler} title={"DAİRE NO"} />
        </div>

        <div className="sm:col-span-2">
          <YaFormInput
            value={address?.address_text}
            handleOnChange={inputHandler}
            name="addressText"
            title={"ADRES TARİFİ"}
          />
        </div>
      </div>
      <div className="mt-5 sm:mt-6">
        <button
          type="button"
          className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm bg-ya-dark-green hover:bg-ya-green/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ya-dark-green"
          onClick={createAddress}
        >
          Kaydet
        </button>
      </div>
    </div>
  );
};

export default EditAddressForm;
