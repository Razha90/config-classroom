"use client";

import Header from "@/component/template/header";
import Link from "next/link";
import { useState } from "react";

export default function PageControl({ headerLanguage, session }) {
  const [heightHeader, setHeightHeader] = useState(0);

  return (
    <>
      <Header
        language={headerLanguage}
        setHeaderHeight={setHeightHeader}
        session={session}
      />
      <div style={{ paddingTop: `${heightHeader}px` }}></div>
    </>
  );
}
