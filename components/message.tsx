import { IMessage } from "@/lib/store/messages";
import Image from "next/image";
import React from "react";

export default function Message({ message }: { message: IMessage }) {
  return (
    <div className="flex gap-2">
      <div>
        <Image
          alt="user avatar"
          src={message.users?.avatar_url!}
          width={40}
          height={40}
          className="rounded-full ring-2"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-1">
          <h1 className="font-bold">{message.users?.display_name}</h1>
          <h1 className="text-sm text-gray-400">
            {new Date(message.created_at).toDateString()}
          </h1>
        </div>
        <p className="text-gray-300">
          I’m thinking about grabbing a coffee. Want to join me?
        </p>
      </div>
    </div>
  );
}
