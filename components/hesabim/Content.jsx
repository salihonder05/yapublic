"use client";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useSelector } from "react-redux";
import ButtonPrimary from "../parts/buttons/ButtonPrimary";
import MailCheckModal from "./components/MailCheckModal";

export default function Content() {
  const user = useSelector(({ auth }) => auth.user);
  const userToken = useSelector(({ auth }) => auth.userToken);
  const [mailCheck, setMailCheck] = useState();

  const openCart = useSelector(({ cart }) => cart.openCart);
  const [password, setPassword] = useState();
  const [userUpdatedStates, setUserUpdatedStates] = useState({
    name: user?.user?.name,
    email: user?.user?.email,
    phone: user?.user?.phone,
    birth_date: user?.user?.birth_date,
    email_permission: user?.user?.email_permission,
  });

  // useEffect(() => {
  //   setUserUpdatedStates({
  //     name: user?.user?.name,
  //     email: user?.user?.email,
  //     phone: user?.user?.phone,
  //     birth_date: user?.user?.birth_date,
  //     email_permission: user?.user?.email_permission,
  //     password: user?.user?.customer?.user?.password,
  //   });
  // }, [user]);

  const inputHandler = async (e) => {
    e.preventDefault();
    setUserUpdatedStates({
      ...userUpdatedStates,
      [e.target.name]: e.target.value,
    });
  };

  const updateUser = async () => {
    if (!user) return;
    const takeUserId = user?.user?.customer?.id;

    try {
      const response = await fetch(
        "http://yapublic.vercel.app/api/auth/updateuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userUpdatedStates.name,
            email: userUpdatedStates.email,
            phone: userUpdatedStates.phone,
            password: password,
            token: userToken,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // console.log(data.data.data.customer_addresses);
      } else {
        console.error("Error fetching customer list:", response.status);
      }
    } catch (error) {
      console.error("Error fetching customer list:", error);
    }
  };

  return (
    <div className="px-6 py-12 mx-auto max-w-7xl lg:px-8 ">
      <form>
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Kişisel Bilgiler
          </h2>
          <p className="max-w-2xl mt-1 text-sm leading-6 text-gray-600">
            İletilerimizi alabileceğiniz gerçek bir e-mail kullanın.
          </p>

          <div className="pb-12 mt-10 space-y-8 border-b border-gray-900/10 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                İsim
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  // name="first-name"
                  // id="first-name"
                  // autoComplete="given-name"
                  name="name"
                  onChange={(event) => inputHandler(event)}
                  placeholder={user?.user?.name}
                  className="pl-2 font-semibold  block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Last name
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:max-w-xs sm:text-sm sm:leading-6"
                />
              </div>
            </div> */}
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Email
              </label>
              <div>
                <div className="flex rounded-md shadow-sm">
                  <div className="relative flex items-stretch flex-grow focus-within:z-10">
                    <input
                      disabled={password?.length > 0 ? false : true}
                      type="email"
                      name="email"
                      id="email"
                      placeholder={user?.user?.email}
                      onChange={(event) => inputHandler(event)}
                      className="block font-semibold w-full rounded-none rounded-l-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <button
                    style={{ cursor: "pointer" }}
                    type="button"
                    onClick={() => setMailCheck(true)}
                    className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-ya-red bg-ya-red hover:bg-ya-dark-red"
                  >
                    <LockClosedIcon
                      className="-ml-0.5 h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
              {/* <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                disabled(={password?.length<1) && true}
                  // id="email"
                  // name="email"
                  // type="email"
                  // autoComplete="email"
                  name="email"
                  onChange={(event) => inputHandler(event)}
                  placeholder={user?.user?.email}
                  className="pl-2 font-semibold block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:max-w-md sm:text-sm sm:leading-6"
                />
              </div> */}
            </div>
            {/* <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Country
              </label>
              <div className="mt-2 sm:col-span-2 sm:mt-0">
                <select
                  // id="country"
                  // name="country"
                  // autoComplete="country-name"
                  placeholder={user?.user?.name}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div> */}
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Telefon
              </label>
              <div>
                <div className="flex rounded-md shadow-sm">
                  <div className="relative flex items-stretch flex-grow focus-within:z-10">
                    <input
                      disabled={password?.length > 0 ? false : true}
                      // type="phone"
                      name="phone"
                      // id="phone"
                      placeholder={user?.user?.phone}
                      onChange={(event) => inputHandler(event)}
                      className="block font-semibold w-full rounded-none rounded-l-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                  <button
                    style={{ cursor: "pointer" }}
                    type="button"
                    onClick={() => setMailCheck(true)}
                    className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-ya-red bg-ya-red hover:bg-ya-dark-red"
                  >
                    <LockClosedIcon
                      className="-ml-0.5 h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
              {/* <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  disabled(={password?.length<1) && true}
                  // type="text"
                  // name="street-address"
                  // id="street-address"
                  // autoComplete="street-address"
                  name="phone"
                  onChange={(event) => inputHandler(event)}
                  placeholder={user?.user?.phone}
                  className="pl-2 font-semibold block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:max-w-md sm:text-sm sm:leading-6"
                />
              </div> */}
            </div>
            {/* <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6">
              <label
                htmlFor="street-address"
                className="block text-sm font-medium leading-6 text-gray-900 sm:pt-1.5"
              >
                Şifre
              </label>
              <div>
                <div className="flex rounded-md shadow-sm">
                  <div className="relative flex items-stretch flex-grow focus-within:z-10">
                    <input
                      disabled={password?.length > 0 ? false : true}
                      // type="email"
                      // name="email"
                      // id="email"
                      placeholder={"*******************"}
                      className="block font-semibold w-full rounded-none rounded-l-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
                    />
                  </div>
                  <button
                    style={{ cursor: "pointer" }}
                    type="button"
                    onClick={() => setMailCheck(true)}
                    className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-ya-red bg-ya-red hover:bg-ya-dark-red"
                  >
                    <LockClosedIcon
                      className="-ml-0.5 h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
              {/* <div className="mt-2 sm:col-span-2 sm:mt-0">
                <input
                  disabled(={password?.length<1) && true}
                  // type="text"
                  // name="street-address"
                  // id="street-address"
                  // autoComplete="street-address"
                  name="password"
                  onChange={(event) => inputHandler(event)}
                  placeholder={"***********"}
                  className="pl-2 font-semibold block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:max-w-md sm:text-sm sm:leading-6"
                />
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </form>
      <div className="flex items-center justify-end mt-6 gap-x-6">
        {/* <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button> */}
        <ButtonPrimary
          // type="submit"
          handleOnClick={() => updateUser()}
          className="inline-flex justify-center px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Kaydet
        </ButtonPrimary>
      </div>

      {mailCheck && (
        <MailCheckModal
          mailCheck={mailCheck}
          setMailCheck={setMailCheck}
          setPassword={setPassword}
        />
      )}
    </div>
  );
}
{
  /* <div className="bg-white">
  <div className="px-6 mx-auto max-w-7xl lg:px-8">
    <div className="max-w-2xl mx-auto lg:text-center">
      <p className="mt-10 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {user?.user?.name}
      </p>
      <h2 className="text-base font-semibold leading-7 text-ya-dark-yellow">
        {user?.user?.email}
      </h2>
      <p className="mt-6 text-lg leading-8 text-gray-600">
        {user?.user?.phone}
      </p>
    </div>
    <div className="max-w-2xl mx-auto lg:max-w-4xl">
      <dl className="grid max-w-xl grid-cols-1 justify-items-center gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
        {/* user name */
}
//         <div>
//           <dt className="text-base font-semibold leading-7 text-gray-900">
//             İsim
//           </dt>
//           <input
//             name="name"
//             onChange={(event) => inputHandler(event)}
//             placeholder={user?.user?.name}
//             className="px-2 py-2 border rounded-md bg-ya-green/10 border-ya-dark-green"
//           />
//         </div>
//         {/* user email */}
//         <div>
//           <dt className="text-base font-semibold leading-7 text-gray-900">
//             E-mail
//           </dt>
//           <input
//             name="email"
//             onChange={(event) => inputHandler(event)}
//             placeholder={user?.user?.email}
//             className="px-2 py-2 border rounded-md bg-ya-green/10 border-ya-dark-green"
//           />
//         </div>
//         {/* user phone */}
//         <div>
//           <dt className="text-base font-semibold leading-7 text-gray-900">
//             Telefon
//           </dt>
//           <input
//             name="phone"
//             onChange={(event) => inputHandler(event)}
//             placeholder={user?.user?.phone}
//             className="px-2 py-2 border rounded-md bg-ya-green/10 border-ya-dark-green"
//           />
//         </div>
//         {/* user password */}
//         <div>
//           <dt className="text-base font-semibold leading-7 text-gray-900">
//             Şifre
//           </dt>
//           <input
//             name="password"
//             onChange={(event) => inputHandler(event)}
//             placeholder={user?.user?.password}
//             className="px-2 py-2 border rounded-md bg-ya-green/10 border-ya-dark-green"
//           />
//         </div>
//       </dl>
//       <div className="flex justify-center mt-10">
//         <ButtonBlockPrimary handleOnClick={updateUser}>
//           Kaydet
//         </ButtonBlockPrimary>
//       </div>
//     </div>
//   </div>
//   {openCart === true && <Cart />}
// </div>; */}
