import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { CLIENTS } from "../../data/clients";
import SearchBar from "../../components/SearchBar";
import SegmentedTabs from "../../components/SegmentedTabs";
import { ArrowLeft } from "../../icons/Icons";

export default function SingleSMSList() {
  const navigate = useNavigate();
  const [segment, setSegment] = useState<"individual" | "business">(
    "individual"
  );
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.toLowerCase();
    return CLIENTS.filter(
      (c) =>
        c.kind === segment &&
        (c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q))
    );
  }, [segment, query]);

  return (
    <div className="py-4 space-y-4">
      <header className="flex justify-between items-center flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full bg-white/90 text-[#0E3561] shadow active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-4xl font-extrabold text-white">Single SMS</h1>
          </div>
          <p className="text-gray-300">Select the Client to Send SMS</p>
        </div>
        <div className="p-2 rounded-md bg-white">
          <p className="text-red-700 text-right text-base font-bold">
            800 SMS Remaining
          </p>
        </div>
      </header>

      <SegmentedTabs value={segment} onChange={setSegment} />
      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search Clients"
      />

      <div className="space-y-3">
        {results.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl shadow-sm px-4 py-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-8 h-8 grid place-items-center rounded-full ${
                  c.color === "red" ? "bg-red-500" : "bg-[#1F66D1]"
                } text-white`}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <circle cx="12" cy="9" r="4" />
                  <path d="M4 21c1.6-4 13.4-4 16 0" />
                </svg>
              </span>
              <div>
                <div className="font-extrabold text-[#0E3561]">{c.name}</div>
                <div className="text-sm text-gray-500">{c.role}</div>
              </div>
            </div>
            <button
              onClick={() => navigate(`/sms/single/${c.id}`)}
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
