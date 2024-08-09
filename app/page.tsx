import Header from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import InitUser from "@/lib/store/InitUser";
import { createServer } from "@/lib/supabase/server";
import React from "react";

export default async function Page() {
  const supbase = createServer();
  const { data } = await supbase.auth.getSession();
  return (
    <>
      <div className="max-w-3xl mx-auto md:py-10 h-screen">
        <div className="h-full border rounded-md flex flex-col">
          <Header user={data.session?.user} />
          <div className="flex-1 flex flex-col p-5 h-full overflow-y-auto scroll-m-4">
            <div className="flex-1"></div>
            <div className="space-y-7">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i) => (
                <div className="flex gap-2" key={i}>
                  <div className="h-10 w-10 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <h1 className="font-bold">lye</h1>
                      <h1 className="text-sm text-gray-400">
                        {new Date().toDateString()}
                      </h1>
                    </div>
                    <p className="text-gray-300">
                      I’m thinking about grabbing a coffee. Want to join me?
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6">
            <Input placeholder="Send Message..." />
          </div>
        </div>
      </div>
      <InitUser user={data.session?.user} />
    </>
  );
}
