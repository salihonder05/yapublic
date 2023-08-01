const YaFormInput = ({ name, title, handleOnChange, value }) => {
  return (
    <div className="p-2 rounded-md bg-ya-dark-white-1">
      <label
        htmlFor="postal-code"
        className="block mb-1 text-sm font-medium text-gray-700"
      >
        {title}
      </label>
      <input
        placeholder={value}
        onChange={handleOnChange}
        type="text"
        name={name}
        id="postal-code"
        autoComplete="postal-code"
        className="block w-full px-2 rounded-md bg-ya-dark-white-1 sm:text-sm"
      />
    </div>
  );
};

export default YaFormInput;
