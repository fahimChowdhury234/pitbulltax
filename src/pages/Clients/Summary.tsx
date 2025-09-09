// src/pages/clients/Summary.tsx
import { useNavigate, useParams } from "react-router-dom";
import {
  CLIENTS,
  CLIENT_DETAILS,
  type Client,
  type ClientDetails,
} from "../../data/clients";

// components (assumed already TS or TSX-ready)
import SectionCard from "../../components/summary/SectionCard";
import KeyValue from "../../components/summary/KeyValue";
import StatusPill from "../../components/summary/StatusPill";

import type { SVGProps } from "react";

export default function ClientSummary() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const numericId = Number(id);
  const client: Client | undefined = CLIENTS.find((c) => c.id === numericId);
  const details: ClientDetails | undefined = CLIENT_DETAILS[numericId];

  if (!client) {
    return (
      <div className="px-4 py-6 text-white">
        <button onClick={() => navigate(-1)} className="underline">
          Back
        </button>
        <p className="mt-4">Client not found.</p>
      </div>
    );
  }

  return (
    <div className="pb-28">
      {/* Top title row */}
      <div className="px-4 pt-4 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-full bg-white/90 text-[#0E3561] shadow active:scale-95"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-4xl font-extrabold text-white leading-tight">
            Client Summary
          </h1>
          <div className="text-xl font-semibold text-white/95 -mt-1">
            {client.name}
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="mt-4 space-y-5">
        <SectionCard title="Personal Information">
          <KeyValue label="Taxpayer" value={details?.personal?.Taxpayer} />
          <KeyValue label="Address" value={details?.personal?.Address} />
          <KeyValue label="SSN" value={details?.personal?.SSN} />
          <KeyValue label="Cell Phone" value={details?.personal?.["Cell Phone"]} />
          <KeyValue label="Home Phone" value={details?.personal?.["Home Phone"]} />
        </SectionCard>

        <SectionCard title="IRS Tax Liability">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[#0E3561] text-sm font-semibold">
                  <th className="py-2 pr-4">Year</th>
                  <th className="py-2 pr-4">Form</th>
                  <th className="py-2 pr-4">Current Tax</th>
                  <th className="py-2 pr-4">Earliest CSED</th>
                  <th className="py-2 pr-0">Latest CSED</th>
                </tr>
              </thead>
              <tbody className="text-black/80">
                {(details?.irsTaxLiability ?? []).map((row, i) => (
                  <tr key={i} className="border-t border-black/5">
                    <td className="py-2 pr-4">{row.year}</td>
                    <td className="py-2 pr-4">{row.form}</td>
                    <td className="py-2 pr-4 text-green-600 font-semibold">
                      {formatCurrency(row.currentTax)}
                    </td>
                    <td className="py-2 pr-4">{row.earliestCSED}</td>
                    <td className="py-2 pr-0">{row.latestCSED}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Authorization on File - 2848/8821">
          <div className="divide-y divide-black/5">
            {(details?.authorizations ?? []).map((a, i) => (
              <div key={i} className="py-3">
                <div className="flex flex-wrap items-center gap-6 text-[#0E3561] font-semibold text-sm">
                  <span>Form: {a.form}</span>
                  <span>Periods: {a.periods}</span>
                  <span>CAF Passed: {a.cafPassed}</span>
                </div>
                <div className="mt-2 text-black/80">
                  {a.reps.map((r, j) => (
                    <div key={j} className="text-sm">
                      <span className="font-medium">{r.name}</span>
                      <span className="ml-2 text-black/60">{r.caf}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Billing">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[#0E3561] text-sm font-semibold">
                  <th className="py-2 pr-4">Case Name</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Created</th>
                  <th className="py-2 pr-0">Due Date</th>
                </tr>
              </thead>
              <tbody className="text-black/80">
                {(details?.billing ?? []).map((b, i) => (
                  <tr key={i} className="border-t border-black/5">
                    <td className="py-2 pr-4">{b.caseName}</td>
                    <td className="py-2 pr-4">
                      <StatusPill tone={b.status.tone}>{b.status.label}</StatusPill>
                    </td>
                    <td className="py-2 pr-4">{b.created}</td>
                    <td className="py-2 pr-0">{b.due}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

/* ---------- helpers & icons ---------- */
function formatCurrency(n: number | string): string {
  return typeof n === "number"
    ? n.toLocaleString("en-US", { style: "currency", currency: "USD" })
    : String(n);
}

function ArrowLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M15 18l-6-6 6-6"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
