import { XMarkIcon } from "@heroicons/react/24/outline";

const ButtonClose = ({ yaOnClick }) => {
  return (
    <button
      onClick={yaOnClick}
      type="button"
      className="p-1 text-white bg-gray-300 rounded-full shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300"
    >
      <XMarkIcon className="w-4 h-4" aria-hidden="true" />
    </button>
  );
};

export default ButtonClose;
