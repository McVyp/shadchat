"use client";
import { IMessage, useMessage } from "@/lib/store/messages";

import React, { useEffect, useRef } from "react";
import Message from "./message";
import { DeleteAlert, EditAlert } from "./messageActions";
import { createClient } from "@/lib/supabase/client";
import { toast, useSonner } from "sonner";

export default function ListMessages() {
  const scrollRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const { messages, addMessage, optimisticIds } = useMessage((state) => state);
  const supabase = createClient();
  useEffect(() => {
    const channel = supabase
      .channel("chat-rom")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        async (payload) => {
          if (optimisticIds.includes(payload.new.id)) {
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
        }
      )
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [messages]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);
  return (
    <div
      ref={scrollRef}
      className="flex-1 flex flex-col p-5 h-full overflow-y-auto scroll-m-4"
    >
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
