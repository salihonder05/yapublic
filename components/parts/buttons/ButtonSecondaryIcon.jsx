import { CheckCircleIcon } from "@heroicons/react/20/solid";

const ButtonSecondaryIcon = ({ children, className, handleOnClick }) => {
  return (
    //   <button className="rounded-md bg-ya-red px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-ya-dark-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ya-red">
    <button
      type="button"
      onClick={handleOnClick}
      className={
        `${className}` +
        ` inline-flex items-center gap-x-1.5 rounded-md bg-ya-yellow px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-ya-dark-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ya-yellow`
      }
    >
      {children}
    </button>
  );
};

export default ButtonSecondaryIcon;
