"use client";
import React from "react";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import ChatPresence from "./chatPresence";

export default function Header({ user }: { user: User | null | undefined }) {
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
  return (
    <div className="h-20">
      <div className="p-4 border-b flex items-center justify-between h-full">
        <div>
          <h2 className="text-xl font-semibold">Daily Chat</h2>
          <ChatPresence />
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
