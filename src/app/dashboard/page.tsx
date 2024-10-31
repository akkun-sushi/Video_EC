"use client";

import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

   //認証状態の変更を監視するリスナー設定
   useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);

        //ユーザーがサインインして、セッションが存在する場合
        if (event === "SIGNED_IN" && session) {
          const { user } = session;

          //データベースからサインインしたidと一致するレコードを取得
          const { data: firstSignIn } = await supabase
            .from("users")
            .select("*")
            .eq("id", user.id);

          //初回サインイン（＝サインアップ）時はデータベースにidとemailを記録
          if (firstSignIn?.length === 0) {
            const { error } = await supabase
              .from("users")
              .insert([{ id: user.id, email: user.email }]);
            if (error) {
              console.error(
                "Error inserting user into database:",
                error.message
              );
            }
          }
        }
      }
    );

    return () => {
      //コンポーネントがアンマウントされる際に、リスナーを解除
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const singOut = () => {
    supabase.auth.signOut();
    router.push("/");
  };

  if (session === null) {
    return (
      <div>
        <button onClick={singOut}>SignOut</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        Welcome, {session?.user?.email}
      </p>
      <button onClick={singOut}>signOut</button>
    </div>
  );
};

export default Dashboard;
