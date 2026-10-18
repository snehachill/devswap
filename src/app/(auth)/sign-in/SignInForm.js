"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (!result || result.error) {
      setError("Invalid email or password.");
      setIsSubmitting(false);
      return;
    }

    router.push("/user/dashboard");
    router.refresh();
  }

  return (
    <div className="w-full max-w-md rounded-4xl border border-[#D89216]/20 bg-white/90 p-8 shadow-[0_24px_80px_rgba(17,32,27,0.15)] backdrop-blur">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#11201b]">Welcome back</p>
      <h2 className="mt-4 font-display text-4xl text-slate-900">Sign in</h2>
      <p className="mt-3 text-sm leading-6 text-slate-500">
        Access your DevSwap profile and continue matching with students who can trade skills with you.
      </p>
      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
          <input
            required
            autoComplete="email"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#11201b] focus:bg-white focus:ring-2 focus:ring-[#11201b]/10"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
          <input
            required
            autoComplete="current-password"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#11201b] focus:bg-white focus:ring-2 focus:ring-[#11201b]/10"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </label>
        {error ? (
          <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>
        ) : null}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-[#11201b] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#11201b] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Signing you in..." : "Sign in"}
        </button>
      </form>
      <p className="mt-6 text-sm text-slate-500">
        New to DevSwap?{" "}
        <Link href="/sign-up" className="font-semibold text-[#11201b] transition hover:text-[#11201b]">
          Create an account
        </Link>
      </p>
    </div>
  );
}
