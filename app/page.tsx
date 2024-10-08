import About from "@/components/about";
import ChatInput from "@/components/chatInput";
import ChatMessages from "@/components/chatMessages";
import Header from "@/components/header";
import { Input } from "@/components/ui/input";
import InitUser from "@/lib/store/InitUser";
import { createServer } from "@/lib/supabase/server";
import React from "react";

export default async function Page() {
  const supabase = createServer();
  const { data } = await supabase.auth.getSession();
  return (
    <>
      <div className="max-w-3xl mx-auto md:py-10 h-screen">
        <div className="h-full border rounded-md flex flex-col relative">
          <Header user={data.session?.user} />
          {data.session?.user ? (
            <>
              <ChatMessages />
              <ChatInput />
            </>
          ) : (
            <About />
          )}
        </div>
      </div>
      <InitUser user={data.session?.user} />
    </>
  );
}
