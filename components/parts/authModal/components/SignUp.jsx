import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonBlockPrimary from "../../buttons/ButtonBlockPrimary";
import ButtonClose from "../../buttons/ButtonClose";
import Logo from "../../Logo";

const SignUp = ({ openSignUpHandler, closeModal }) => {
  const userToken = useSelector(({ auth }) => auth.userToken);
  const dispatch = useDispatch();
 
 

  const [registerState, setRegisterState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const inputHandler = async (e) => {
    e.preventDefault();
    setRegisterState({
      ...registerState,
      [e.target.name]: e.target.value,
    });
  };

  const signUpHandler = async (e) => {
    e.preventDefault(); 
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: registerState.name,
          email: registerState.email,
          pw: registerState.password,
        }),
      });

      const data = await response.json();
      localStorage.setItem("userToken", data.token.data.createUser.token);
    } catch (error) {
      console.error("Error fetching customer list:", error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between w-full mt-4 mb-8 sm:w-full">
        <Logo />
        <ButtonClose yaOnClick={closeModal} />
      </div>
      <form
        className="space-y-6"
        action="#"
        method="POST"
        onSubmit={(e) => signUpHandler(e)}
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            İsim
          </label>
          <div className="mt-2">
            <input
              id="name"
              name="name"
              type="name"
              autoComplete="name"
              required
              onChange={(e) => inputHandler(e)}
              placeholder="Ahmet Yilmaz"
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm   placeholder:text-gray-300   sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            E-Posta Adresiniz
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              onChange={(e) => inputHandler(e)}
              placeholder="ahmet.yilmaz@gmail.com"
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm   placeholder:text-gray-300   sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Şifreniz
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Şifreniz"
              onChange={(e) => inputHandler(e)}
              required
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm placeholder:text-gray-100  sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <ButtonBlockPrimary type={"submit"}>
            <LockOpenIcon className="w-5 h-5 mr-1"></LockOpenIcon>
            Kayıt Ol
          </ButtonBlockPrimary>
        </div>
      </form>
      <div className="mt-6 text-xs text-center">Hesabın var mı?</div>
      <div className="mt-2 mb-2 sm:mt-4 ">
        <button
          type="button"
          className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm bg-ya-yellow hover:bg-ya-dark-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ya-yellow sm:col-start-2"
          onClick={() => openSignUpHandler(false)}
        >
          Giriş Yap
        </button>
      </div>
    </div>
  );
};

export default SignUp;
