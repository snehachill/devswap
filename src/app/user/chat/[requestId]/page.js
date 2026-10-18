import { redirect } from "next/navigation";

import ChatClient from "./ChatClient";
import { getChatThread } from "@/src/actions/user/chatactions";

export default async function ChatPage({ params }) {
  const { requestId } = await params;
  const result = await getChatThread(requestId);

  if (result?.error === "Please sign in to open chat.") {
    redirect("/sign-in");
  }

  if (result?.error) {
    return (
      <main className="min-h-screen bg-[#ffffff] px-5 pb-16 pt-28">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[24px] border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
            <p className="text-lg font-medium text-slate-900">Chat unavailable</p>
            <p className="mt-2 text-sm text-slate-500">{result.error}</p>
          </div>
        </div>
      </main>
    );
  }

  return <ChatClient chat={result.chat} />;
}
