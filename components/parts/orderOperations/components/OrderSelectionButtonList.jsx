import OrderSelectionButtonItem from "./OrderSelectionButtonItem";

const OrderSelectionButtonList = ({
  openSelectionList,
  setOpenSelectionList,
}) => {
  return (
    <div>
      {[0, 1, 2].map((item) => (
        <OrderSelectionButtonItem
          setOpenSelectionList={setOpenSelectionList}
          openSelectionList={openSelectionList}
          key={item}
          item={item}
        />
      ))}
    </div>
  );
};

export default OrderSelectionButtonList;
