"use client";

import Footer from "@/component/template/footer";
import Header from "@/component/template/header";
import { useEffect, useState } from "react";

export default function PageControl({
  tokenAPI,
  languageHeader,
  languageFooter,
  verifyLanguage,
}) {
  const [headerHeight, setHeaderHeight] = useState(false);
  const [isError, setError] = useState();
  const [isAnimate, setAnimate] = useState(0);

  function createMessage(code) {
    switch (code) {
      case "EMPTY_TOKEN":
        return verifyLanguage.empty_token;
      case "WRONG_TOKEN":
        return verifyLanguage.wrong_token;
      case "TOKEN_EXPIRED":
        return verifyLanguage.token_expired;
      case "SERVER_ERROR":
        return verifyLanguage.server_error;
      case "FINDING_FAILED":
        return verifyLanguage.finding_failed;
      case "SUCCESS_VERIFIED":
        return verifyLanguage.success_verified;
      default:
        return verifyLanguage.default;
    }
  }

  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    const tokenURL = url.get("token");
    async function getData() {
      fetch(`/api/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Token-API": tokenAPI,
        },
        body: JSON.stringify({ token: tokenURL }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setError(data.code);
          if (data.code === "SUCCESS_VERIFIED") {
            setTimeout(() => {
              setAnimate(3);
              window.location.href = "/login";
            }, 3000);
          }
        })
        .catch((error) => {
          setError("SERVER_ERROR");
        });
    }

    if (tokenURL) {
      setTimeout(() => {
        setAnimate(1);
        setTimeout(() => {
          setAnimate(2);
          getData();
        }, 1000);
      }, 1000);
    } else {
      setError("EMPTY_TOKEN");
    }
  }, [tokenAPI]);

  return (
    <>
      <Header language={languageHeader} setHeaderHeight={setHeaderHeight} />
      <div style={{ height: `${headerHeight}px` }}></div>
      <div className="flex justify-center items-center animate-fade-down">
        <div className="max-w-[600px] h-[500px] bg-primary rounded-3xl overflow-hidden w-[600px]">
          <ol className="flex items-center w-full p-3 space-x-2 text-sm font-inter text-center text-background border shadow-sm bg-slate-800 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
            <li
              className={`flex items-center ${
                isAnimate > 0 ? "text-blue-500" : "text-background"
              }`}
            >
              <span
                className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${
                  isAnimate > 0
                    ? "border-blue-600 text-blue-500"
                    : "border-white text-background"
                }`}
              >
                1
              </span>
              {verifyLanguage.personal_info}
              <svg
                className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 12 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m7 9 4-4-4-4M1 9l4-4-4-4"
                />
              </svg>
            </li>
            <li
              className={`flex items-center ${
                isAnimate > 1 ? "text-blue-500" : "text-background"
              }`}
            >
              <span
                className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${
                  isAnimate > 1
                    ? "border-blue-600 text-blue-500"
                    : "border-white text-background"
                }`}
              >
                2
              </span>
              {verifyLanguage.verify_email}
              <svg
                className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 12 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m7 9 4-4-4-4M1 9l4-4-4-4"
                />
              </svg>
            </li>
            <li
              className={`flex items-center ${
                isAnimate > 2 ? "text-blue-500" : "text-background"
              }`}
            >
              <span
                className={`flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0 ${
                  isAnimate > 2
                    ? "border-blue-600 text-blue-500"
                    : "border-white text-background"
                }`}
              >
                3
              </span>
              {verifyLanguage.register_success}
            </li>
          </ol>
          <div className="flex justify-center items-center h-[80%]">
            {!isError ? (
              <div className="animate-spin animate-duration-[1500ms]">
                <svg
                  width={200}
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
                      d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z"
                      fill="#07617c"
                    ></path>{" "}
                    <path
                      d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
                      fill="#07617c"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center bg-background p-10 rounded-2xl">
                {isError === "SUCCESS_VERIFIED" ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    width={100}
                    className="animate-jump"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM14.4743 8.419C14.7952 8.68094 14.8429 9.15341 14.581 9.47428L8.86671 16.4743C8.72427 16.6488 8.51096 16.75 8.28571 16.75C8.06047 16.75 7.84716 16.6488 7.70472 16.4743L5.419 13.6743C5.15707 13.3534 5.20484 12.8809 5.52572 12.619C5.84659 12.3571 6.31906 12.4048 6.581 12.7257L8.28571 14.814L13.419 8.52572C13.6809 8.20484 14.1534 8.15707 14.4743 8.419ZM18.4743 8.41901C18.7952 8.68095 18.8429 9.15342 18.581 9.47429L12.8665 16.4743C12.7152 16.6596 12.4846 16.7617 12.2457 16.7489C12.0068 16.7362 11.7883 16.6103 11.6575 16.4099L11.3719 15.9724C11.1455 15.6256 11.2432 15.1608 11.5901 14.9344C11.7939 14.8014 12.0384 14.7803 12.2514 14.8558L17.419 8.52571C17.681 8.20484 18.1534 8.15707 18.4743 8.41901Z"
                        fill="#0ff035"
                      ></path>
                    </g>
                  </svg>
                ) : (
                  <svg
                    fill="#f00000"
                    viewBox="0 0 200 200"
                    data-name="Layer 1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#f00000"
                    width={100}
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <title></title>
                      <path d="M100,15a85,85,0,1,0,85,85A84.93,84.93,0,0,0,100,15Zm0,150a65,65,0,1,1,65-65A64.87,64.87,0,0,1,100,165Z"></path>
                      <path d="M128.5,74a9.67,9.67,0,0,0-14,0L100,88.5l-14-14a9.9,9.9,0,0,0-14,14l14,14-14,14a9.9,9.9,0,0,0,14,14l14-14,14,14a9.9,9.9,0,0,0,14-14l-14-14,14-14A10.77,10.77,0,0,0,128.5,74Z"></path>
                    </g>
                  </svg>
                )}
                <div className="mt-4">
                  <h1 className="font-inter text-xl font-bold">
                    {createMessage(isError)}
                  </h1>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* {params && <div></div>} */}
      <Footer language={languageFooter} />
    </>
  );
}
