"use client";
import { useUser } from "@/lib/store/user";
import { createClient } from "@/lib/supabase/client";
import React, { useEffect, useState } from "react";

export default function ChatPresence() {
  const user = useUser((state) => state.user);
  const supabase = createClient();
  const [onlineUser, setOnlineUser] = useState(0);

  useEffect(() => {
    const channel = supabase.channel("room1");
    channel
      .on("presence", { event: "sync" }, () => {
        console.log("Synced presence state: ", channel.presenceState());
        const userIds = [];
        for (const id in channel.presenceState()) {
          //@ts-ignore
          userIds.push(channel.presenceState()[id][0].user_id);
        }
        setOnlineUser([...new Set(userIds)].length);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            online_at: new Date().toISOString(),
            user_id: user?.id,
          });
        }
      });
  }, [user]);
  if (!user) {
    return <div className="h-3 w-1"></div>;
  }
  return (
    <div className="flex items-center gap-1">
      <div className="h-4 w-4 bg-green-500 rounded-full animate-pulse" />
      <h1 className="text-sm text-gray-300">{onlineUser} online</h1>
    </div>
  );
}
