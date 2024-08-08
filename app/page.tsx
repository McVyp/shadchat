import Header from "@/components/ui/header";
import InitUser from "@/lib/store/InitUser";
import { createServer } from "@/lib/supabase/server";
import React from "react";

export default async function Page() {
  const supbase = createServer();
  const { data } = await supbase.auth.getSession();
  return (
    <>
      <div className="max-w-3xl mx-auto md:py-10 h-screen">
        <div className="h-full border rounded-md">
          <Header user={data.session?.user} />
        </div>
      </div>
      <InitUser user={data.session?.user}/>
    </>
  );
}
