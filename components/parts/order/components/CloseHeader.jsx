"use client";

import { XMarkIcon } from "@heroicons/react/20/solid";

const CloseHeader = ({ setOpen, text }) => {
  return (
    <div className="flex items-center justify-between p-2 bg-ya-red rounded-tl-md rounded-tr-md ">
      <span className="w-full text-sm font-semibold text-center text-ya-white ">
        {text}
      </span>
      <div
        onClick={() => setOpen(false)}
        className="flex items-center"
        style={{ cursor: "pointer" }}
      >
        <span className="text-sm font-semibold text-ya-yellow">Kapat</span>
        <div>
          <XMarkIcon className="w-7 h-7 text-ya-white" />
        </div>
      </div>
    </div>
  );
};

export default CloseHeader;
