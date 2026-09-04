"use client";

import { useEffect, useState } from "react";

/** Local time in Brussels, HUD style. Renders nothing until mounted (no hydration mismatch). */
export function Clock({ timeZone = "Europe/Brussels" }: { timeZone?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timeZone]);

  return <span className="tabular-nums">{time ?? "--:--:--"}</span>;
}
