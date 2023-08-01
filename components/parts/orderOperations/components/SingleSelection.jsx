import OrderSelectionList from "./OrderSelectionList";

const SingleSelection = ({
  openSelectionList,
  setOpenSelectionList,
  setOrderType,
}) => {
  return (
    <OrderSelectionList
      setOrderType={setOrderType}
      openSelectionList={openSelectionList}
      setOpenSelectionList={setOpenSelectionList}
    />
  );
};

export default SingleSelection;
