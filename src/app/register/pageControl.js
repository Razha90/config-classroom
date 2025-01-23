"use client";

import Footer from "@/component/template/footer";
import { SignUp } from "@/component/template/formRegister";
import Header from "@/component/template/header";
import Link from "next/link";
import { useState } from "react";

export default function PageControl({
  headerLanguage,
  session,
  registerLanguage,
  tokenAPI,
  footerLanguage
}) {
  const [heightHeader, setHeightHeader] = useState(0);
  const [isRegister, setIsRegister] = useState({
    code: "",
    email: "",
  });

  function getMessageCode(status) {
    switch (status) {
      case "USER_EXISTS":
        return registerLanguage.user_exist;
      case "ERROR_SERVER":
        return registerLanguage.error_server;
      case "ERROR_REGISTERING_USER":
        return registerLanguage.error_registered;
      case "USER_REGISTERED":
        return registerLanguage.success_register;
      case "ERROR_SENDING_EMAIL_VERIFICATION":
        return registerLanguage.error_sending_email;
      default:
        return registerLanguage.error_default;
    }
  }

  return (
    <>
      <Header
        language={headerLanguage}
        setHeaderHeight={setHeightHeader}
        session={session}
      />
      <div style={{ paddingTop: `${heightHeader}px` }}></div>
      <div className="flex justify-center items-center h-[80vh]">
        <SignUp
          language={registerLanguage}
          tokenAPI={tokenAPI}
          isSetRegistered={setIsRegister}
        />
      </div>
      {isRegister.code && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade">
          <div className="min-w-[320px] max-w-[700px] text-center bg-primary rounded-lg py-3 px-5 animate-fade-down">
            <div className="flex justify-end mb-5">
              <div
                className="cursor-pointer transition-all hover:opacity-70"
                onClick={() => setIsRegister({ code: "", email: "" })}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
            <p className="font-inter mx-5 text-xl">
              {getMessageCode(isRegister.code)}
            </p>
            <div className="flex justify-center mt-4">
              <div className="bg-background min-w-[200px] rounded-md p-3">
                <div
                  className={`w-12 h-12 rounded-full p-2 flex items-center justify-center mx-auto mb-3.5 ${
                    isRegister.code == "USER_REGISTERED"
                      ? "bg-green-300"
                      : "bg-red-300"
                  }`}
                >
                  {isRegister.code == "USER_REGISTERED" ? (
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-green-600 dark:text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      fill="#ff0000"
                      height="200px"
                      width="200px"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 295.428 295.428"
                      stroke="#ff0000"
                      strokeWidth="1"
                    >
                      <path d="M147.714,0C66.264,0,0,66.264,0,147.714s66.264,147.714,147.714,147.714s147.714-66.264,147.714-147.714S229.164,0,147.714,0z M147.714,265.428C82.807,265.428,30,212.621,30,147.714S82.807,30,147.714,30s117.714,52.807,117.714,117.714S212.621,265.428,147.714,265.428z"></path>

                      <path d="M147.714,61.68c-8.284,0-15,6.716-15,15v79c0,8.284,6.716,15,15,15s15-6.716,15-15v-79C162.714,68.396,155.998,61.68,147.714,61.68z"></path>

                      <circle cx="147.714" cy="217.68" r="15"></circle>
                    </svg>
                  )}
                </div>
                <p className="text-accent font-josefin">{isRegister.email}</p>
              </div>
            </div>
            <div className="flex justify-center my-5">
              {isRegister.code == "USER_REGISTERED" ? (
                <Link
                  href="/login"
                  className="text-background bg-accent hover:opacity-70 transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 font-inter"
                >
                  {registerLanguage.continue}
                </Link>
              ) : (
                <button
                  onClick={() => setIsRegister({ code: "", email: "" })}
                  className="text-background bg-accent hover:opacity-70 transition-all focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 font-inter"
                >{registerLanguage.close}</button>
              )}
            </div>
          </div>
          {/* )} */}
        </div>
      )}
      <Footer language={footerLanguage} />

    </>
  );
}
