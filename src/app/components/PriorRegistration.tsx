"use client";

import Image from "next/image";
import { useState } from "react";
import Modal from "./Modal";

const PriorRegistration = () => {
  const [modal, setModal] = useState(false);
  return (
    <div className="bg-slate-800 w-full min-h-screen flex flex-col justify-center items-center lg:mt-60">
      <h1 className="text-sky-400 font-bold text-4xl sm:text-6xl lg:text-8xl -mt-20 cursor-default">
        事前登録受付中！
      </h1>
      <button
        onClick={() => setModal(true)}
        className="bg-blue-600 text-white rounded-md px-4 py-4 text-3xl sm:text-4xl lg:text-5xl transition duration-300 ease-in-out hover:bg-blue-700 mt-10 sm:mt-20 lg:mt-40"
      >
        メールで事前登録
      </button>
      <div className="w-full flex justify-center lg:mt-12">
        <button>
          <Image
            src="https://sgimage.netmarble.com/common/download/img/ja_appstore_pre.svg"
            alt="Download from App Store"
            width={220}
            height={50}
            className="flex-1 size-40 sm:size-56 lg:size-72 mr-2 transition duration-300 ease-in-out hover:opacity-70"
          />
        </button>
        <button>
          <Image
            src="https://sgimage.netmarble.com/common/download/img/ja_googleplay_pre.svg"
            alt="Google Play Button"
            width={260}
            height={50}
            className="flex-1 size-48 sm:size-64 lg:size-80 ml-2 transition duration-300 ease-in-out hover:opacity-70"
          />
        </button>
      </div>
      <Modal modal={modal} setModal={setModal} />
    </div>
  );
};

export default PriorRegistration;
