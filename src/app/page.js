"use server";

import { auth } from "@/auth";
import { getDictionary } from "../lib/dictionary";
import PageControl from "./pageControl.js";
import { headers } from "next/headers";

export default async function Home() {
  const headersList = await headers();
  const userLanguage = headersList.get("user-language") || "id";
  const tokepAPI = headersList.get("X-Token-API");

  const generalLanguage = await getDictionary(userLanguage, "general");
  const mainLanguage = await getDictionary(userLanguage, "main");
  const footerLanguage = await getDictionary(userLanguage, "footer");

  const session = await auth();
 
  return (
    <>
      <PageControl
        generalLanguage={generalLanguage}
        mainLanguage={mainLanguage}
        footerLanguage={footerLanguage}
        session={session}
      />
    </>
  );
}

// 'use server';

// import { getDictionary } from "../lib/dictionary";
// import PageControl from "./pageControl.js";
// import { cookies, headers } from 'next/headers'

// export default async function Home() {
//   const cookieStore = await cookies();
//   const userLanguage = cookieStore.get('user-language');
//   const language = await getDictionary(userLanguage.value || 'id');
//   return (
//     <>
//       <PageControl language={language} />
//     </>
//   );
// }
