import React from "react";
import { Button } from "./button";
import { createClient } from "@/lib/supabase/client";

export default function Header() {
  const handlLogin = () => {
    const supabase = createClient();
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "/auth/callback",
      },
    });
  };
  return (
    <div className="h-20">
      <div className="p-4 border-b flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Daily Chat</h2>
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 bg-green-500 rounded-full animate-pulse" />
            <h1 className="text-sm text-gray-300">2 onlines</h1>
          </div>
        </div>
        <Button onClick={handlLogin}>Login</Button>
      </div>
    </div>
  );
}
