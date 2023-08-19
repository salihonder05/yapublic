"use client";
import { useState } from "react";
import MultiSelection from "./MultiSelection";
import SingleSelection from "./SingleSelection";

const OrderSelectionSceneByType = ({
  openSelectionList,
  setOpenSelectionList,
}) => {
  const [orderType, setOrderType] = useState("Single");
  return (
    <div>
      {orderType === "Single" ? (
        <SingleSelection
          setOrderType={setOrderType}
          setOpenSelectionList={setOpenSelectionList}
          openSelectionList={openSelectionList}
        />
      ) : (
        <MultiSelection
          setOrderType={setOrderType}
          setOpenSelectionList={setOpenSelectionList}
          openSelectionList={openSelectionList}
        />
      )}
    </div>
  );
};

export default OrderSelectionSceneByType;
