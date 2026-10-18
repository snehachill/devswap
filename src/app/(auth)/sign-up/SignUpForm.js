"use client";

import Link from "next/link";
import { useActionState } from "react";

import { registerUser } from "@/src/actions/auth";

export default function SignUpForm() {
  const [state, formAction, isPending] = useActionState(registerUser, {});

  return (
    <div className="w-full max-w-md rounded-4xl border border-[#D89216]/20 bg-white/90 p-8 shadow-[0_24px_80px_rgba(17,32,27,0.15)] backdrop-blur">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#11201b]">Create account</p>
      <h2 className="mt-4 font-display text-4xl text-slate-900">Sign up</h2>
      <p className="mt-3 text-sm leading-6 text-slate-500">
        Set up your local DevSwap account so you can start publishing skills and joining swap matches.
      </p>
      <form className="mt-8 space-y-5" action={formAction}>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Full name</span>
          <input
            required
            autoComplete="name"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#11201b] focus:bg-white focus:ring-2 focus:ring-[#11201b]/10"
            name="name"
            type="text"
            placeholder="Alex Johnson"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
          <input
            required
            autoComplete="email"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#11201b] focus:bg-white focus:ring-2 focus:ring-[#11201b]/10"
            name="email"
            type="email"
            placeholder="you@example.com"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
          <input
            required
            minLength={6}
            autoComplete="new-password"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#11201b] focus:bg-white focus:ring-2 focus:ring-[#11201b]/10"
            name="password"
            type="password"
            placeholder="Choose a password"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Image URL (optional)</span>
          <input
            autoComplete="url"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#11201b] focus:bg-white focus:ring-2 focus:ring-[#11201b]/10"
            name="image"
            type="url"
            placeholder="https://example.com/avatar.jpg"
          />
        </label>
        {state?.error ? (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{state.error}</p>
        ) : null}
        {state?.success ? (
          <p className="rounded-2xl border border-[#D89216]/35 bg-[#D89216]/10 px-4 py-3 text-sm text-[#11201b]">
            {state.success}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-2xl bg-[#11201b] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#11201b] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? "Creating your account..." : "Create account"}
        </button>
      </form>
      <p className="mt-6 text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-semibold text-[#11201b] transition hover:text-[#11201b]">
          Sign in here
        </Link>
      </p>
    </div>
  );
}
