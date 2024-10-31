"use client";

import Image from "next/image";
import { useState } from "react";
import Modal from "./Modal";

const PriorRegistration = () => {
  const [modal, setModal] = useState(false);
  return (
    <div className="bg-slate-800 w-full h-[100vh] flex flex-col justify-center items-center">
      <h1 className="text-sky-400 font-bold text-8xl -mt-20 cursor-default">
        事前登録受付中！
      </h1>
      <button
        onClick={() => setModal(true)}
        className="bg-blue-600 text-white rounded-md px-4 py-4 text-5xl transition duration-300 ease-in-out hover:bg-blue-700 mt-40 w-1/3"
      >
        メールで事前登録
      </button>
      <div className="w-1/3 flex justify-between mt-12">
        <button>
          <Image
            src="https://sgimage.netmarble.com/common/download/img/ja_appstore_pre.svg"
            alt="Download from App Store"
            width={220}
            height={50}
            className="transition duration-300 ease-in-out hover:opacity-70"
          />
        </button>
        <button>
          <Image
            src="https://sgimage.netmarble.com/common/download/img/ja_googleplay_pre.svg"
            alt="Google Play Button"
            width={260}
            height={50}
            className="transition duration-300 ease-in-out hover:opacity-70"
          />
        </button>
      </div>
      <Modal modal={modal} setModal={setModal} />
    </div>
  );
};

export default PriorRegistration;
