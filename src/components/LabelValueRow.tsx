import { ReactNode } from "react";

interface LabelValueRowProps {
  label: string;
  value: ReactNode;
  multiline?: boolean;
}

export default function LabelValueRow({ label, value, multiline = false }: LabelValueRowProps) {
  return (
    <div className="px-4 py-3">
      <div className="text-[#0E3561] font-extrabold">{label}:</div>
      <div className={`text-[#0E3561]/90 ${multiline ? "mt-1" : ""}`}>
        {value ?? "—"}
      </div>
    </div>
  );
}
