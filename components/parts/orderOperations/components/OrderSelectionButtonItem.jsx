import ButtonBlockPrimary from "../../buttons/ButtonBlockPrimary";

const OrderSelectionButtonItem = ({
  key,
  item,
  openSelectionList,
  setOpenSelectionList,
}) => {
  return (
    <div key={key} className="mt-2">
      <ButtonBlockPrimary
        className="mb-4"
        handleOnClick={() => setOpenSelectionList(!openSelectionList)}
      >
        Patates Kızartması seçimi
      </ButtonBlockPrimary>
    </div>
  );
};

export default OrderSelectionButtonItem;
