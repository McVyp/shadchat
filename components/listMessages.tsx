"use client";
import { IMessage, useMessage } from "@/lib/store/messages";

import React, { useEffect } from "react";
import Message from "./message";
import { DeleteAlert, EditAlert } from "./messageActions";
import { createClient } from "@/lib/supabase/client";
import { toast, useSonner } from "sonner";

export default function ListMessages() {
  const { messages, addMessage } = useMessage((state) => state);
  const supabase = createClient();
  useEffect(() => {
    const channel = supabase
      .channel("chat-rom")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        async (payload) => {
          console.log("Change received!", payload);
          const { error, data } = await supabase
            .from("users")
            .select("*")
            .eq("id", payload.new.send_by)
            .single();
          if (error) {
            toast.error(error.message);
          } else {
            const newMessage = {
              ...payload.new,
              users: data,
            };

            addMessage(newMessage as IMessage);
          }
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, []);
  return (
    <div className="flex-1 flex flex-col p-5 h-full overflow-y-auto scroll-m-4">
      <div className="flex-1"></div>
      <div className="space-y-7">
        {messages.map((message) => {
          return <Message key={message.id} message={message} />;
        })}
      </div>
      <DeleteAlert />
      <EditAlert />
    </div>
  );
}
