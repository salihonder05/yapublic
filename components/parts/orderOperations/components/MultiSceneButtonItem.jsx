import ButtonBlockPrimary from "../../buttons/ButtonBlockPrimary";

const MultiSceneButtonItem = ({ key, item }) => {
  return (
    <div key={key} className="p-2 mt-2 rounded-md bg-ya-dark-white-1">
      <span className="text-xs">deneme</span>
      <ButtonBlockPrimary className={"mt-2"}>{item?.name}</ButtonBlockPrimary>
    </div>
  );
};

export default MultiSceneButtonItem;
