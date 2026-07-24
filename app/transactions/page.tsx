"use client";

export const dynamic = "force-dynamic";

import React, { Suspense } from "react";
import TransactionsView from "./TransactionsView";

export default function ProductBook() {
  return (
    <Suspense fallback={<div className="transactions-page"><div style={{ padding: 24 }}>Loading…</div></div>}>
      <TransactionsView />
    </Suspense>
  );
}
