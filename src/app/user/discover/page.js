import { redirect } from "next/navigation";

import DiscoverClient from "./DiscoverClient";
import { getDiscoverData } from "@/src/actions/user/discoveractions";

export default async function DiscoverPage() {
  const discover = await getDiscoverData();

  if (discover?.error === "Please sign in to discover swap partners.") {
    redirect("/sign-in");
  }

  if (discover?.error) {
    return (
      <main className="min-h-screen bg-[#FFF8F0] px-5 pb-16 pt-28">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
            <p className="text-lg font-medium text-slate-900">Discover is unavailable</p>
            <p className="mt-2 text-sm text-slate-500">{discover.error}</p>
          </div>
        </div>
      </main>
    );
  }

  return <DiscoverClient discover={discover} />;
}
