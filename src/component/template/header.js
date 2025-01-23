"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";
export default function Header({ language, setHeaderHeight, session }) {
  const [isLogin, setIsLogin] = useState(false);
  const [isHome, setHome] = useState(false);
  const headerRef = useRef(null);
  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/login") {
      setIsLogin(true);
    }
    if (path === "/") {
      setHome(false);
    } else {
      setHome(true);
    }
  }, []);
  useEffect(() => {
    console.log(session);
    const handleResize = () => {
      if (headerRef.current) {
        const header = headerRef.current;
        const height = header.offsetHeight;
        const styles = window.getComputedStyle(header);
        const paddingTop = parseFloat(styles.paddingTop);
        const totalHeight = height + paddingTop;
        setHeaderHeight(totalHeight);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setHeaderHeight]);
  return (
    <header
      ref={headerRef}
      className="px-[7%] py-[1%] bg-primary fixed w-full z-50 flex items-center justify-between animate-fade"
      id="get-height"
    >
      <nav className="flex flex-row justify-between font-inter text-accent w-full">
        <div>
          <Link
            href="/"
            className="flex flex-row justify-center items-center gap-3"
          >
            <Image
              src="/img/logo_unimed.png"
              width={1200}
              height={1217}
              alt="Logo Unimed"
              className="w-[60px] min-w-[30px]"
            />
            <h1 className="text-4xl font-bold">Sipda Unimed</h1>
          </Link>
        </div>
        {/* {session && (
          <ul className="list-none p-0 m-0 flex flex-row items-center gap-5">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        )} */}
        <ul className="list-none p-0 m-0 flex flex-row items-center gap-5">
          <li className="hover:opacity-60">
            {isHome && (
              <Link href="/" className="font-bold text-2xl">
                Home
              </Link>
            )}
          </li>

          {session ? (
            <li>
              {/* <Link href="/register">{language.register}</Link> */}
              <button onClick={() => signOut()}>{session.user.name}</button>
            </li>
          ) : isLogin ? null : (
            <li className="hover:opacity-60 transition-all">
              <Link
                href="/login"
                className="flex flex-row justify-center items-center font-bold text-2xl"
              >
                <Image
                  src="/img/login-icon.png"
                  width="50"
                  height="50"
                  alt="login"
                />
                <p>{language.login}</p>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
