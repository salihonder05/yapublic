const OrderSelectionCheckboxItem = ({ item, key }) => {
  return (
    <li key={key} className="flex p-2 py-2 my-2 bg-white rounded-md gap-x-4">
      <div className="relative flex items-start">
        <div className="flex items-center h-6">
          <input
            id="comments"
            aria-describedby="comments-description"
            name="comments"
            type="checkbox"
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-600"
          />
        </div>
        <div className="ml-3 text-sm leading-6">
          <label className="font-medium text-gray-900">{item?.name}</label>{" "}
          <span id="comments-description" className="text-gray-500">
            <span className="sr-only">New comments </span>so you always know
            what&apos;s happening.
          </span>
        </div>
      </div>
    </li>
  );
};

export default OrderSelectionCheckboxItem;
