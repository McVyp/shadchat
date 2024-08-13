"use client";
import { useMessage } from "@/lib/store/messages";

import React from "react";
import Message from "./message";
import { DeleteAlert } from "./messageActions";

export default function ListMessages() {
  const messages = useMessage((state) => state.messages);
  return (
    <div className="flex-1 flex flex-col p-5 h-full overflow-y-auto scroll-m-4">
      <div className="flex-1"></div>
      <div className="space-y-7">
        {messages.map((message) => {
          return <Message key={message.id} message={message} />;
        })}
      </div>
      <DeleteAlert />
    </div>
  );
}
