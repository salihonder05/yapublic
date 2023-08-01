import OrderSelectionButtonItem from "./OrderSelectionButtonItem";
import OrderSelectionItem from "./OrderSelectionItem";

const OrderSelectionList = ({
  openSelectionList,
  setOpenSelectionList,
  setOrderType,
}) => {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {[
        { name: "andac", type: "Multiple" },
        { name: "andac", type: "Multiple" },
        { name: "andac", type: "Single" },
      ].map((item, index) => (
        <OrderSelectionItem
          setOrderType={setOrderType}
          setOpenSelectionList={setOpenSelectionList}
          openSelectionList={openSelectionList}
          key={index}
          item={item}
        />
      ))}
    </ul>
  );
};

export default OrderSelectionList;
