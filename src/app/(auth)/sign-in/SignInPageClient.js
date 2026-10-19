"use client";

import { useSyncExternalStore } from "react";
import SignInForm from "./SignInForm";

function subscribe() {
  return () => {};
}

export default function SignInPageClient() {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  if (!mounted) return null;
  return <SignInForm />;
}
