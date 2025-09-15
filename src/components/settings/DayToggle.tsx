interface DayToggleProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

export default function DayToggle({ label, checked, onChange }: DayToggleProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={
        "w-full flex items-center gap-3 rounded-2xl px-4 py-3 shadow-sm border border-black/10 " +
        (checked ? "bg-[#E9F2FF]" : "bg-white")
      }
    >
      <input type="checkbox" readOnly checked={checked} className="w-5 h-5 accent-[#1F66D1]" />
      <span className="text-[#1F66D1] text-sm font-extrabold">{label}</span>
    </button>
  );
}
