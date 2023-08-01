import Image from "next/image";
import Link from "next/link";

const KitchensCard = ({ kitchen, key }) => {
  const kitchensPageHandler = () => {
    window.location.href = "/kitchen";
  };

  return (
    <div key={key} className="relative group" onClick={kitchensPageHandler}>
      <div className="overflow-hidden bg-gray-100 rounded-lg aspect-h-3 aspect-w-4">
        <Image
          width={100}
          height={100}
          src={kitchen.image}
          alt={kitchen.name}
          priority 
          className="object-cover object-center"
          style={{ width: "100%", height: "100px" }}
        />
        <div
          className="flex items-end p-4 opacity-0 group-hover:opacity-100"
          aria-hidden="true"
        >
          <div className="w-full text-sm font-medium text-center text-gray-900 bg-white bg-opacity-75 rounded-md backdrop-blur backdrop-filter">
            View Product
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 space-x-8 text-base font-medium text-gray-900">
        <h3>
          <Link href="#">
            <span aria-hidden="true" className="absolute inset-0" />
            {kitchen.name}
          </Link>
        </h3>
        {/* <p>{product.price}</p> */}
      </div>
      {/* <p className="mt-1 text-sm text-gray-500">{product.category}</p> */}
    </div>
  );
};

export default KitchensCard;
