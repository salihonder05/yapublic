const OrderSelectionItem = ({
  item,
  key,
  setOrderType,
  setOpenSelectionList,
}) => {
  const changeOrderType = () => {
    if (item?.type === "Single") {
      setOpenSelectionList(false);
    }
    setOrderType(item?.type);
  };
  return (
    <li
      key={key}
      className="flex p-2 py-2 my-2 rounded-md gap-x-4 bg-ya-dark-white-1"
      onClick={changeOrderType}
    >
      <div className="min-w-0">
        <p className="text-sm font-semibold leading-6 text-ya-dark-gray">
          {item.name}
        </p>
      </div>
    </li>
  );
};

export default OrderSelectionItem;
