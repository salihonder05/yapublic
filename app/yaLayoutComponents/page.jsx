import ButtonPrimary from "@/components/parts/buttons/ButtonPrimary";
import ButtonPrimaryIcon from "@/components/parts/buttons/ButtonPrimaryIcon";
import ButtonPrimaryOutline from "@/components/parts/buttons/ButtonPrimaryOutline";
import ButtonSecondary from "@/components/parts/buttons/ButtonSecondary";
import ButtonSecondaryIcon from "@/components/parts/buttons/ButtonSecondaryIcon";
import ButtonSoft from "@/components/parts/buttons/ButtonSoft";
import Kitchens from "@/components/parts/kitchens/Kitchens";
import RestaurantsCard from "@/components/parts/RestaurantsCard";
import SingleAccount from "@/components/parts/SingleAccount";
import CityRestourantCard from "@/components/sehirRestaurantlarim/components/CityRestourantCard";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

 

export default function Page() {
  return (
    <div className="container gap-1 mx-auto max-w-7xl lg:px-8">
      <h1 className="mt-12 border-b border-b-black">Buttons</h1>
      <section className="flex items-center gap-2 pt-2 mb-2">
        <ButtonPrimary>SİPARİŞ VER</ButtonPrimary>
        <ButtonSecondary>SİPARİŞ VER</ButtonSecondary>
        <ButtonPrimaryOutline>SİPARİŞ VER</ButtonPrimaryOutline>
        <ButtonSoft>SİPARİŞ VER</ButtonSoft>
        <ButtonPrimaryIcon>
          <ShoppingCartIcon
            className="-ml-0.5 h-4 w-auto inline-flex"
            aria-hidden="true"
          />
          SİPARİŞ VER
        </ButtonPrimaryIcon>
        <ButtonSecondaryIcon>
          <ShoppingCartIcon
            className="-ml-0.5 h-4 w-auto inline-flex"
            aria-hidden="true"
          />
          SİPARİŞ VER
        </ButtonSecondaryIcon>
      </section>
      <h1 className="mt-12 border-b border-b-black">Kitchens</h1>
      <section className="flex items-center gap-2 pt-2 mb-2">
        <Kitchens />
      </section>
      <h1 className="mt-12 border-b border-b-black">City Restourant Card</h1>
      <section className="flex items-center gap-2 pt-2 mb-2">
        <CityRestourantCard />
      </section>
      <h1 className="mt-12 border-b border-b-black">
        Neighborhood Restaurants Card
      </h1>
      <section className="flex items-center gap-2 pt-2 mb-2">
        <RestaurantsCard />
      </section>
      <h1 className="mt-12 border-b border-b-black">Single Account</h1>
      <section className="flex items-center gap-2 pt-2 mb-2">
        <SingleAccount />
      </section>
    </div>
  );
}
