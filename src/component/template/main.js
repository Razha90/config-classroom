"use client";

import Image from "next/image";

export default function Main({ language, headerHeight }) {
  return (
    <main className="md-415:px-0 w-full">
      <article id="plan1" className="bg-primary px-[12%] lg-540:px-0 transition-all duration-300 ease-in-out" style={{ paddingTop: `${headerHeight}px` }}>
        <div className="relative w-full flex flex-col bg-cover rounded-2xl aspect-video items-center justify-center lg-540:rounded-none lg-540:h-auto bg-[url('/img/bg-teknik.jpg')] h-[calc(35vw)] transition-all animate-delay-[350ms] animate-fade">
          <div className="absolute inset-0 z-10 bg-black/30 rounded-2xl lg-540:rounded-none"></div>

          <div className="relative bg-white/35 backdrop-blur-md rounded-lg p-6 max-w-md z-40 text-secondary font-inter">
            <h2 className="text-center text-3xl mb-3">
              {language.plan1.title}
            </h2>
            <p className="font-inter xl-768:line-clamp-3 transition-all lg-540:line-clamp-5">{language.plan1.description}</p>
          </div>
        </div>
      </article>
      <article id="plan2" className="px-[12%] relative">
        <h2 className="text-center text-accent text-5xl font-josefin pt-[130px] pb-[60px] font-bold">
          {language.plan2.title}
        </h2>

        <div className="absolute w-full bg-primary h-[290px] rounded-b-[110px] left-0 top-0 -z-10"></div>
        <div className="font-josefin z-50 flex gap-4 flex-col">
          {language.plan2.content.map((item, index) => {
            return (
              <div
                key={index}
                className="p-[25px] shadow-lg border-2 rounded-3xl border-[--accent] bg-background max-w-[50%]"
              >
                <h3 className="text-2xl text-secondary font-extrabold">
                  {item.title}
                </h3>
                <p className="text-lg mt-2">{item.description}</p>
              </div>
            );
          })}
        </div>
      </article>
      <article className="mt-[100px]">
        <h2 className="text-center text-5xl font-josefin text-accent font-bold">
          {language.plan3.title}
        </h2>
        <div className="mx-auto max-w-[78%] overflow-hidden mt-[80px] css-overflow-effect">
          <div className="flex w-full flex-row gap-[4%] css-grouped">
            <div className="min-w-full gap-[4%] flex animate-marquee-back py-7 child">
              {language.plan3.content.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-full bg-background rounded-2xl shadow-xl"
                  >
                    <div className="w-full h-[200px] overflow-hidden rounded-t-2xl">
                      <Image
                        src={item.profile}
                        width={1000}
                        height={1000}
                        className="w-full h-full object-cover rounded-t-2xl hover:scale-150 transition-transform"
                        alt={item.title}
                        title={item.title}
                        loading="lazy"
                      />
                    </div>
                    <div className="p-[20px]">
                      <h3 className="text-xl text-center text-accent font-extrabold">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="min-w-full gap-[4%] flex animate-marquee-back py-7 child">
              {language.plan3.content.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-full bg-background rounded-2xl shadow-xl"
                  >
                    <div className="w-full h-[200px] overflow-hidden rounded-t-2xl">
                      <Image
                        src={item.profile}
                        alt={item.title}
                        width={1000}
                        height={1000}
                        className="w-full h-full object-cover rounded-t-2xl hover:scale-150 transition-transform"
                        title={item.title}
                        loading="lazy"
                      />
                    </div>
                    <div className="p-[20px]">
                      <h3 className="text-xl text-center text-accent font-extrabold">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </article>

      <article className="mt-[100px]">
        <h2 className="text-center text-5xl font-josefin text-accent font-bold">
          {language.plan4.title}
        </h2>
        <div className="mx-auto max-w-[78%] overflow-hidden mt-[80px] css-overflow-effect">
          <div className="flex w-full flex-row gap-[4%] css-grouped">
            <div className="min-w-full gap-[4%] translate-x-[-100%] flex animate-marquee-forward py-7 child">
              {language.plan4.content.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-full bg-background rounded-2xl shadow-xl"
                  >
                    <div className="w-full h-[200px] overflow-hidden rounded-t-2xl">
                      <Image
                        src={item.profile}
                        alt={item.title}
                        width={1000}
                        height={1000}
                        className="w-full h-full object-cover rounded-t-2xl hover:scale-150 transition-transform"
                        title={item.title}
                        loading="lazy"
                      />
                    </div>
                    <div className="p-[20px]">
                      <h3 className="text-xl text-center text-accent font-extrabold">
                        {item.title}
                      </h3>
                    </div>

                  </div>
                );
              })}
            </div>
            <div className="min-w-full gap-[4%] flex translate-x-[-100%] animate-marquee-forward py-7 child">
              {language.plan4.content.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-full bg-background rounded-2xl shadow-xl"
                  >
                    <div className="w-full h-[200px] overflow-hidden rounded-t-2xl">
                      <Image
                        src={item.profile}
                        alt={item.title}
                        width={1000}
                        height={1000}
                        className="w-full h-full object-cover rounded-t-2xl hover:scale-150 transition-transform"
                        title={item.title}
                        loading="lazy"
                      />
                    </div>
                    <div className="p-[20px]">
                      <h3 className="text-xl text-center text-accent font-extrabold">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}