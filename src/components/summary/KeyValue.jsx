// src/components/summary/KeyValue.jsx
export default function KeyValue({ label, value }) {
  return (
    <div className="py-2">
      <span className="font-semibold text-black/90">{label}: </span>
      <span className="text-black/80">{value ?? "—"}</span>
    </div>
  );
}
