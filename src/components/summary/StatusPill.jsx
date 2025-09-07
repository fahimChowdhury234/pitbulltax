// src/components/summary/StatusPill.jsx
export default function StatusPill({ children, tone = "blue" }) {
  const toneCls =
    tone === "green"
      ? "bg-green-500/90"
      : tone === "red"
      ? "bg-red-500/90"
      : "bg-[#1F66D1]"; // default blue

  return (
    <span className={`inline-block px-3 py-1 text-nowrap rounded-full text-white text-sm font-semibold ${toneCls}`}>
      {children}
    </span>
  );
}
