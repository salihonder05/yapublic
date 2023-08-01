const ChooseCard = ({ state, key, setState, setOpenSelect }) => {
  const choosenCity = () => {
    setState(state?.id);
    setOpenSelect(false);
  };
  return (
    <div
      onClick={choosenCity}
      key={key}
      className="p-2 m-2 rounded-md bg-ya-dark-white-1 hover:bg-ya-dark-white-2"
      style={{ cursor: "pointer" }}
    >
      <h1>{state.name}</h1>
    </div>
  );
};

export default ChooseCard;
