// src/pages/Transcripts/ViewTranscripts.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../components/SearchBar";
import TableCard from "../../components/TableCard";

export default function ViewTranscripts() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const rows = [
    ["James, Lebron", "W&I", "Get Transcript", "2025", "View Transcript", "09/25/25"],
    ["Orozco, Adrian", "ACC", "Get Transcript", "2024", "View Transcript", "09/25/25"],
    ["Alfaro, Jose", "TR", "CAF Check", "2023", "CAF Check Failed", "09/25/25"],
    ["Moncada, Raul", "RA", "Get Transcript", "2022", "Request in Progress", "09/25/25"],
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
        <h1 className="text-4xl font-extrabold text-white leading-tight">View Transcripts</h1>
      </div>
      <SearchBar value={query} onChange={setQuery} placeholder="Search Clients" />
      <TableCard
        title="Transcripts"
        columns={["Client", "Type", "Request Type", "Period", "Results", "Date"]}
        rows={rows}
      />
    </div>
  );
}
