"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer({ language }) {
  return (
    <footer className="bg-primary font-inter flex justify-between gap-4 px-[12%] align-top mt-[100px] text-accent py-[2%] transition-all sm-375:px-[1%] xl-768:flex-wrap xl-768:gap-4 xl-768:justify-start sm-375:justify-center">
      <div>
        <Link
          href="/"
          className="flex flex-row justify-center items-center gap-3"
          title="Home Page"
          aria-label="Home Page"
        >
          <Image
            src="/img/logo_unimed.png"
            width={1200}
            height={1217}
            alt="Logo Unimed"
            className="w-[80px] min-w-[70px] sm-375:min-w-[50px]"
            title="Logo Unimed"
            loading="lazy"
          />
          <h1 className="text-4xl font-bold whitespace-nowrap sm-375:text-3xl">Sipda Unimed</h1>
        </Link>
      </div>
      <div>
        <h2 className="font-bold text-xl">{language.contact.title}</h2>
        <nav>
          <ul>
            {language.contact.content.map((item, index) => {
              return (
                <li key={index} className="mt-[10px]">
                  <p className="font-bold">{item.title}</p>
                  <p className="max-w-[300px]">{item.description}</p>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div>
        <h2 className="font-bold text-xl whitespace-nowrap">
          {language.social.title}
        </h2>
        <nav>
          <ul>
            {language.social.content.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    href={item.link ? item.link : ""}
                    aria-label={"Pergi ke halaman " + item.title}
                    target="_blank"
                    title={item.title}
                    rel="noopener noreferrer"
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <div>
        <h2 className="font-bold text-xl">{language.another.title}</h2>
        <nav>
          <ul>
            {language.another.content.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    href={item.link ? item.link : ""}
                    aria-label={item.title}
                    target="_blank"
                    title={item.title}
                    rel="noopener noreferrer"
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      {/* <div className="flex align-top justify-between font-inter gap-[10%]">

      </div> */}
    </footer>
  );
}
