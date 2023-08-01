import ProductsItems from "./ProductsItems";

const ProductsList = ({ product }) => {
  return (
    <div
      key={product?.id}
      id={product?.product_group_main?.main_group_name}
      className="relative sm:p-6"
    >
      <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-xl">
        {product?.product_group_main?.main_group_name}
      </h2>
      <div className="grid grid-cols-2 gap-4 -mx-px sm:mx-0 md:grid-cols-3 lg:grid-cols-6">
        {product?.products.map((product) => (
          <ProductsItems product={product} key={product?.id} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
