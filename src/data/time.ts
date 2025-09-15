/** Format "HH:mm" -> "h:mm a.m/p.m" */
export function formatTime(t: string): string {
  if (!t) return "";
  const [hS, mS] = t.split(":");
  let h = Number(hS);
  const m = Number(mS);
  const am = h < 12;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  const mm = String(m).padStart(2, "0");
  return `${h12}:${mm} ${am ? "a.m" : "p.m"}`;
}
