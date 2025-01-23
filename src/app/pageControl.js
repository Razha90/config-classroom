"use client";

import Footer from "@/component/template/footer";
import { useEffect } from "react";
import Header from "@/component/template/header";
import Main from "../component/template/main";
import { useState } from "react";

export default function PageControl({
  headerLanguage,
  mainLanguage,
  footerLanguage,
  session,
}) {
  const [heightHeader, setHeightHeader] = useState(0);

  return (
    <>
      <Header
        language={headerLanguage}
        setHeaderHeight={setHeightHeader}
        session={session}
      />
      <Main language={mainLanguage} headerHeight={heightHeader} />
      <Footer language={footerLanguage} />
    </>
  );
}
