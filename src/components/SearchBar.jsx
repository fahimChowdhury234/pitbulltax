export default function SearchBar({ value, onChange, placeholder = "Search Clients" }) {
  return (
    <label className="relative block">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0E3561]/60">
        <SearchIcon className="w-5 h-5" />
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/90 placeholder-[#0E3561]/50 text-[#0E3561] shadow focus:outline-none focus:ring-2 focus:ring-[#1F66D1]/60"
      />
    </label>
  );
}

function SearchIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="11" cy="11" r="7" strokeWidth="2" />
      <path d="M20 20l-3.5-3.5" strokeWidth="2" />
    </svg>
  );
}
