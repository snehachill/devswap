"use client";

import { useSyncExternalStore } from "react";

import SignUpForm from "./SignUpForm";

function subscribe() {
  return () => {};
}

export default function SignUpPage() {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  if (!mounted) {
    return null;
  }

  return <SignUpForm />;
}
