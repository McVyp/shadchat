"use client";
import React from "react";
import { Button } from "./button";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function Header({ user }: { user: User | undefined }) {
  const router = useRouter();
  const handleLogin = async () => {
    const supabase = createClient();
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: location.origin + "/auth/callback",
      },
    });
  };
  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
  };
  console.log(user);
  return (
    <div className="h-20">
      <div className="p-4 border-b flex items-center justify-between h-full">
        <div>
          <h2 className="text-xl font-semibold">Daily Chat</h2>
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 bg-green-500 rounded-full animate-pulse" />
            <h1 className="text-sm text-gray-300">2 onlines</h1>
          </div>
        </div>
        {!user ? (
          <Button onClick={handleLogin}>Login</Button>
        ) : (
          <Button onClick={handleLogout}>Logout</Button>
        )}
      </div>
    </div>
  );
}
