// src/pages/Transcripts/TranscriptAlerts.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import TableCard from "../../components/TableCard";

export default function TranscriptAlerts() {
  const navigate = useNavigate();
  const rows = [
    ["11/12/2023", "Standard", "Lebron James"],
    ["11/12/2023", "High", "Lebron James"],
  ];

  return (
    <div className="px-4 pb-28 space-y-5">
      <div className="pt-4 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 rounded-full bg-white/90 text-[#0E3561] shadow active:scale-95"
        >
          ←
        </button>
        <h1 className="text-4xl font-extrabold text-white leading-tight">Transcripts Alerts</h1>
      </div>
      <TableCard
        title="IRS Tax Liability"
        columns={["Alert Date", "Priority", "Name"]}
        rows={rows}
      />
    </div>
  );
}
