"use client";
import React from "react";
import { Input } from "./ui/input";

export default function ChatInput() {
  const handleSendMessage = (text: string) => {
    alert(text);
    //call to supabase
  };
  return (
    <div className="p-6">
      <Input
        placeholder="Send Message..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />
    </div>
  );
}
