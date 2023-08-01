import OrderSelectionButtonItem from "./OrderSelectionButtonItem";

const OrderSelectionButtonList = ({openSelectionList,setOpenSelectionList}) => {
  return (
    <>
      {[0, 1, 2].map((item) => (
        <OrderSelectionButtonItem setOpenSelectionList={setOpenSelectionList} openSelectionList={openSelectionList} key={item} item={item} />
      ))}
    </>
  );
};

export default OrderSelectionButtonList;
