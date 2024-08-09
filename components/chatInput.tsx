"use client";
import React from "react";
import { Input } from "./ui/input";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function ChatInput() {
  const supabase = createClient();
  const handleSendMessage = async (text: string) => {
    //call to supabase
    const { error } = await supabase.from("messages").insert({ text });
    if (error) {
      toast.error(error.message);
    }
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
