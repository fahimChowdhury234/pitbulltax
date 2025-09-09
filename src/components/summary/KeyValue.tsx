// src/components/summary/KeyValue.tsx

interface KeyValueProps {
  label: string;
  value?: string | number | null;
}

export default function KeyValue({ label, value }: KeyValueProps) {
  return (
    <div className="py-2">
      <span className="font-semibold text-black/90">{label}: </span>
      <span className="text-black/80">{value ?? "—"}</span>
    </div>
  );
}
