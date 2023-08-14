const CompleteOrder = () => {
  return (
    <div className="flex sm:gap-y-4">
      <div className="flex flex-col items-center justify-center p-1 rounded-l-md text-ya-yellow bg-ya-soft-black basis-1/2">
        <label className="text-xs text-ya-white">TOPLAM TUTAR</label>
        <label className="text-2xl">154.00 TL</label>
      </div>
      <button
        type="button"
        className="inline-flex items-center justify-center w-full px-3 py-2 mt-3 text-sm font-semibold shadow-sm text-ya-white bg-ya-green rounded-r-md basis-1/2 ring-1 ring-inset ring-ya-green hover:bg-ya-dark-green sm:col-start-1 sm:mt-0"
        // onClick={() => setOpen(false)}
        // ref={cancelButtonRef}
      >
        DEVAM ET
      </button>
    </div>
  );
};

export default CompleteOrder;
