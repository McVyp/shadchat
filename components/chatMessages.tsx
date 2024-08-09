import React, { Suspense } from "react";
import ListMessages from "./listMessages";
import { createServer } from "@/lib/supabase/server";
import InitMessages from "@/lib/store/InitMessages";

export default async function ChatMessages() {
  const supabase = createServer();
  const { data } = await supabase.from("messages").select("*,users(*)");

  console.log(data); // For debugging purposes
  return (
    <>
      <Suspense fallback={"loading..."}>
        <ListMessages />
        <InitMessages messages={data || []} />
      </Suspense>
    </>
  );
}
 