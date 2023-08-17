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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ tabs, setCurrentTab, currentTab }) {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full border-gray-300 rounded-md focus:border-ya-red focus:ring-ya-red"
          defaultValue={tabs.find((tab) => tab?.current)}
        >
          {tabs?.map((tab) => (
            <option key={tab?.name}>{tab?.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav
          className="flex divide-x divide-gray-200 rounded-lg shadow isolate"
          aria-label="Tabs"
        >
          {tabs?.map((tab, tabIdx) => (
            <button
              key={tab?.name}
              onClick={() => setCurrentTab(tab?.name)}
              className={classNames(
                tab?.current
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700",
                tabIdx === 0 ? "rounded-l-lg" : "",
                tabIdx === tabs?.length - 1 ? "rounded-r-lg" : "",
                "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10"
              )}
              aria-current={tab?.current ? "page" : undefined}
            >
              <span>{tab?.name}</span>
              <span
                aria-hidden="true"
                className={classNames(
                  currentTab === tab?.name ? "bg-ya-red" : "bg-transparent",
                  "absolute inset-x-0 bottom-0 h-0.5"
                )}
              />
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
