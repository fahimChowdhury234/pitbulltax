import { useMemo, useState } from "react";
import SearchBar from "../../components/SearchBar";
import { ArrowLeft } from "../../icons/Icons";
import { useNavigate } from "react-router-dom";

/** Mock SMS history data */
type SMSRecord = {
  id: string;
  recipient: string;
  type: "Single" | "Blast";
  text: string;
  date: string;
};

const HISTORY: SMSRecord[] = [
  {
    id: "h1",
    recipient: "Adrian Orozco",
    type: "Single",
    text: "Your appointment is tomorrow at 10am",
    date: "09/17/2025 09:30 AM",
  },
  {
    id: "h2",
    recipient: "CQ Group",
    type: "Blast",
    text: "Promo SMS sent to all participants",
    date: "09/16/2025 04:05 PM",
  },
  {
    id: "h3",
    recipient: "Rebeca Trejos",
    type: "Single",
    text: "Thanks for signing up",
    date: "09/15/2025 12:00 PM",
  },
];

export default function SMSHistory() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return HISTORY.filter(
      (h) =>
        h.recipient.toLowerCase().includes(q) ||
        h.text.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="py-4 space-y-4">
      <header className="flex items-start justify-between flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-white/90 text-[#0E3561] shadow active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-4xl font-extrabold text-white">SMS History</h1>
          </div>
          <p className="text-gray-300">View previously sent SMS</p>
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
        placeholder="Search SMS History"
      />

      <div className="space-y-3">
        {results.map((h) => (
          <div key={h.id} className="bg-white rounded-2xl shadow-sm px-4 py-3">
            <div className="flex justify-between items-center mb-1">
              <div className="text-[#0E3561] font-semibold">{h.recipient}</div>
              <div className="text-xs text-gray-500">{h.date}</div>
            </div>
            <div className="text-sm text-gray-700">{h.text}</div>
            <div className="mt-1 text-xs text-gray-400">Type: {h.type}</div>
          </div>
        ))}

        {results.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No SMS history found.
          </div>
        )}
      </div>
    </div>
  );
}
