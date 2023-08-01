import OrderSelectionCheckboxItem from "./OrderSelectionCheckboxItem";

const OrderSelectionCheckboxList = () => {
  return (
    <div role="list" className="p-2 my-8 divide-y divide-gray-100 rounded-md bg-ya-dark-white-1">
        <h2>deneme</h2>
      {[
        { name: "andac", type: "Multiple" },
        { name: "andac", type: "Multiple" },
        { name: "andac", type: "Single" },
      ].map((item, index) => (
        <OrderSelectionCheckboxItem 
          key={index}
          item={item}
        />
      ))}
    </div>
  );
};

export default OrderSelectionCheckboxList;
