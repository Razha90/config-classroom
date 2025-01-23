"use client";

import { useState } from "react";

export function SignUp({ language, tokenAPI, isSetRegistered }) {
  const [dataPhone, setDataPhone] = useState("");
  const [isError, setIsError] = useState({
    name: {
      condition: false,
      message: "",
    },
    email: {
      condition: false,
      message: "",
    },
    phone: {
      condition: false,
      message: "",
    },
    password: {
      condition: false,
      message: "",
    },
    gender: {
      condition: false,
      message: "",
    },
  });
  const [isSubmit, setIsSubmit] = useState(true);

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;

    // Hanya izinkan angka
    if (/^\d*$/.test(inputValue)) {
      setDataPhone(inputValue);
    }
  };

  const submitAction = async (event) => {
    event.preventDefault();
    setIsSubmit(false);
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const password = formData.get("password");
    const confirm_password = formData.get("confirm_password");
    const gender = formData.get("gender");
    let errorState = {
      name: { condition: false, message: "" },
      email: { condition: false, message: "" },
      phone: { condition: false, message: "" },
      password: { condition: false, message: "" },
      gender: { condition: false, message: "" },
    };

    let formIsValid = true;

    if (/^\s|\s$/.test(name)) {
      errorState.name = {
        condition: true,
        message: language.name_trim,
      };
      formIsValid = false;
    } else if (/\d/.test(name)) {
      errorState.name = {
        condition: true,
        message: language.name_number,
      };
      formIsValid = false;
    }

    if (password !== confirm_password) {
      errorState.password = {
        condition: true,
        message: language.password_same,
      };
      formIsValid = false;
    } else if (/^\s|\s$/.test(password)) {
      errorState.name = {
        condition: true,
        message: language.name_trim,
      };
      formIsValid = false;
    }

    if (/^\s|\s$/.test(email)) {
      errorState.email = {
        condition: true,
        message: language.email_trim,
      };
      formIsValid = false;
    }

    if (/^\s|\s$/.test(phone)) {
      errorState.phone = {
        condition: true,
        message: language.phone_number_trim,
      };
      formIsValid = false;
    }

    if (!gender) {
      errorState.gender = {
        condition: true,
        message: language.gender_empty,
      };
      formIsValid = false;
    }

    setIsError(errorState);
    if (!formIsValid) {
      setIsSubmit(true);
      return; // Jika form tidak valid, hentikan submit
    }

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Token-API": tokenAPI,
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        gender,
      }),
    });

    const responseJson = await response.json();
    console.log(responseJson);
    // if (!responseJson.success) {
    if (responseJson.code == "VALIDATION_ERRORS") {
      setIsSubmit(true);
      return;
    }
    isSetRegistered({
      code: responseJson.code,
      email: email,
    });
    event.target.reset();
    setDataPhone("");
    setIsSubmit(true);
    return;
    // }

    // setIsSubmit(true);
    // alert("Berhasil mendaftar");
  };

  return (
    <div className="flex flex-col w-[1200px] max-w-[1200px] bg-primary px-[30px] py-[30px] rounded-3xl gap-[20px] animate-fade animate-delay-[600ms]">
      <div className="flex flex-col gap-3">
        <h1>
          <span className="text-3xl font-inter font-bold border-b-4 border-accent">
            {language.title}
          </span>
        </h1>
        <p>{language.description}</p>
      </div>
      <form onSubmit={submitAction}>
        <div className="flex flex-row gap-10 w-[100%]">
          <div className="flex-1 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label className="font-inter text-lg" htmlFor="name">
                {language.name}
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
                disabled={isSubmit ? false : true}

                  type="text"
                  id="name"
                  required
                  maxLength={100}
                  minLength={7}
                  className={`bg-background border text-xl rounded-2xl text-secondary block w-full ps-10 p-2.5 ${
                    isError.name.condition && "border-red-500"
                  }`}
                  placeholder="Rahma Contoh"
                  name="name"
                />
                {isError.name.condition && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500 absolute top-[42px]">
                    {isError.name.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-inter text-lg" htmlFor="email">
                {language.email}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12ZM16 12V13.5C16 14.8807 17.1193 16 18.5 16V16C19.8807 16 21 14.8807 21 13.5V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21H16"
                        stroke="#777777"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
                <input
                disabled={isSubmit ? false : true}

                  type="email"
                  id="email"
                  required
                  maxLength={100}
                  minLength={7}
                  className={`bg-background border text-xl rounded-2xl text-secondary block w-full ps-10 p-2.5 ${
                    isError.email.condition && "border-red-500"
                  }`}
                  placeholder="Examplle.dsd@email.com"
                  name="email"
                />
                {isError.email.condition && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500 absolute top-[42px]">
                    {isError.email.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-inter text-lg" htmlFor="phone">
                {language.phone_number}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <p className="opacity-70 text-sm">+62</p>
                </div>
                <input
                disabled={isSubmit ? false : true}
                  type="text"
                  maxLength={15}
                  minLength={5}
                  required
                  id="phone"
                  placeholder="0812....."
                  name="phone"
                  onChange={handlePhoneChange}
                  value={dataPhone}
                  className={`bg-background border text-xl rounded-xl text-secondary block w-full ps-10 p-2.5 ${
                    isError.phone.condition && "border-red-500"
                  }`}
                />
                {isError.phone.condition && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500 absolute top-[42px]">
                    {isError.phone.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label className="font-inter text-lg" htmlFor="password">
                {language.password}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M12 10V14M10.2676 11L13.7317 13M13.7314 11L10.2673 13"
                        stroke="#777777"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M6.73241 10V14M4.99999 11L8.46409 13M8.46386 11L4.99976 13"
                        stroke="#777777"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>
                      <path
                        d="M17.2681 10V14M15.5356 11L18.9997 13M18.9995 11L15.5354 13"
                        stroke="#777777"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>{" "}
                      <path
                        d="M22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C21.4816 5.82475 21.7706 6.69989 21.8985 8"
                        stroke="#777777"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>
                    </g>
                  </svg>
                </div>
                <input
                disabled={isSubmit ? false : true}

                  type="password"
                  maxLength={100}
                  minLength={7}
                  required
                  id="password"
                  className={`bg-background border text-xl rounded-xl text-secondary block w-full ps-10 p-2.5 ${
                    isError.password.condition && "border-red-500"
                  }`}
                  name="password"
                />
                {isError.password.condition && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500 absolute top-[42px]">
                    {isError.password.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-inter text-lg" htmlFor="confirm_password">
                {language.password_confirmation}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        d="M21 8.5V6C21 4.89543 20.1046 4 19 4H5C3.89543 4 3 4.89543 3 6V11C3 12.1046 3.89543 13 5 13H10.875M19 14V12C19 10.8954 18.1046 10 17 10C15.8954 10 15 10.8954 15 12V14M14 20H20C20.5523 20 21 19.5523 21 19V15C21 14.4477 20.5523 14 20 14H14C13.4477 14 13 14.4477 13 15V19C13 19.5523 13.4477 20 14 20Z"
                        stroke="#777777"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <circle cx="7.5" cy="8.5" r="1.5" fill="#777777"></circle>
                      <circle cx="12" cy="8.5" r="1.5" fill="#777777"></circle>
                    </g>
                  </svg>
                </div>
                <input
                disabled={isSubmit ? false : true}

                  type="password"
                  maxLength={100}
                  minLength={7}
                  required
                  id="confirm_password"
                  className={`bg-background border text-xl rounded-xl text-secondary block w-full ps-10 p-2.5 ${
                    isError.password.condition && "border-red-500"
                  }`}
                  name="confirm_password"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="countries" className="font-inter text-lg">
                {language.gender}
              </label>
              <select
              disabled={isSubmit ? false : true}
                id="gender"
                className={`bg-background border w-[100%] p-3 rounded-2xl font-inter text-lg text-secondary ${
                  isError.gender.condition && "border-red-500"
                }`}
                name="gender"
                required
                defaultValue={""}
              >
                <option value={""} disabled>
                  {language.gender}
                </option>
                <option value={language.boy}>{language.boy_text}</option>
                <option value={language.girl}>{language.girl_text}</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className={`bg-accent text-background py-3 w-[150px] rounded-2xl cursor-pointer hover:opacity-70 transition-all font-inter text-lg self-end flex justify-center ${
              !isSubmit && "opacity-50"
            }`}
          >
            {isSubmit ? (
              language.submit
            ) : (
              <div class="flex items-center justify-center w-7 h-7 animate-fade">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="w-8 h-8 text-background animate-spin fill-accent"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            )}
            {/* {language.submit} */}
          </button>
        </div>
      </form>
    </div>
  );
}
