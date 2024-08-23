import React, { Suspense } from "react";
import ListMessages from "./listMessages";
import { createServer } from "@/lib/supabase/server";
import InitMessages from "@/lib/store/InitMessages";
import { LIMIT_MESSAGES } from "@/lib/const";

export default async function ChatMessages() {
  const supabase = createServer();
  const { data } = await supabase
    .from("messages")
    .select("*,users(*)")
    .range(0, LIMIT_MESSAGES)
    .order("created_at", { ascending: false });
  console.log(data); // For debugging purposes
  return (
    <>
      <Suspense fallback={"loading..."}>
        <ListMessages />
        <InitMessages messages={data?.reverse() || []} />
      </Suspense>
    </>
  );
}
