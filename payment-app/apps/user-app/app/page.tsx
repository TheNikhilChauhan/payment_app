"use client";

import { useBalance } from "@repo/store/balance";

// eslint-disable-next-line react/display-name
export default function () {
  const balance = useBalance();
  return <div>hi there {balance}</div>;
}
