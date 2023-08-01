"use client";
 
import { useSelector } from "react-redux";
import MultiSceneButtonList from "./MultiSceneButtonList";
import OrderSelectionButtonList from "./OrderSelectionButtonList";
import OrderSelectionCheckboxList from "./OrderSelectionCheckboxList";
import OrderSelectionProductHeader from "./OrderSelectionProductHEader";

const MultiSelection = ({
  setOrderType,
  setOpenSelectionList,
  openSelectionList,
}) => {
  const orderedProduct = useSelector(
    ({ orderSelection }) => orderSelection.orderedProduct
  );
  return (
    <>
      <OrderSelectionProductHeader product={orderedProduct} />
      <MultiSceneButtonList />
      <OrderSelectionCheckboxList />
      <OrderSelectionCheckboxList />
      <OrderSelectionCheckboxList />
    </>
  );
};

export default MultiSelection;
