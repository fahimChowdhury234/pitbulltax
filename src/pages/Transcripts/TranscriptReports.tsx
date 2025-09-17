// src/pages/Transcripts/TranscriptReports.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import TableCard from "../../components/TableCard";

export default function TranscriptReports() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const rows = [
    ["James, Lebron", "W&I [2000-2024]", "09/25/25"],
    ["Orozco, Adrian", "ACC [2000-2024]", "09/25/25"],
    ["Alfaro, Jose", "W&I [2000-2024]", "09/25/25"],
    ["Moncada, Raul", "ACC [2000-2024]", "09/25/25"],
  ].filter(r => r[0].toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="px-4 pb-28 space-y-5">
      <div className="pt-4 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 rounded-full bg-white/90 text-[#0E3561] shadow active:scale-95"
        >
          ←
        </button>
        <h1 className="text-4xl font-extrabold text-white leading-tight">Transcript Reports</h1>
      </div>
      <SearchBar value={query} onChange={setQuery} placeholder="Search Clients" />
      <TableCard
        title="Reports"
        columns={["Client", "Periods", "Created"]}
        rows={rows}
      />
    </div>
  );
}
