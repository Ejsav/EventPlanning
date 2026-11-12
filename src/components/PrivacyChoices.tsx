"use client";

import { useEffect, useState } from "react";
import { OPT_OUT_KEY } from "@/lib/analytics";

/** Lets visitors opt out of analytics. Global Privacy Control signals are honored automatically. */
export function PrivacyChoices() {
  const [optedOut, setOptedOut] = useState<boolean | null>(null);
  const [gpc, setGpc] = useState(false);

  useEffect(() => {
    // Read browser-only preferences after hydration.
    /* eslint-disable react-hooks/set-state-in-effect */
    setGpc(Boolean(navigator.globalPrivacyControl));
    try {
      setOptedOut(window.localStorage.getItem(OPT_OUT_KEY) === "1");
    } catch {
      setOptedOut(false);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  if (optedOut === null) return <span className="opacity-0">Privacy choices</span>;

  if (gpc) return <span title="Your browser's Global Privacy Control signal is honored">Analytics off (GPC)</span>;

  const toggle = () => {
    const next = !optedOut;
    try {
      if (next) window.localStorage.setItem(OPT_OUT_KEY, "1");
      else window.localStorage.removeItem(OPT_OUT_KEY);
    } catch {
      /* ignore */
    }
    setOptedOut(next);
    if (next && typeof window.gtag === "function") window.gtag("consent", "update", { analytics_storage: "denied" });
  };

  return (
    <button type="button" onClick={toggle} className="eyebrow hover:text-paper" aria-pressed={optedOut}>
      {optedOut ? "Analytics: off — turn on" : "Privacy choices: opt out of analytics"}
    </button>
  );
}
