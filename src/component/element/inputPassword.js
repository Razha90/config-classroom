"use client";

import { useState } from "react";

export default function InputPassword() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };
  return (
    <div className="flex flex-col gap-2">
      <label className="font-inter text-lg">Password</label>
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
              d="M24 34C22.9391 34 21.9217 33.5786 21.1716 32.8284C20.4214 32.0783 20 31.0609 20 30C20 27.78 21.78 26 24 26C25.0609 26 26.0783 26.4214 26.8284 27.1716C27.5786 27.9217 28 28.9391 28 30C28 31.0609 27.5786 32.0783 26.8284 32.8284C26.0783 33.5786 25.0609 34 24 34ZM36 40V20H12V40H36ZM36 16C37.0609 16 38.0783 16.4214 38.8284 17.1716C39.5786 17.9217 40 18.9391 40 20V40C40 41.0609 39.5786 42.0783 38.8284 42.8284C38.0783 43.5786 37.0609 44 36 44H12C10.9391 44 9.92172 43.5786 9.17157 42.8284C8.42143 42.0783 8 41.0609 8 40V20C8 17.78 9.78 16 12 16H14V12C14 9.34784 15.0536 6.8043 16.9289 4.92893C18.8043 3.05357 21.3478 2 24 2C25.3132 2 26.6136 2.25866 27.8268 2.7612C29.0401 3.26375 30.1425 4.00035 31.0711 4.92893C31.9997 5.85752 32.7362 6.95991 33.2388 8.17317C33.7413 9.38642 34 10.6868 34 12V16H36ZM24 6C22.4087 6 20.8826 6.63214 19.7574 7.75736C18.6321 8.88258 18 10.4087 18 12V16H30V12C30 10.4087 29.3679 8.88258 28.2426 7.75736C27.1174 6.63214 25.5913 6 24 6Z"
              fill="#777777"
            />
          </svg>
        </div>
        <input
          required
          minLength={6}
          maxLength={100}
          type={isPasswordVisible ? "text" : "password"}
          id="password"
          className="bg-background border text-gray-900 text-xl rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
          placeholder={isPasswordVisible ? "password" : "••••••••"}
          name="password"
        />
        <div
          className="absolute inset-y-0 right-0 flex items-center ps-3.5 pr-3 rounded-full hover:bg-gray-200 cursor-pointer transition-all"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? (
            <svg
              width="24px"
              height="24px"
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
                <path
                  d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
                  stroke="#777777"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
                  stroke="#777777"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
          ) : (
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#777777"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5"
                  stroke="#777777"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
