"use server";

import { getDictionary } from "@/lib/dictionary";
import { headers } from "next/headers";
import PageControl from "./pageControl";
import { SignIn } from "@/component/template/formLogin";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  const headersList = await headers();
  const userLanguage = headersList.get("user-language") || "id";
  const headerLanguage = await getDictionary(userLanguage, "general");
  const loginLanguage = await getDictionary(userLanguage, "login");
  return (
    <>
      <PageControl headerLanguage={headerLanguage} session={session} />
      <div className="flex justify-center items-center h-[80vh]">
        <SignIn language={loginLanguage} />
      </div>
    </>
  );
}
