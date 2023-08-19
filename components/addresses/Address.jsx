"use client";
import ButtonBlockPrimary from "../parts/buttons/ButtonBlockPrimary";
import AddressCard from "./components/AddressCard";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddAddress from "./components/addAddress/AddAddress";
import Cart from "../cart/Cart";
if (typeof window !== "undefined") {
  var lSelectedNeighbourhood = window.localStorage.getItem(
    "selectedNeighbourhood"
  );
}
const PROJECT_API_URL = process.env.PROJECT_API_URL;
import Lottie from "react-lottie";
import animationData from "../../components/lotties/location";
const Address = () => {
  const user = useSelector(({ auth }) => auth.user);
  const userToken = useSelector(({ auth }) => auth.userToken);
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addAdress, setaddAdress] = useState(false);
  const openCart = useSelector(({ cart }) => cart.openCart);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  async function fetchUserAddresses() {
    if (!user) return;

    const takeUserId = user?.user?.customer?.id;

    try {
      const response = await fetch(
        PROJECT_API_URL + "user/useraddresses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerId: takeUserId,
            token: userToken,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAddress(data?.data?.data?.customer_addresses);
      } else {
        console.error("Error fetching customer list:", response.status);
      }
    } catch (error) {
      console.error("Error fetching customer list:", error);
    } finally {
      setLoading(false);
    }
  }
  // useEffect(() => {
  //   // 2 saniye sonra yükleniyor durumunu kapat
  //   const timeout = setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);

  //   return () => clearTimeout(timeout);
  // }, []);
  const addAdressToUser = () => {
    setaddAdress(true);
  };
  const selectedAdressHandler = (address) => {
    window.location.href = "/mahalleRastaurantlarim";
    setSelectedAddressId(address?.neighborhood?.id);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        "selectedAddressId",
        JSON.stringify(address?.id)
      );
      window.localStorage.setItem(
        "selectedNeighbourhood",
        JSON.stringify(address?.neighborhood?.id)
      );
      window.localStorage.setItem(
        "selectedCity",
        JSON.stringify({ id: address?.citiy?.id, name: address?.citiy?.name })
      );
      lSelectedNeighbourhood = window.localStorage.getItem(
        "selectedNeighbourhood"
      );
    }
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  useEffect(() => {
    if (user?.user?.id > 0) {
      fetchUserAddresses();
    }
    if (typeof window !== "undefined") {
      lSelectedNeighbourhood = window.localStorage.getItem(
        "selectedNeighbourhood"
      );
    }
  }, [user, selectedAddressId]);

  if (loading) {
    return (
      <div>
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    );
  }
  return (
    <div className="bg-white">
      <div className="max-w-2xl px-4 py-16 mx-auto sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between">
          <ButtonBlockPrimary handleOnClick={addAdressToUser}>
            YENİ ADRES EKLE
          </ButtonBlockPrimary>
        </div>
        <div className="mt-10 gap-x-8 gap-y-8 sm:gap-y-10">
          {address?.map((adr, index) => (
           <AddressCard
           lSelectedNeighbourhood={lSelectedNeighbourhood}
           onSelectedAdressHandler={selectedAdressHandler}  
           fetchUserAddresses={fetchUserAddresses}
           userToken={userToken}
           address={adr}
           addressKey={index}  
           key={index} 
         />
          ))}
        </div>
      </div>
      {addAdress === true && (
        <AddAddress
          fetchUserAddresses={fetchUserAddresses}
          setOpen={setaddAdress}
          open={addAdress}
        />
      )}{" "}
      {openCart === true && <Cart />}
    </div>
  );
};

export default Address;
