"use client";

import { supabase } from "@/lib/supabase";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

const Modal = ({
  modal,
  setModal,
}: {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const modalRef = useRef(null);
  const [email, setEmail] = useState("");
  const [existed, setExsited] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [fading, setFading] = useState(false);
  const [register, setRegister] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !(modalRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setModal(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, setModal]);

  useEffect(() => {
    if (modal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [modal]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email);

    if (error) {
      console.error("Error fetching users:", error.message);
    } else if (users.length === 0) {
      console.log("No users found with the specified email address.");
    } else {
      console.log("Users found:", users);
      setExsited(true);
      return;
    }

    setFading(true);
    setTimeout(() => {
      setConfirmed(true);
      setFading(false);
    }, 700);
  };

  const handleChange = () => {
    setFading(true);
    setTimeout(() => {
      setConfirmed(false);
      setExsited(false);
      setFading(false);
    }, 700);
  };

  const handleRegister = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: "http://localhost:3000/dashboard",
      },
    });

    if (error) {
      console.log(error.message);
    }

    setFading(true);
    setTimeout(() => {
      setConfirmed(false);
      setRegister(true);
      setFading(false);
    }, 700);
  };

  return (
    <>
      {modal && (
        <div
          className={`fixed z-10 top-0 left-0 w-full h-full bg-black bg-opacity-50 transition-opacity duration-1000 ${
            fading ? "opacity-0" : "opacity-100"
          }`}
        >
          <div
            className="relative z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[90vh] w-[45vw] p-10 bg-slate-100 border border-neutral-950 rounded-xl"
            ref={modalRef}
          >
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-3xl">
                {register || existed
                  ? "登録が完了いたしました"
                  : confirmed
                  ? "メールアドレスの確認"
                  : "メールアドレスの登録"}
              </h1>
              <div className="h-1 bg-slate-600 w-3/4 my-5"></div>
              <h2 className="text-center">
                {existed ? (
                  "すでに登録されているメールアドレスです。"
                ) : register ? (
                  <>
                    リリース通知を受け取るには、
                    <span className="text-red-500 font-bold">
                      送信したメールに含まれるURLをクリック
                    </span>
                    して、本人確認を完了させてください。
                  </>
                ) : confirmed ? (
                  "こちらのメールアドレスでお間違い無いですか？"
                ) : (
                  "通知を受け取るメールアドレスを入力して下さい。"
                )}
              </h2>
              {confirmed && (
                <h2 className="mt-5">
                  登録すると利用規約、プライバシーポリシーに同意したものとみなされます。
                </h2>
              )}
              {!register && (
                <form
                  onSubmit={handleSubmit}
                  className="my-10 flex flex-col w-full"
                >
                  {confirmed || existed ? (
                    <h2 className="p-2 w-[full] mx-28 mb-10 text-center font-bold text-2xl">
                      {email}
                    </h2>
                  ) : (
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="abcde@example.com"
                      className="border rounded-lg p-2 w-[full] mx-28 mb-5"
                      required
                    />
                  )}
                  {existed ? (
                    <button
                      type="button"
                      onClick={handleChange}
                      className="bg-gray-400 text-white rounded-md px-4 py-2 mx-28 transition duration-300 ease-in-out hover:bg-gray-500 w-[full]"
                    >
                      変更
                    </button>
                  ) : confirmed ? (
                    <div className="w-full flex justify-center">
                      <button
                        type="button"
                        onClick={handleChange}
                        className="bg-gray-400 text-white rounded-md px-4 py-2 w-1/2 ml-20 mr-5 transition duration-300 ease-in-out hover:bg-gray-500"
                      >
                        変更
                      </button>
                      <button
                        type="button"
                        onClick={handleRegister}
                        className="bg-blue-400 text-white rounded-md px-4 py-2 w-1/2 mr-20 ml-5 transition duration-300 ease-in-out hover:bg-blue-500"
                      >
                        登録
                      </button>
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="bg-blue-400 text-white rounded-md px-4 py-2 mx-28 transition duration-300 ease-in-out hover:bg-blue-500 w-[full]"
                    >
                      登録
                    </button>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
