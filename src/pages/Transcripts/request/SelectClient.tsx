import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../../components/SearchBar";
import SegmentedTabs from "../../../components/SegmentedTabs";
import { CLIENTS } from "../../../data/clients";

export default function SelectClient() {
  const nav = useNavigate();
  const [segment, setSegment] = useState<"individual" | "business">("business");
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    return CLIENTS.filter(
      (c) =>
        c.kind === segment &&
        (s === "" || c.name.toLowerCase().includes(s) || c.role.toLowerCase().includes(s))
    );
  }, [q, segment]);

  return (
    <div className="px-4 pb-28 space-y-4">
      <header className="pt-2">
        <h1 className="text-4xl font-extrabold text-white">Request Transcripts</h1>
        <p className="text-white/85 mt-2">Select the Client to Request Transcripts</p>
      </header>

      <SegmentedTabs value={segment} onChange={(v) => setSegment(v as any)} />
      <SearchBar value={q} onChange={setQ} placeholder="Search Clients" />

      <div className="space-y-3">
        {results.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl shadow-sm px-4 py-3 flex items-center justify-between"
          >
            <div>
              <div className="font-extrabold text-[#0E3561]">{c.name}</div>
              <div className="text-sm text-gray-500">{c.role}</div>
            </div>
            <button
              onClick={() => nav(`/transcripts/request/${c.id}`)}
              className="px-5 py-2 rounded-full bg-[#1F66D1] text-white font-semibold"
            >
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
