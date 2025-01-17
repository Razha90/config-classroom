"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import InputPassword from "../element/inputPassword";
import Link from "next/link";

export function SignIn({ language }) {
  const resendAction = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
  
    const result = await signIn("credentials", {
      redirect: true,
      redirectTo: "/",
      email,
      password,
    });
  
    if (!result.ok) {
      console.error("Login failed:", result.error);
    }
  };
  return (
    <div className="flex flex-row max-w-[1200px] bg-primary pl-[10px] pr-[20px] rounded-[80px] gap-[20px] animate-fade animate-delay-[600ms]">
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
        <h2 className="font-inter text-4xl font-bold">
          {language.welcome}
        </h2>
        <p className="font-inter text-xl">{language.welcome_greeting}</p>
        <form
          onSubmit={resendAction} method="post" className="flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <label className="font-inter text-lg">Username {language.or} Email</label>
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
              />
            </div>
          </div>
          <InputPassword />
          <button type="submit" className="bg-accent rounded-2xl text-background px-7 py-2 font-inter text-lg max-w-[120px] hover:opacity-100 opacity-90 transition-all">{language.login}</button>
          <br />
        </form>
        <div className="flex flex-col gap-3">
          <Link className="text-accent text-xl font-inter hover:opacity-60" href="/forgot-password">{language.forgot_password}</Link>
          <Link className="text-accent text-xl font-inter hover:opacity-60" href="/register">{language.register_account}</Link>
        </div>
      </div>
    </div>
  );
}
