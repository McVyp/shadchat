import React from "react";
import { Button } from "./ui/button";
import { LIMIT_MESSAGES } from "@/lib/const";
import { createClient } from "@/lib/supabase/client";
import { fromJSON } from "postcss";
import { getFromAndTo } from "@/lib/utils";
import { useMessage } from "@/lib/store/messages";
import { toast } from "sonner";
export default function LoadMoreMessages() {
  const page = useMessage((state) => state.page);
  const fetchMore = async () => {
    const { from, to } = getFromAndTo(1, LIMIT_MESSAGES);
    const supabase = createClient();
    const { data, error } = await supabase
      .from("messages")
      .select("*,users(*)")
      .range(from, to)
      .order("created_at", { ascending: false });
    if (error) {
      toast.error(error.message);
    } else {
      console.log(data);
    }
  };
  return (
    <Button variant="outline" className="w-full" onClick={fetchMore}>
      Load More...
    </Button>
  );
}
