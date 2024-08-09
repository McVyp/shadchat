import { IMessage } from "@/lib/store/messages";
import React from "react";

export default function Message({ message }: { message: IMessage }) {
  return (
    <div className="flex gap-2">
      <div className="h-10 w-10 bg-green-500 rounded-full"></div>
      <div className="flex-1">
        <div className="flex items-center gap-1">
          <h1 className="font-bold">lye</h1>
          <h1 className="text-sm text-gray-400">{new Date().toDateString()}</h1>
        </div>
        <p className="text-gray-300">
          I’m thinking about grabbing a coffee. Want to join me?
        </p>
      </div>
    </div>
  );
}
