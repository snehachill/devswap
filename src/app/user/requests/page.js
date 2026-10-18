import { redirect } from "next/navigation";

import RequestsClient from "./RequestsClient";
import { getRequestsData } from "@/src/actions/user/requestactions";

export default async function RequestsPage() {
  const requests = await getRequestsData();

  if (requests?.error === "Please sign in to view your requests.") {
    redirect("/sign-in");
  }

  if (requests?.error) {
    return (
      <main className="min-h-screen bg-[#ffffff] px-5 pb-16 pt-28">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
            <p className="text-lg font-medium text-slate-900">Requests unavailable</p>
            <p className="mt-2 text-sm text-slate-500">{requests.error}</p>
          </div>
        </div>
      </main>
    );
  }

  return <RequestsClient requests={requests} />;
}
