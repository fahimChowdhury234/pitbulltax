// src/pages/Transcripts/TranscriptsDashboard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import TableCard from "../../components/TableCard";

export default function TranscriptsDashboard() {
  const navigate = useNavigate();

  const irsLiabilityRows = [
    ["Adrian Orozco", "Lebron James", "$12,200.00"],
    ["Rebeca Trejos", "Shai Alexander", "$350.00"],
  ];

  const oicRows = [
    ["Adrian Orozco", "Lebron James", "11/12/2023"],
    ["Rebeca Trejos", "Shai Alexander", "11/12/2023"],
  ];

  const abatementRows = [
    ["Adrian Orozco", "Lebron James", "1040"],
    ["Rebeca Trejos", "Cobbler Inc.", "940"],
  ];

  const installmentRows = [
    ["Adrian Orozco", "Lebron James", "1040: 2020,2021"],
    ["Rebeca Trejos", "Cobbler Inc.", "940: 2020,2023"],
  ];

  return (
    <div className="px-4 pb-28 space-y-5">
      {/* Header */}
      <div className="pt-4 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 rounded-full bg-white/90 text-[#0E3561] shadow active:scale-95"
        >
          ←
        </button>
        <h1 className="text-4xl font-extrabold text-white leading-tight">Transcripts Dashboard</h1>
      </div>

      <TableCard
        title="IRS Tax Liability"
        columns={["Case Manager", "Client’s Name", "Total IRS Liability"]}
        rows={irsLiabilityRows}
      />

      <TableCard
        title="Offer In Compromise Filings"
        columns={["Case Manager", "Client’s Name", "OIC Filing Date"]}
        rows={oicRows}
      />

      <TableCard
        title="First Time Penalty Abatement Eligibility"
        columns={["Case Manager", "Client’s Name", "Form"]}
        rows={abatementRows}
      />

      <TableCard
        title="Installment Agreement"
        columns={["Case Manager", "Client’s Name", "Tax Forms & Period"]}
        rows={installmentRows}
      />
    </div>
  );
}
