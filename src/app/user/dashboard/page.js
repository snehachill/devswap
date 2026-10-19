import { redirect } from "next/navigation";
import { getDashboardData } from "@/src/actions/user/dashboardaction";
import DashboardClient from "./dashboardclient";

export const metadata = {
  title: "Skill Swap Dashboard",
  description: "See your current skill swaps, recent activity, and progress in your DevSwap dashboard.",
};

export default async function DashboardPage() {
  const dashboard = await getDashboardData();

  if (dashboard?.error === "Please sign in to view your dashboard.") {
    redirect("/sign-in");
  }

  if (dashboard?.error) {
    return (
      <main className="min-h-screen bg-transparent px-5 pb-16 pt-28">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-dashed border-[#D89216]/30 bg-white px-6 py-8 text-center">
            <p className="text-lg font-medium text-slate-900">Dashboard unavailable</p>
            <p className="mt-2 text-sm text-slate-500">{dashboard.error}</p>
          </div>
        </div>
      </main>
    );
  }

  return <DashboardClient dashboard={dashboard} />;
}
