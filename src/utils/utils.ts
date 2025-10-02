import type { Workshop } from "../types/type";

export function isUpcoming(w: Workshop) {
  const today = new Date();
  const end = new Date(w.end);
  end.setHours(23, 59, 59, 999);
  return end >= today;
}

export function formatRange(startISO: string, endISO: string) {
  const s = new Date(startISO);
  const e = new Date(endISO);
  const sameMonth = s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();

  const d = (dt: Date, opts: Intl.DateTimeFormatOptions) =>
    dt.toLocaleDateString(undefined, opts);

  return sameMonth
    ? `${d(s, { month: "long", day: "numeric" })}–${d(e, { day: "numeric" })}, ${e.getFullYear()}`
    : `${d(s, { month: "long", day: "numeric" })} – ${d(e, { month: "long", day: "numeric" })}, ${e.getFullYear()}`;
}
