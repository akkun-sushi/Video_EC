"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PriorRegistration from "./components/PriorRegistration";

export default function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("header");
      const targetHeight = 800; // スクロール位置が800pxを超えたら表示する

      if (window.scrollY > targetHeight) {
        header?.classList.remove("opacity-0");
        header?.classList.add("opacity-100");
      } else {
        header?.classList.remove("opacity-100");
        header?.classList.add("opacity-0");
      }
    };

    // スクロールイベントのリスナーを追加
    window.addEventListener("scroll", handleScroll);

    // クリーンアップ処理: イベントリスナーの削除
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        id="header"
        className="fixed top-0 left-0 z-50 w-full h-20 bg-slate-600 flex justify-center items-center opacity-0 transition-opacity duration-300"
      >
        <div className="text-5xl font-bold italic">
          <h1 className="text-white">
            q<span className="text-sky-500">Ui</span>ck
          </h1>
        </div>
      </header>
      <div className="flex flex-col justify-center items-center w-screen bg-slate-800">
        <section className="relative w-full min-h-screen">
          <Image
            src="/images/img10.jpg"
            alt="サンプル画像"
            quality={100}
            fill
            priority
            className="fade-image"
          />
        </section>

        <section className="container w-full min-h-screen text-6xl sm:text-8xl lg:text-9xl flex flex-col justify-center items-center">
          <h1 className="flex-col text-blue-300 font-bold text-left">
            ECに
            <div>
              <span className="text-sky-500">おもしろさ</span>を
            </div>
          </h1>
        </section>

        <section className="container w-full min-h-screen relative">
          <div className="bg-slate-100 border border-neutral-950 rounded-xl text-slate-800 p-5 sm:p-7 lg:p-10 absolute left-5 md:left-0 top-0 lg:top-44 z-10">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold">
              1. 左右スワイプ
            </h1>
            <h2 className="text-xl sm:text-3xl lg:text-5xl mt-2 md:mt-4">
              <div className="py-1 sm:py-3 lg:py-5">雑誌をめくるような、</div>
              <div>新たな出会いのワクワクを</div>
            </h2>
          </div>
          <Image
            src="/images/img1.png"
            alt="サンプル画像"
            width={914}
            height={720}
            priority
            className="absolute right-5 top-28 w-4/5"
          />
        </section>

        <section className="container w-full min-h-screen relative">
          <div className="bg-slate-100 border border-neutral-950 rounded-xl text-slate-800 p-5 sm:p-7 lg:p-10 absolute left-5 top-0 lg:top-56 z-10">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold">
              2. 共同購入
            </h1>
            <h2 className="text-xl sm:text-3xl lg:text-5xl mt-2 md:mt-4">
              <div className="py-1 sm:py-3 lg:py-5">気になっているものを</div>
              <div>友達と購入</div>
            </h2>
          </div>
          <Image
            src="/images/img2.png"
            alt="サンプル画像"
            width={401}
            height={600}
            priority
            className="absolute right-10 lg:right-28 top-24 lg:top-40 w-3/5 lg:w-2/5"
          />
        </section>

        <section className="container">
          <PriorRegistration />
        </section>
      </div>
    </>
  );
}
