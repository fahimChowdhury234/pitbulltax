import { useRef } from "react";
import { formatTime } from "../../data/time";
import { ChevronRight } from "../../icons/Icons";

interface TimeRowProps {
  label: string;
  value: string; // "HH:mm"
  onChange: (v: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function TimeRow({
  label,
  value,
  onChange,
  disabled,
  placeholder = "",
}: TimeRowProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function openPicker() {
    if (!disabled) inputRef.current?.showPicker?.();
  }

  return (
    <div
      className={
        "flex items-center justify-between rounded-2xl border border-black/10 px-4 py-3 shadow-sm " +
        (disabled ? "opacity-50" : "bg-white")
      }
    >
      <div className="flex items-center gap-2">
        <span className="text-[#0E3561] font-extrabold">{label}</span>
        <button
          type="button"
          onClick={openPicker}
          disabled={disabled}
          className="flex items-center gap-2 text-[#1F66D1] font-extrabold disabled:cursor-not-allowed relative"
        >
          <span className="min-w-[96px] text-right">
            {value ? formatTime(value) : placeholder}
          </span>
        </button>
      </div>
      <input
        ref={inputRef}
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className=""
      />
    </div>
  );
}
