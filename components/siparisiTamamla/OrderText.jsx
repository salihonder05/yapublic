/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function OrderText() {
  return (
    <div className="p-2 rounded-md bg-ya-dark-white-2">
      <label className="my-2 text-xs font-semibold text-start text-ya-gray">
        SİPARİŞ NOTU
      </label>
      <div className="mt-2">
        <textarea
          rows={4}
          name="comment"
          id="comment"
          className="block w-full rounded-md border-0 py-1.5 text-ya-soft-black shadow-sm ring-1 ring-inset ring-ya-dark-white-2 placeholder:text-ya-dark-white-2 focus:ring-2 focus:ring-inset focus:ring-ya-green sm:text-sm sm:leading-6"
          defaultValue={""}
        />
      </div>
    </div>
  );
}
