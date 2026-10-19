"use client";

import { useSyncExternalStore } from "react";
import SignUpForm from "./SignUpForm";

function subscribe() {
  return () => {};
}

export default function SignUpPageClient() {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  if (!mounted) return null;
  return <SignUpForm />;
}
