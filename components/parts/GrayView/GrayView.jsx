const GrayView = ({ headText, children }) => {
  return (
    <div className="w-6 p-8 m-8 mt-10 rounded-md bg-ya-dark-white-1">
      {headText ? (
        <span className="mt-5 mb-10 text-sm font-semibold"> {headText}</span>
      ) : null}
      {children}
    </div>
  );
};

export default GrayView;
