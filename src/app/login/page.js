"use server";

import { getDictionary } from "@/lib/dictionary";
import { headers } from "next/headers";
import PageControl from "./pageControl";
import { SignIn } from "@/component/template/formLogin";
import { auth } from "@/auth";
import Footer from "@/component/template/footer";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session) {
    redirect("/");
  }
  const headersList = await headers();
  const userLanguage = headersList.get("user-language") || "id";

  const [headerLanguage, loginLanguage, footerLanguage] = await Promise.all([
    getDictionary(userLanguage, "header"),
    getDictionary(userLanguage, "login"),
    getDictionary(userLanguage, "footer"),
  ]);
  return (
    <>
      <PageControl headerLanguage={headerLanguage} session={session} />
      <div className="flex justify-center items-center h-[80vh]">
        <SignIn language={loginLanguage} />
      </div>
      <Footer language={footerLanguage} />
    </>
  );
}
