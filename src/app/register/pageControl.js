"use client";

import { SignUp } from "@/component/template/formRegister";
import Header from "@/component/template/header";
import { useState } from "react";

export default function PageControl({ headerLanguage, session, loginLanguage, tokenAPI }) {
  const [heightHeader, setHeightHeader] = useState(0);
  const [isRegister, setIsRegister] = useState("");

  return (
    <>
      <Header
        language={headerLanguage}
        setHeaderHeight={setHeightHeader}
        session={session}
      />
      <div style={{ paddingTop: `${heightHeader}px` }}></div>
      <div className="flex justify-center items-center h-[80vh]">
        <SignUp language={loginLanguage} tokenAPI={tokenAPI} isSetRegistered={setIsRegister} />
      </div>
      {
        isRegister && (<div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade">

        </div>)
      }
    </>
  );
}
