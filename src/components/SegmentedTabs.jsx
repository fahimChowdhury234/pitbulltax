export default function SegmentedTabs({ value, onChange }) {
  const base =
    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition select-none";
  const active = "bg-[#1F66D1] text-white shadow";
  const idle = "bg-white text-[#0E3561] shadow";

  return (
    <div className="flex items-center gap-3">
      <button
        className={`${base} ${value === "individual" ? active : idle}`}
        onClick={() => onChange("individual")}
      >
        <UserIcon className="w-4 h-4" /> Individual
        <ChevronDown className="w-4 h-4 opacity-80" />
      </button>
      <button
        className={`${base} ${value === "business" ? active : idle}`}
        onClick={() => onChange("business")}
      >
        <BuildingIcon className="w-4 h-4" /> Business
      </button>
    </div>
  );
}

/* tiny inline icons */
function UserIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <circle cx="12" cy="9" r="4" />
      <path d="M4 21c1.6-4 13.4-4 16 0" />
    </svg>
  );
}
function BuildingIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4 20V6a2 2 0 0 1 2-2h8l6 6v10H4z" />
      <path d="M14 4v6h6" className="opacity-70" />
    </svg>
  );
}
function ChevronDown(props) {
  return (
    <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" {...props}>
      <path d="M6 10l6 6 6-6" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
