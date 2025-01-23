"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import InputPassword from "../element/inputPassword";
import Link from "next/link";
import { useEffect, useState } from "react";
import Alert from "./alert";

export function SignIn({ language }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isAlert, setIsAlert] = useState("");
  const resendAction = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const result = await signIn("credentials", {
      redirect: true,
      redirectTo: "/",
      email,
      password,
    });
    setIsLoading(false);
    if (result.error) {
      console.error("Error:", result.error);
    }
  };

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    const tokenURL = url.get("code");
    if (tokenURL) {
      setIsAlert(tokenURL);
      switch (tokenURL) {
        case "USER_NOT_FOUND":
          setIsAlert(language.USER_NOT_FOUND);
          break;
        case "SERVER_ERROR":
          setIsAlert(language.SERVER_ERROR);
          break;
        case "MISSING_CREDENTIALS":
          setIsAlert(language.MISSING_CREDENTIALS);
          break;
        case "MATCH_ACCOUNT":
          setIsAlert(language.MATCH_ACCOUNT);
          break;
      }
    }
  }, []);
  return (
    <div className="flex flex-row max-w-[1200px] bg-primary pl-[10px] pr-[20px] rounded-[80px] gap-[20px] animate-fade animate-delay-[600ms]">
      {isAlert && <Alert message={isAlert} type="error" />}
      <Image
        src="/img/login-dashboard.png"
        width={600}
        height={600}
        alt="dashboard login"
        className="rounded-[90px] border-accent border-4"
        title="dashboard login"
        loading="lazy"
      />

      <div className="flex flex-col flex-1 p-[20px] justify-between">
        <h2 className="font-inter text-4xl font-bold">{language.welcome}</h2>
        <p className="font-inter text-xl">{language.welcome_greeting}</p>
        <form
          onSubmit={resendAction}
          method="post"
          className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <label className="font-inter text-lg">
              Username {language.or} Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 18C27.866 18 31 14.866 31 11C31 7.13401 27.866 4 24 4C20.134 4 17 7.13401 17 11C17 14.866 20.134 18 24 18Z"
                    stroke="#777777"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 41C4 32.163 12.059 25 22 25M31 42L41 32L37 28L27 38V42H31Z"
                    stroke="#777777"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="email-username"
                className="bg-background border text-gray-900 text-xl rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                placeholder="Aida@exampsle.com"
                name="email"
                maxLength={100}
                minLength={7}
                required
              />
            </div>
          </div>
          <InputPassword />
          <button
            type="submit"
            className="bg-accent rounded-2xl text-background px-7 py-2 font-inter text-lg max-w-[120px] hover:opacity-100 opacity-90 transition-all flex justify-center"
          >
            {isLoading ? (
              <div className="animate-spin">
                {" "}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width={25}
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612"
                      stroke="#bed1cf"
                      strokeWidth="3.55556"
                      strokeLinecap="round"
                    ></path>
                  </g>
                </svg>
              </div>
            ) : (
              language.login
            )}
          </button>
          <br />
        </form>
        <div className="flex flex-col gap-3">
          <div>
            <Link
              className="text-accent text-xl font-inter hover:opacity-60"
              href="/forgot-password"
            >
              {language.forgot_password}
            </Link>
          </div>
          <div>
            <Link
              className="text-accent text-xl font-inter hover:opacity-60"
              href="/register"
            >
              {language.register_account}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
