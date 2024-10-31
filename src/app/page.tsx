import Image from "next/image";
import PriorRegistration from "./components/PriorRegistration";

export default function Home() {
  return (
    <div>
      <div>
        <Image
          src="/images/img10.jpg"
          alt="サンプル画像"
          width={1920}
          height={1080}
          priority
        />
      </div>

      <div className="bg-slate-800 w-full h-[100vh] flex justify-center items-center text-9xl">
        <h1 className="flex-col text-blue-300 font-bold text-left">
          ECに
          <div>
            <span className="text-sky-500">おもしろさ</span>を
          </div>
        </h1>
      </div>

      <div className="bg-slate-800 w-full h-[100vh] relative">
        <div className="bg-slate-100 border border-neutral-950 rounded-xl text-slate-800 p-10 ml-6 absolute left-0 top-28 z-10">
          <h1 className="text-7xl font-bold">1. 左右スワイプ</h1>
          <h2 className="text-5xl mt-4">
            <div className="py-5">雑誌をめくるような、</div>
            <div>新たな出会いのワクワクを</div>
          </h2>
        </div>
        <Image
          src="/images/img1.png"
          alt="サンプル画像"
          width={914}
          height={720}
          priority
          className="absolute right-5 top-10"
        />
      </div>

      <div className="bg-slate-800 w-full h-[100vh] flex justify-between items-center">
        <Image
          src="/images/img2.png"
          alt="サンプル画像"
          width={401}
          height={600}
          priority
          className="ml-36"
        />
        <div className="bg-slate-100 border border-neutral-950 rounded-xl text-slate-800 p-10 mr-48 -mt-40">
          <h1 className="text-7xl font-bold">2. 共同購入</h1>
          <h2 className="text-5xl mt-4">
            <div className="py-5">気になっているものを</div>
            <div>友達と購入</div>
          </h2>
        </div>
      </div>

      <div>
        <PriorRegistration />
      </div>
    </div>
  );
}
