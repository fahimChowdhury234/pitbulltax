import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import { ArrowLeft } from "../../icons/Icons";

/** Mock groups (swap for API later) */
const GROUPS = [
  { id: "cq", name: "CQ Group", participants: 10 },
  { id: "updates", name: "Updates Group", participants: 10 },
  { id: "promo", name: "Promo Group", participants: 10 },
];

export default function BlastList() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GROUPS.filter((g) => g.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="py-4 space-y-4">
      <header className="flex items-start justify-between flex-wrap">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white/90 text-[#0E3561] shadow active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-3xl font-extrabold text-white">SMS Blast</h1>
          <p className="text-gray-300">Select the Group to Send SMS</p>
        </div>
        <div className="p-2 rounded-md bg-white">
          <p className="text-red-700 text-right text-base font-bold">
            800 SMS Remaining
          </p>
        </div>
      </header>

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search Groups"
      />

      <div className="space-y-3">
        {results.map((g) => (
          <div
            key={g.id}
            className="bg-white rounded-2xl shadow-sm px-4 py-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 grid place-items-center rounded-full bg-[#1F66D1] text-white">
                {/* Group icon */}
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="currentColor"
                >
                  <path d="M12 12a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm-7.5 7a6 6 0 0 1 12 0H4.5Z" />
                  <path d="M17 10a2 2 0 1 0-2-2 2 2 0 0 0 2 2Zm2.5 9a5.5 5.5 0 0 0-4.2-5.33 7.49 7.49 0 0 1 4.2 5.33Z" />
                </svg>
              </span>
              <div>
                <div className="font-extrabold text-[#0E3561]">{g.name}</div>
                <div className="text-sm text-gray-500">
                  {g.participants} participants
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate(`/sms/blast/${g.id}`)}
              className="px-4 py-2 rounded-full bg-[#1F66D1] text-white font-extrabold"
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
