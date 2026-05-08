import SwapsChatClient from "./SwapsChatClient";
import { getSwapsChatPageData } from "@/src/actions/user/chatactions";
import { redirect } from "next/navigation";

export default async function SwapsChatPage({ searchParams }) {
  const params = await searchParams;
  const swapId = typeof params?.swap === "string" ? params.swap : "";
  const result = await getSwapsChatPageData(swapId);

  if (result?.error === "Please sign in to open chat.") {
    redirect("/sign-in");
  }

  return <SwapsChatClient initialData={result} />;
}
