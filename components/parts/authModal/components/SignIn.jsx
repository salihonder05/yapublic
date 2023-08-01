import { authActions } from "@/app/Redux/features/auth-slice";
import Auth from "@/components/data/Auth";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonBlockPrimary from "../../buttons/ButtonBlockPrimary";
import ButtonClose from "../../buttons/ButtonClose";
import Logo from "../../Logo";

const SignIn = ({ openSignUpHandler, closeModal }) => {
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });
  const [loginResponse, setLoginResponse] = useState();
  const authModalOpen = useSelector(({ auth }) => auth.authModalOpen);
  const dispatch = useDispatch();

  const inputHandler = async (e) => {
    e.preventDefault();
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.value,
    });
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginState.email,
          pw: loginState.password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("userToken", data.token.token);
        Auth();
        dispatch(authActions.updateState({ authModalOpen: false }));
      }
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
        onSubmit={(e) => loginHandler(e)}
      >
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
              onChange={(e) => inputHandler(e)}
              name="email"
              type="email"
              autoComplete="email"
              required
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
              onChange={(e) => inputHandler(e)}
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Şifreniz"
              required
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm placeholder:text-gray-100  sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <ButtonBlockPrimary type={"submit"}>
            <LockClosedIcon className="w-5 h-5 mr-1"></LockClosedIcon>
            Giriş Yap
          </ButtonBlockPrimary>
        </div>
        <div className="flex items-center justify-center text-center">
          <Link
            href="#"
            className="font-semibold text-gray-600 hover:text-gray-500"
          >
            Şifremi unuttum
          </Link>
        </div>
      </form>
      <div className="mt-6 text-xs text-center">Hesabın yok mu?</div>
      <div className="mt-2 mb-2 sm:mt-4 ">
        <button
          type="button"
          className="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white rounded-md shadow-sm bg-ya-yellow hover:bg-ya-dark-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ya-yellow sm:col-start-2"
          onClick={() => openSignUpHandler(true)}
        >
          Kayıt Ol
        </button>
      </div>
    </div>
  );
};

export default SignIn;
