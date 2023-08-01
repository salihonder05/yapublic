import { CheckCircleIcon } from "@heroicons/react/20/solid";

const ButtonPrimaryIcon = ({ children, yaClass, handleOnClick }) => {
  return (
    //   <button className="rounded-md bg-ya-red px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-ya-dark-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ya-red">
    <button
      onClick={handleOnClick}
      type="button"
      className={`${yaClass} inline-flex items-center gap-x-1.5 rounded-md bg-ya-red px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-ya-dark-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ya-red`}
    >
      {children}
    </button>
  );
};

export default ButtonPrimaryIcon;
